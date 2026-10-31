/** Export Software page vector icons from the user's original .fig archive.
 *  Paths come from fig-kiwi fillGeometry/strokeGeometry (outlined strokes), colours from node paints.
 *  Usage: node scripts/extract-software-art.cjs [path/to/software.fig]
 */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const source = process.argv[2] || process.env.CORTEXX_SOFTWARE_FIGMA || 'C:/Users/Cyb3r/Downloads/software.fig';
const moduleRoot = process.env.CORTEXX_FIGMA_MODULES || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules';
const kiwi = require(path.join(moduleRoot, 'kiwi-schema'));
const fzstd = require(path.join(moduleRoot, 'fzstd'));
const out = path.resolve(__dirname, '../public/assets/images/software');

function unzip(buf) {
  const files = {};
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10), size = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const off = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    const start = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28);
    const data = buf.subarray(start, start + size);
    files[name] = method === 0 ? data : zlib.inflateRawSync(data);
    p += 46 + nlen + elen + clen;
  }
  return files;
}
const inflate = b => (b[0] === 0x28 && b[1] === 0xb5 ? Buffer.from(fzstd.decompress(b)) : (() => { try { return zlib.inflateRawSync(b); } catch { return zlib.inflateSync(b); } })());

const raw = fs.readFileSync(source);
const canvas = raw[0] === 0x50 ? unzip(raw)['canvas.fig'] : raw;
const chunks = [];
for (let off = 12; off + 4 <= canvas.length;) { const len = canvas.readUInt32LE(off); off += 4; chunks.push(canvas.subarray(off, off + len)); off += len; }
const schema = kiwi.compileSchema(kiwi.decodeBinarySchema(new kiwi.ByteBuffer(inflate(chunks[0]))));
const message = schema.decodeMessage(new kiwi.ByteBuffer(inflate(chunks[1])));
const key = g => `${g.sessionID}:${g.localID}`;
const nodes = new Map(message.nodeChanges.map(n => [key(n.guid), n]));
const children = new Map();
for (const n of message.nodeChanges) {
  if (!n.parentIndex) continue;
  const p = key(n.parentIndex.guid);
  if (!children.has(p)) children.set(p, []);
  children.get(p).push(n);
}
for (const list of children.values()) list.sort((a, b) => (a.parentIndex.position < b.parentIndex.position ? -1 : 1));

const num = v => +(+v).toFixed(3);
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
function pathData(index) {
  const bytes = message.blobs[index]?.bytes;
  if (!bytes) return '';
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let pos = 0, d = '';
  while (pos < bytes.length) {
    const cmd = bytes[pos++];
    const count = { 0: 0, 1: 2, 2: 2, 3: 4, 4: 6 }[cmd];
    if (count === undefined || pos + count * 4 > bytes.length) break;
    const v = [];
    for (let i = 0; i < count; i++, pos += 4) v.push(num(view.getFloat32(pos, true)));
    d += ['Z', 'M', 'L', 'Q', 'C'][cmd] + v.join(' ');
  }
  return d.replace(/^Z/, '');
}

let defs, seq;
function paintAttr(paint, n) {
  if (!paint || paint.visible === false) return null;
  const op = paint.opacity ?? 1;
  if (paint.type === 'SOLID') return { fill: hex(paint.color), opacity: op * (paint.color.a ?? 1) };
  if (paint.type === 'GRADIENT_LINEAR' || paint.type === 'GRADIENT_RADIAL') {
    const t = paint.transform || { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 };
    // Invert the paint transform (node-normalised -> gradient space) to place the gradient axis.
    const det = t.m00 * t.m11 - t.m01 * t.m10 || 1;
    const inv = (x, y) => {
      const dx = x - t.m02, dy = y - t.m12;
      return [(t.m11 * dx - t.m01 * dy) / det * n.size.x, (-t.m10 * dx + t.m00 * dy) / det * n.size.y];
    };
    const id = `g${++seq}`;
    const stops = paint.stops.map(s => `<stop offset="${num(s.position)}" stop-color="${hex(s.color)}"${s.color.a < 1 ? ` stop-opacity="${num(s.color.a)}"` : ''}/>`).join('');
    if (paint.type === 'GRADIENT_LINEAR') {
      const [x1, y1] = inv(0, 0.5), [x2, y2] = inv(1, 0.5);
      defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${num(x1)}" y1="${num(y1)}" x2="${num(x2)}" y2="${num(y2)}">${stops}</linearGradient>`);
    } else {
      const [cx, cy] = inv(0.5, 0.5), [ex] = inv(1, 0.5);
      defs.push(`<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${num(cx)}" cy="${num(cy)}" r="${num(Math.abs(ex - cx))}">${stops}</radialGradient>`);
    }
    return { fill: `url(#${id})`, opacity: op };
  }
  return null;
}
function shape(d, attr, rule) {
  if (!d || !attr) return '';
  const o = attr.opacity < 1 ? ` fill-opacity="${num(attr.opacity)}"` : '';
  return `<path d="${d}" fill="${attr.fill}"${o}${rule === 'EVENODD' ? ' fill-rule="evenodd"' : ''}/>`;
}
function render(n, root) {
  if (n.visible === false) return '';
  const t = n.transform || {};
  const m = root ? '' : ` transform="matrix(${[t.m00 ?? 1, t.m10 ?? 0, t.m01 ?? 0, t.m11 ?? 1, t.m02 ?? 0, t.m12 ?? 0].map(num).join(' ')})"`;
  const o = n.opacity != null && n.opacity < 1 ? ` opacity="${num(n.opacity)}"` : '';
  let body = '';
  for (const g of n.fillGeometry || []) body += shape(pathData(g.commandsBlob), paintAttr((n.fillPaints || []).find(p => p.visible !== false), n), g.windingRule);
  const stroke = (n.strokePaints || []).find(p => p.visible !== false);
  if (stroke) for (const g of n.strokeGeometry || []) body += shape(pathData(g.commandsBlob), paintAttr(stroke, n), g.windingRule);
  for (const c of children.get(key(n.guid)) || []) body += render(c, false);
  return body ? `<g${m}${o}>${body}</g>` : '';
}
function exportNode(id, file) {
  const n = nodes.get(id);
  if (!n) throw new Error('Missing node ' + id);
  defs = []; seq = 0;
  const body = render(n, true);
  const w = num(n.size.x), h = num(n.size.y);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" aria-hidden="true">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${body}</svg>\n`;
  fs.writeFileSync(path.join(out, file), svg);
  return [file, id, `${w}x${h}`, svg.length];
}

const targets = [
  // Hero illustration
  ['1038:171', 'figma-icon-webhook.svg'],
  ['1038:345', 'figma-icon-shrink-dot.svg'],
  ['1038:355', 'figma-app-zenkit.svg'],
  ['1038:358', 'figma-app-budget.svg'],
  ['1038:361', 'figma-app-xing.svg'],
  ['1038:364', 'figma-app-yoyo.svg'],
  ['1038:325', 'figma-chart-line.svg'],
  ['1038:327', 'figma-chart-tooltip.svg'],
  ['1038:311', 'figma-chart-icon.svg'],
  // What We Build art
  ['1038:662', 'figma-art-project.svg'],
  ['1038:682', 'figma-art-members.svg'],
  ['1038:720', 'figma-art-schedule.svg'],
  ['1038:725', 'figma-art-hub.svg'],
  ['1038:728', 'figma-art-check.svg'],
  ['1038:756', 'figma-art-builder.svg'],
  ['1038:802', 'figma-art-cloud.svg'],
  ['1038:805', 'figma-art-database.svg'],
  ['1038:813', 'figma-art-code.svg'],
];
fs.mkdirSync(out, { recursive: true });
console.table(targets.map(([id, file]) => exportNode(id, file)));

/** Render native-size reference crops from the user's original .fig archive.
 *  The paths and text glyphs come from fig-kiwi. Gradient transforms, shadows,
 *  and image crop modes remain approximations of Figma's renderer.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const { execFileSync } = require('node:child_process');

const source = process.env.CORTEXX_AI_FIGMA || 'C:/Users/Cyb3r/Downloads/ai automation.fig';
const output = path.resolve(__dirname, '../docs/qa/ai-reconstruction-20261027');
const extracted = path.join(os.tmpdir(), 'cortexx-ai-figma-reference');
const moduleRoot = process.env.CORTEXX_FIGMA_MODULES || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules';
const kiwi = require(path.join(moduleRoot, 'kiwi-schema'));
const { decompress } = require(path.join(moduleRoot, 'fzstd'));
const { chromium } = require(path.join(moduleRoot, 'playwright-core'));

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(extracted, { recursive: true });
execFileSync('python', ['-c', 'import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', source, extracted]);
const canvas = fs.readFileSync(path.join(extracted, 'canvas.fig'));
if (canvas.subarray(0, 8).toString() !== 'fig-kiwi') throw new Error('Unexpected Figma format');
const schemaBytes = zlib.inflateRawSync(canvas.subarray(16, 16 + canvas.readUInt32LE(12)));
const schema = kiwi.decodeBinarySchema(schemaBytes);
const compiled = kiwi.compileSchema(schema);
const message = compiled.decodeMessage(Buffer.from(decompress(canvas.subarray(20 + canvas.readUInt32LE(12)))));
const nodes = new Map(message.nodeChanges.map(n => [`${n.guid.sessionID}:${n.guid.localID}`, n]));
const children = new Map();
for (const n of message.nodeChanges) {
  const parent = n.parentIndex?.guid;
  if (!parent) continue;
  const key = `${parent.sessionID}:${parent.localID}`;
  if (!children.has(key)) children.set(key, []);
  children.get(key).push(`${n.guid.sessionID}:${n.guid.localID}`);
}

const num = value => Number.isFinite(value) ? Number(value.toFixed(3)) : 0;
const color = c => c ? `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${num(c.a ?? 1)})` : 'none';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const hash = bytes => [...bytes].map(x => x.toString(16).padStart(2, '0')).join('');
const blobs = message.blobs;
function pathData(index) {
  const bytes = blobs[index]?.bytes;
  if (!bytes) return '';
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let position = 0;
  let result = '';
  while (position < bytes.length) {
    const command = bytes[position++];
    const count = { 0: 0, 1: 2, 2: 2, 3: 4, 4: 6 }[command];
    if (count === undefined || position + count * 4 > bytes.length) return '';
    const values = [];
    for (let i = 0; i < count; i++, position += 4) values.push(num(view.getFloat32(position, true)));
    result += `${['Z', 'M', 'L', 'Q', 'C'][command]}${values.join(' ')} `;
  }
  return result.trim().replace(/^Z\s*/, '');
}
const rectPath = n => `M0 0 H${num(n.size?.x || 0)} V${num(n.size?.y || 0)} H0 Z`;
const imageCache = new Map();
function imageSource(bytes) {
  const name = hash(bytes || []);
  if (imageCache.has(name)) return imageCache.get(name);
  const filename = path.join(extracted, 'images', name);
  if (!fs.existsSync(filename)) return null;
  const data = fs.readFileSync(filename);
  const mime = data[0] === 0x89 ? 'image/png' : data[0] === 0xff ? 'image/jpeg' : 'image/webp';
  const uri = `data:${mime};base64,${data.toString('base64')}`;
  imageCache.set(name, uri);
  return uri;
}

let definitions;
let sequence;
function paintShape(paint, n, shape) {
  if (!paint || paint.visible === false) return '';
  const opacity = num(paint.opacity ?? 1);
  if (paint.type === 'SOLID') return `<path d="${shape}" fill="${color(paint.color)}" opacity="${opacity}"/>`;
  if (paint.type === 'IMAGE') {
    const source = imageSource(paint.image?.hash);
    if (!source) return '';
    const id = `clip${++sequence}`;
    definitions.push(`<clipPath id="${id}"><path d="${shape}"/></clipPath>`);
    return `<image href="${source}" x="0" y="0" width="${num(n.size?.x || 0)}" height="${num(n.size?.y || 0)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})" opacity="${opacity}"/>`;
  }
  if (paint.type.startsWith('GRADIENT')) {
    const id = `gradient${++sequence}`;
    const stops = (paint.stops || []).map(s => `<stop offset="${num(s.position * 100)}%" stop-color="${color(s.color)}"/>`).join('');
    definitions.push(paint.type === 'GRADIENT_RADIAL'
      ? `<radialGradient id="${id}" cx="50%" cy="50%" r="70%">${stops}</radialGradient>`
      : `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient>`);
    return `<path d="${shape}" fill="url(#${id})" opacity="${opacity}"/>`;
  }
  return '';
}

function renderNode(id, depth = 0) {
  const n = nodes.get(id);
  if (!n || n.visible === false || depth > 60) return '';
  const m = n.transform || { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 };
  const matrix = [m.m00, m.m10, m.m01, m.m11, m.m02, m.m12].map(num).join(' ');
  let result = `<g data-figma-id="${id}" data-figma-name="${esc(n.name || '')}" transform="matrix(${matrix})" opacity="${num(n.opacity ?? 1)}">`;
  const paths = (n.fillGeometry || []).map(g => pathData(g.commandsBlob));
  if (n.type === 'TEXT' && n.derivedTextData?.glyphs) {
    const base = (n.fillPaints || []).find(p => p.visible !== false);
    const baseColor = base?.type === 'SOLID' ? color(base.color) : 'rgba(0,0,0,1)';
    const lastWord = n.textData?.characters?.lastIndexOf('Growth.') ?? -1;
    const override = n.textData?.styleOverrideTable?.[0]?.fillPaints?.find(p => p.type === 'SOLID');
    for (const glyph of n.derivedTextData.glyphs) {
      const outline = pathData(glyph.commandsBlob);
      if (!outline) continue;
      const fill = lastWord >= 0 && glyph.firstCharacter >= lastWord && override ? color(override.color) : baseColor;
      const size = num(glyph.fontSize || n.fontSize || 16);
      const point = glyph.position || { x: 0, y: 0 };
      result += `<path d="${outline}" fill="${fill}" transform="translate(${num(point.x)} ${num(point.y)}) scale(${size} ${-size})"/>`;
    }
  } else {
    for (let i = 0; i < paths.length; i++) {
      if (!paths[i]) continue;
      const geometry = n.fillGeometry[i];
      result += paintShape(n.fillPaints?.[geometry.styleID] || n.fillPaints?.[0], n, paths[i]);
    }
    if (!paths.length) for (const p of n.fillPaints || []) result += paintShape(p, n, rectPath(n));
    const stroke = n.strokePaints?.find(p => p.visible !== false);
    if (stroke) {
      const strokeColor = stroke.type === 'SOLID' ? color(stroke.color) : '#888';
      for (const geometry of n.strokeGeometry || []) {
        const outline = pathData(geometry.commandsBlob);
        if (outline) result += `<path d="${outline}" fill="${strokeColor}"/>`;
      }
      if (!n.strokeGeometry?.length && paths[0]) result += `<path d="${paths[0]}" fill="none" stroke="${strokeColor}" stroke-width="${num(n.strokeWeight || 1)}"/>`;
    }
  }
  for (const child of children.get(id) || []) result += renderNode(child, depth + 1);
  return result + '</g>';
}

function globalOrigin(id) {
  let x = 0, y = 0, current = id;
  while (current) {
    const n = nodes.get(current);
    if (!n) break;
    x += n.transform?.m02 || 0;
    y += n.transform?.m12 || 0;
    const p = n.parentIndex?.guid;
    current = p ? `${p.sessionID}:${p.localID}` : null;
  }
  return { x, y };
}
const sections = [
  ['hero', 0, 900], ['challenges', 900, 752], ['capabilities', 1652, 1331],
  ['process', 2983, 898], ['case', 3881, 799], ['testimonials', 4680, 941], ['footer', 5621, 752],
];
const sectionNodes = sections.map(([name, y, height]) => {
  const match = [...nodes.entries()].find(([id, n]) => {
    const origin = globalOrigin(id);
    return n.type === 'FRAME' && Math.abs(origin.x) < 1 && Math.abs(origin.y - y) < 2 && Math.abs((n.size?.x || 0) - 1440) < 1 && Math.abs((n.size?.y || 0) - height) < 2;
  });
  if (!match) throw new Error(`Cannot find Figma section: ${name}`);
  return { name, y, height, id: match[0] };
});

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    for (const section of sectionNodes) {
      definitions = [];
      sequence = 0;
      const body = renderNode(section.id);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="${section.height}" viewBox="0 ${section.y} 1440 ${section.height}"><defs>${definitions.join('')}</defs>${body}</svg>`;
      const filename = path.join(output, `figma-${section.name}.svg`);
      fs.writeFileSync(filename, svg);
      const page = await browser.newPage({ viewport: { width: 1440, height: section.height }, deviceScaleFactor: 1 });
      await page.goto(`file:///${filename.replace(/\\/g, '/')}`);
      await page.screenshot({ path: path.join(output, `figma-${section.name}.png`) });
      await page.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'figma-sections.json'), JSON.stringify(sectionNodes, null, 2));
  console.log(sectionNodes);
}
module.exports = { nodes, children, globalOrigin, sections: sectionNodes, renderNode, pathData };
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });

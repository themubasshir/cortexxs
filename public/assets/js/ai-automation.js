(() => {
  'use strict';
  const page = document.querySelector('.ai-page');
  if (!page || page.dataset.aiMotion === 'ready') return;
  page.dataset.aiMotion = 'ready';

  const workflow = page.querySelector('.ai-workflow');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let played = false;
  let paused = false;
  const toggle = page.querySelector('.ai-motion-toggle');
  let settleTimer;
  const syncMotion = () => {
    clearTimeout(settleTimer);
    if (motion.matches || !visible || document.hidden || paused) {
      workflow.classList.remove('is-playing', 'is-settled');
      return;
    }
    if (!played) {
      played = true;
      workflow.classList.add('is-playing');
      settleTimer = setTimeout(() => {
        workflow.classList.remove('is-playing');
        if (visible && !document.hidden && !motion.matches) workflow.classList.add('is-settled');
      }, 4000);
    } else {
      workflow.classList.add('is-settled');
    }
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncMotion();
    }, { threshold: 0.05 }).observe(workflow);
  } else { visible = true; syncMotion(); }
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    toggle.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
    syncMotion();
  });
  motion.addEventListener?.('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);

  // Section reveals are progressive enhancements: without JS, every section stays visible.
  const revealTargets = [
    page.querySelector('.ai-challenges'),
    page.querySelector('.ai-capabilities'),
    page.querySelector('.ai-case'),
    page.querySelector('.ai-testimonials'),
    page.querySelector('.ai-recognition'),
  ].filter(Boolean);
  page.classList.add('ai-motion-ready');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-revealed'));
  }

  // Rows, cards and tiles enter when they themselves arrive; items arriving together are staggered.
  const revealItems = [...page.querySelectorAll('.ai-challenge, .ai-capability-card, .ai-case-card, .ai-recognition-tile')];
  const showItem = (item, order) => {
    item.style.setProperty('--ai-order', String(order));
    item.classList.add('is-in');
    setTimeout(() => item.style.removeProperty('--ai-order'), 1500);
  };
  if ('IntersectionObserver' in window) {
    const itemObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => revealItems.indexOf(a.target) - revealItems.indexOf(b.target))
        .forEach((entry, order) => {
          itemObserver.unobserve(entry.target);
          showItem(entry.target, order);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => itemObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-in'));
  }

  // The original Figma SVGs are inlined near the viewport so their own layers can move.
  // The <img> remains the no-JavaScript and failed-fetch fallback.
  const NS = 'http://www.w3.org/2000/svg';
  const EASE = 'cubic-bezier(.22,1,.36,1)';
  const svgNode = (parent, tag, attrs) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    parent.append(node);
    return node;
  };
  const layer = (root, selector) => {
    const node = root?.querySelector(selector);
    node?.classList.add('ai-art-layer');
    return node;
  };
  const pathPoints = (svg, d, count = 18) => {
    const path = svgNode(svg, 'path', { d, fill: 'none', visibility: 'hidden' });
    const length = path.getTotalLength();
    const points = Array.from({ length: count }, (_, i) => path.getPointAtLength(length * i / (count - 1)));
    path.remove();
    return points;
  };
  const signal = svg => {
    const group = svgNode(svg, 'g', { opacity: '0' });
    svgNode(group, 'circle', { r: '7', fill: '#4A71FA', 'fill-opacity': '.16' });
    svgNode(group, 'circle', { r: '3.2', fill: '#4A71FA' });
    return group;
  };
  const ripple = (svg, cx, cy, r) => {
    const ring = svgNode(svg, 'circle', { cx, cy, r, fill: 'none', stroke: '#4A71FA', 'stroke-width': '1.4', 'vector-effect': 'non-scaling-stroke', opacity: '0' });
    ring.classList.add('ai-art-layer');
    return ring;
  };
  const fromLeft = node => { if (node) node.style.transformOrigin = 'left center'; return node; };
  const plan = () => {
    const steps = [];
    const add = (node, frames, delay, duration, easing = EASE) => { if (node) steps.push([node, frames, delay, duration, easing]); };
    return {
      pop: (node, at, scale = 1.16, duration = 700) => add(node, [{ transform: 'scale(1)' }, { transform: `scale(${scale})`, offset: 0.38 }, { transform: 'scale(1)' }], at, duration),
      travel: (node, points, at, duration = 620) => add(node, points.map((p, i, all) => {
        const t = i / (all.length - 1);
        return { transform: `translate(${p.x}px,${p.y}px)`, opacity: Math.min(1, t / 0.18, (1 - t) / 0.18), offset: t };
      }), at, duration, 'cubic-bezier(.45,0,.25,1)'),
      ripple: (node, at, scale, duration = 1300) => add(node, [{ transform: 'scale(1)', opacity: 0 }, { transform: 'scale(1.08)', opacity: 0.5, offset: 0.12 }, { transform: `scale(${scale})`, opacity: 0 }], at, duration, 'cubic-bezier(.2,.6,.3,1)'),
      frames: add,
      run: () => steps.map(([node, frames, delay, duration, easing]) => node.animate(frames, { delay, duration, easing, fill: 'both' })),
    };
  };

  // Each builder prepares layers once and returns a function that plays one ~3.2s cycle.
  const choreography = {
    workflow(svg) {
      const input = layer(svg, '[filter^="url(#filter7_d_"]');
      const dotA = layer(svg, '[filter^="url(#filter4_d_"]');
      const dotB = layer(svg, '[filter^="url(#filter5_d_"]');
      const hub = layer(svg, '[filter^="url(#filter8_dd_"]');
      const glow = layer(svg, '[filter^="url(#filter0_f_"]');
      const done = layer(svg, '[filter^="url(#filter10_d_"]');
      const ring = ripple(svg, 302, 155, 52);
      const toHub = pathPoints(svg, 'M222 156 L259 156');
      const toDone = pathPoints(svg, 'M345 156 L381 156');
      const s1 = signal(svg), s2 = signal(svg);
      return () => {
        const p = plan();
        p.pop(input, 0, 1.22);
        p.travel(s1, toHub, 420);
        p.pop(dotA, 640, 1.9, 520);
        p.pop(glow, 980, 1.14, 1100);
        p.pop(hub, 1000, 1.08, 760);
        p.ripple(ring, 1050, 2.05);
        p.travel(s2, toDone, 1720);
        p.pop(dotB, 1750, 1.9, 520);
        p.pop(done, 2300, 1.24, 760);
        return p.run();
      };
    },
    sales(svg) {
      const chart = svg.querySelector('[clip-path^="url(#clip1_"] path[stroke]');
      let chartPath = chart ? pathPoints(svg, chart.getAttribute('d'), 26) : [];
      if (chartPath.length && chartPath[0].x > chartPath[chartPath.length - 1].x) chartPath = chartPath.reverse();
      const end = chartPath[chartPath.length - 1] || { x: 222, y: 176 };
      const value = layer(svg, 'path[fill="#2C3042"]');
      const hub = layer(svg, '[filter^="url(#filter5_dd_"]');
      const glow = layer(svg, '[filter^="url(#filter6_f_"]');
      const dots = ['0', '1', '2'].map(n => layer(svg, `[filter^="url(#filter${n}_d_"]`));
      const support = svg.querySelector('[filter^="url(#filter7_d_"]');
      const checks = [...(support?.querySelectorAll('path[fill="#5364FF"]') || [])];
      checks.forEach(check => check.classList.add('ai-art-layer'));
      const resolved = layer(svg, '[filter^="url(#filter9_d_"]');
      const ring = ripple(svg, 302, 155, 49);
      const toHub = pathPoints(svg, `M${end.x} ${end.y} C${end.x + 18} ${end.y} 244 156 262 156`);
      const toSupport = pathPoints(svg, 'M343 156 C356 156 368 150 381 150');
      const s1 = signal(svg), s2 = signal(svg), s3 = signal(svg);
      return () => {
        const p = plan();
        if (chartPath.length) p.travel(s1, chartPath, 0, 900);
        p.pop(value, 700, 1.18);
        p.travel(s2, toHub, 850, 500);
        p.pop(glow, 1200, 1.2, 1100);
        p.pop(hub, 1250, 1.08, 800);
        p.ripple(ring, 1300, 2.1);
        dots.forEach((dot, i) => p.pop(dot, 1300 + i * 150, 1.9, 500));
        p.travel(s3, toSupport, 1900, 500);
        checks.forEach((check, i) => p.pop(check, 2250 + i * 180, 1.7, 560));
        p.pop(resolved, 2650, 1.8, 600);
        return p.run();
      };
    },
    connected(svg) {
      const tools = ['6', '4', '2'].map(n => layer(svg, `[clip-path^="url(#clip${n}_"]`));
      const dots = ['3', '2', '4'].map(n => layer(svg, `[filter^="url(#filter${n}_d_"]`));
      const routes = ['M130 217 Q150 206 168 197', 'M218 107 Q211 124 205 139', 'M263 219 Q246 208 226 198'].map(d => pathPoints(svg, d));
      const signals = routes.map(() => signal(svg));
      const hub = layer(svg, '[filter^="url(#filter7_dd_"]');
      const glow = layer(svg, '[filter^="url(#filter0_f_"]');
      const ring = ripple(svg, 196, 173, 48);
      return () => {
        const p = plan();
        tools.forEach((tool, i) => {
          const at = i * 700;
          p.pop(tool, at, 1.14);
          p.pop(dots[i], at + 250, 1.9, 500);
          p.travel(signals[i], routes[i], at + 300, 560);
        });
        p.pop(glow, 2200, 1.16, 1100);
        p.pop(hub, 2250, 1.08, 800);
        p.ripple(ring, 2300, 2.2);
        return p.run();
      };
    },
    search(svg) {
      const pill = svg.querySelector('[filter^="url(#filter4_dd_"]');
      const icon = layer(svg, '[filter^="url(#filter5_d_"]');
      const query = pill?.querySelector(':scope > path[fill="#4A71FA"]');
      const logo = layer(svg, 'rect[fill^="url(#pattern0_"]');
      const progress = fromLeft(layer(svg, '[filter^="url(#filter3_d_"]'));
      const dot = layer(svg, '[filter^="url(#filter1_d_"]');
      const resultIcon = layer(svg, '[filter^="url(#filter7_d_"]');
      const resultBar = fromLeft(layer(svg, 'path[fill^="url(#paint2_"]'));
      const scan = svgNode(svg, 'rect', { x: '146', y: '86', width: '87', height: '2', rx: '1', fill: '#4A71FA', opacity: '0' });
      const toResult = pathPoints(svg, 'M242 160 Q252 136 262 124');
      const s1 = signal(svg);
      return () => {
        const p = plan();
        p.pop(icon, 0, 1.16);
        p.frames(query, [{ opacity: 1 }, { opacity: 0.35, offset: 0.5 }, { opacity: 1 }], 100, 900);
        p.frames(scan, [{ transform: 'translateY(0)', opacity: 0 }, { opacity: 0.7, offset: 0.15 }, { opacity: 0.7, offset: 0.85 }, { transform: 'translateY(140px)', opacity: 0 }], 500, 1300, 'cubic-bezier(.45,0,.55,1)');
        p.frames(progress, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(.12)', offset: 0.08 }, { transform: 'scaleX(1)' }], 500, 1400);
        p.pop(logo, 1700, 1.12);
        p.pop(dot, 1900, 1.9, 500);
        p.travel(s1, toResult, 1950, 520);
        p.pop(resultIcon, 2350, 1.22);
        p.frames(resultBar, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(.04)', offset: 0.08 }, { transform: 'scaleX(1)' }], 2350, 900);
        return p.run();
      };
    },
    product(svg) {
      const legacy = svg.querySelector('path[fill="#282A35"]');
      const ready = layer(svg, '[filter^="url(#filter4_dd_"]');
      const glow = layer(svg, '[filter^="url(#filter0_f_"]');
      const bar = svg.querySelector('[clip-path^="url(#clip0_"]');
      const defs = svg.querySelector('defs') || svgNode(svg, 'defs', {});
      const gradient = svgNode(defs, 'linearGradient', { id: 'ai-v3-product-sweep', x1: '0', y1: '0', x2: '0', y2: '1' });
      [['0', '0'], ['.5', '.8'], ['1', '0']].forEach(([offset, alpha]) => svgNode(gradient, 'stop', { offset, 'stop-color': '#fff', 'stop-opacity': alpha }));
      const sweep = bar ? svgNode(bar, 'rect', { x: '188', y: '56', width: '14', height: '30', fill: 'url(#ai-v3-product-sweep)', opacity: '0' }) : null;
      const rings = [ripple(svg, 196, 156, 31), ripple(svg, 196, 156, 31)];
      const fromLegacy = pathPoints(svg, 'M247 104 Q225 92 204 100');
      const toReady = pathPoints(svg, 'M188 214 Q166 224 144 212');
      const s1 = signal(svg), s2 = signal(svg);
      return () => {
        const p = plan();
        p.frames(legacy, [{ opacity: 1 }, { opacity: 0.45, offset: 0.3 }, { opacity: 0.45, offset: 0.8 }, { opacity: 1 }], 0, 2900, 'ease-in-out');
        p.travel(s1, fromLegacy, 150, 600);
        p.frames(sweep, [{ transform: 'translateY(0)', opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.85 }, { transform: 'translateY(170px)', opacity: 0 }], 650, 1300, 'cubic-bezier(.45,0,.55,1)');
        p.pop(glow, 900, 1.14, 1300);
        rings.forEach((ring, i) => p.ripple(ring, 900 + i * 350, 2.8, 1400));
        p.travel(s2, toReady, 1850, 600);
        p.pop(ready, 2300, 1.22, 760);
        return p.run();
      };
    },
  };

  const artCards = [...page.querySelectorAll('.ai-capability-card')];
  const artState = new Map(artCards.map(card => [card, { visible: false, loading: false, play: null }]));
  const art = { card: null, animations: [], timer: 0, last: -1 };
  const stopArt = () => {
    clearTimeout(art.timer);
    art.animations.forEach(animation => animation.cancel());
    art.animations = [];
    art.card?.classList.remove('is-animating');
    art.card = null;
  };
  const playArt = card => {
    stopArt();
    art.card = card;
    art.last = artCards.indexOf(card);
    card.classList.add('is-animating');
    art.animations = artState.get(card).play();
    Promise.all(art.animations.map(animation => animation.finished)).then(() => {
      if (art.card !== card) return;
      stopArt();
      queueArt();
    }, () => {});
  };
  const nextArt = () => {
    if (art.card || motion.matches || document.hidden) return;
    const ready = artCards.filter(card => artState.get(card).visible && artState.get(card).play);
    if (!ready.length) return;
    playArt(ready.find(card => artCards.indexOf(card) > art.last) || ready[0]);
  };
  // Only one illustration plays at a time; visible cards take turns with a rest between cycles.
  const queueArt = (wait = 1500) => {
    clearTimeout(art.timer);
    art.timer = setTimeout(nextArt, wait);
  };
  const inlineArt = async card => {
    const state = artState.get(card);
    const img = card.querySelector('.ai-capability-art img');
    const name = [...card.classList].find(c => c.startsWith('ai-capability-') && c !== 'ai-capability-card')?.slice(14);
    if (state.loading || !img || !choreography[name]) return;
    state.loading = true;
    try {
      const response = await fetch(img.src, { credentials: 'same-origin' });
      if (!response.ok) return;
      const source = new DOMParser().parseFromString(await response.text(), 'image/svg+xml').documentElement;
      if (source.nodeName.toLowerCase() !== 'svg') return;
      const svg = document.importNode(source, true);
      svg.querySelectorAll('script').forEach(node => node.remove());
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      img.after(svg);
      state.play = choreography[name](svg);
      img.remove();
      if (state.visible) queueArt(700);
    } catch {
      // Keep the static <img> fallback.
    }
  };
  if ('IntersectionObserver' in window) {
    const loadObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadObserver.unobserve(entry.target);
        inlineArt(entry.target);
      });
    }, { rootMargin: '400px 0px' });
    const playObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const state = artState.get(entry.target);
        state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        if (!state.visible && art.card === entry.target) { stopArt(); queueArt(400); }
        else if (state.visible && !art.card) queueArt(700);
      });
    }, { threshold: [0, 0.4] });
    artCards.forEach(card => { loadObserver.observe(card); playObserver.observe(card); });
  } else {
    artCards.forEach(card => { artState.get(card).visible = true; inlineArt(card); });
  }
  artCards.forEach(card => card.addEventListener('pointerenter', () => {
    const state = artState.get(card);
    if (state.play && art.card !== card && !motion.matches && !document.hidden) playArt(card);
  }));
  motion.addEventListener?.('change', () => (motion.matches ? stopArt() : queueArt(300)));
  document.addEventListener('visibilitychange', () => (document.hidden ? stopArt() : queueArt(500)));

  // The same viewport line drives the connector and every step; upward scroll reverses it.
  const timeline = page.querySelector('.ai-step-list');
  const timelineSteps = [...timeline.querySelectorAll('li')];
  const clamp = value => Math.max(0, Math.min(1, value));
  let timelineFrame = 0;
  const updateTimeline = () => {
    timelineFrame = 0;
    const listBox = timeline.getBoundingClientRect();
    const markers = timelineSteps.map(item => item.querySelector('.ai-step-number').getBoundingClientRect());
    const centers = markers.map(box => box.top + box.height / 2);
    const start = centers[0];
    const end = centers[centers.length - 1];
    timeline.style.setProperty('--ai-line-left', `${markers[0].left + markers[0].width / 2 - listBox.left}px`);
    timeline.style.setProperty('--ai-line-top', `${start - listBox.top}px`);
    timeline.style.setProperty('--ai-line-length', `${end - start}px`);
    const gate = innerHeight * 0.72;
    const progress = motion.matches ? 1 : clamp((gate - start) / Math.max(1, end - start));
    timeline.style.setProperty('--ai-timeline-progress', String(progress));
    timelineSteps.forEach((item, index) => {
      item.classList.toggle('is-active', motion.matches || centers[index] <= gate);
    });
  };
  const queueTimeline = () => {
    if (!timelineFrame) timelineFrame = requestAnimationFrame(updateTimeline);
  };
  addEventListener('scroll', queueTimeline, { passive: true });
  addEventListener('resize', queueTimeline, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(queueTimeline).observe(timeline);
  motion.addEventListener?.('change', queueTimeline);
  document.fonts?.ready.then(queueTimeline);
  queueTimeline();

  // Exactly three original cards are rotated in place. No duplicate slide is shown.
  const track = page.querySelector('.ai-testimonial-track');
  const status = page.querySelector('.ai-testimonial-status');
  const cards = [...track.querySelectorAll('article')];
  const directions = [];
  let moving = false;
  const visibleCount = () => matchMedia('(max-width: 520px)').matches ? 1
    : matchMedia('(max-width: 1100px)').matches ? 2 : 3;
  const announce = () => {
    const first = cards.indexOf(track.firstElementChild);
    status.textContent = `Testimonial ${first + 1} of ${cards.length} first`;
    [...track.children].forEach((card, index) => {
      card.setAttribute('aria-hidden', String(index >= visibleCount()));
    });
  };
  const advance = async () => {
    if (moving || !directions.length) return;
    moving = true;
    const direction = directions.shift();
    const items = [...track.children];
    const before = new Map(items.map(item => [item, item.getBoundingClientRect()]));
    const wrapped = direction > 0 ? items[0] : items[items.length - 1];
    if (direction > 0) track.append(wrapped);
    else track.prepend(wrapped);
    const animations = [];
    if (!motion.matches) {
      items.forEach(item => {
        const old = before.get(item);
        const current = item.getBoundingClientRect();
        const dx = old.left - current.left;
        const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
        const entry = (current.width + gap) * direction;
        const frames = item === wrapped
          ? [
              { transform: `translateX(${entry}px)`, opacity: 0 },
              { transform: 'translateX(0)', opacity: 1 },
            ]
          : [
              { transform: `translateX(${dx}px)`, opacity: 1 },
              { transform: `translateX(${dx * 0.5}px) translateY(-3px)`, boxShadow: '0 14px 34px #17244016', opacity: 1, offset: 0.5 },
              { transform: 'translateX(0)', opacity: 1 },
            ];
        animations.push(item.animate(frames, { duration: 420, easing: 'cubic-bezier(.22,.7,.22,1)' }));
      });
    }
    announce();
    track.setAttribute('aria-busy', 'true');
    await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    track.removeAttribute('aria-busy');
    moving = false;
    advance();
  };
  const navigate = direction => {
    directions.push(direction);
    advance();
  };
  page.querySelector('[data-testimonial-prev]').addEventListener('click', () => navigate(-1));
  page.querySelector('[data-testimonial-next]').addEventListener('click', () => navigate(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let touchX = null;
  track.addEventListener('touchstart', event => {
    touchX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });
  track.addEventListener('touchend', event => {
    if (touchX === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchX) - touchX;
    touchX = null;
    if (Math.abs(delta) > 45) navigate(delta < 0 ? 1 : -1);
  }, { passive: true });
  addEventListener('resize', announce, { passive: true });
  announce();

})();

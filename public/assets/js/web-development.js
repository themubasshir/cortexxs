(() => {
  'use strict';
  const page = document.querySelector('.wd-page');
  if (!page || page.dataset.wdMotion === 'ready') return;
  page.dataset.wdMotion = 'ready';

  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  /* Hero studio: entrance once, then a restrained settled loop. */
  const studio = page.querySelector('.wd-studio');
  const toggle = page.querySelector('.wd-motion-toggle');
  if (studio) {
    let visible = false;
    let played = false;
    let paused = false;
    let settleTimer;
    const ENTRANCE_MS = 2500;
    const sync = () => {
      clearTimeout(settleTimer);
      if (motion.matches || !visible || document.hidden || paused) {
        studio.classList.remove('is-playing', 'is-settled');
        return;
      }
      if (!played) {
        played = true;
        studio.classList.add('is-playing');
        settleTimer = setTimeout(() => {
          studio.classList.remove('is-playing');
          if (visible && !document.hidden && !paused && !motion.matches) studio.classList.add('is-settled');
        }, ENTRANCE_MS);
      } else {
        studio.classList.add('is-settled');
      }
    };
    studio.classList.remove('is-pending');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 }).observe(studio);
    } else {
      visible = true;
      sync();
    }
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener?.('change', sync);
    toggle?.addEventListener('click', () => {
      paused = !paused;
      // A pause during the entrance skips straight to the final composition.
      if (paused) played = true;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
      sync();
    });
  }

  /* Before/after compare: range input drives the split. */
  page.querySelectorAll('.wd-compare-frame').forEach(frame => {
    const range = frame.querySelector('.wd-compare-range');
    range?.addEventListener('input', () => frame.style.setProperty('--split', range.value + '%'));
  });

  /* Accordion: single open item. */
  const items = [...page.querySelectorAll('.wd-acc-item')];
  items.forEach(item => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      items.forEach(other => {
        const isTarget = other === item && open;
        other.classList.toggle('is-open', isTarget);
        other.querySelector('button').setAttribute('aria-expanded', String(isTarget));
      });
    });
  });

  /* Process timeline: steps activate as they pass the reading line. */
  const steps = [...page.querySelectorAll('.wd-step')];
  if (steps.length) {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = innerHeight * 0.62;
      let active = 0;
      steps.forEach((step, i) => { if (step.getBoundingClientRect().top < line) active = i; });
      steps.forEach((step, i) => step.classList.toggle('is-active', i <= active));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    update();
  }
})();

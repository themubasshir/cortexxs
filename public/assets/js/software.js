(() => {
  'use strict';
  const page = document.querySelector('.sw-page');
  if (!page || page.dataset.swMotion === 'ready') return;
  page.dataset.swMotion = 'ready';

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const hasIO = 'IntersectionObserver' in window;

  /* Hero: entrance once (designed, connected, executed), then the settled "maintained" loop. */
  const hero = page.querySelector('.sw-hero');
  const toggle = page.querySelector('.sw-motion-toggle');
  if (hero) {
    let visible = false;
    let played = false;
    let paused = false;
    let observed = false;
    let settleTimer;
    const ENTRANCE_MS = 2600;
    const sync = () => {
      clearTimeout(settleTimer);
      if (motion.matches || !visible || document.hidden || paused) {
        hero.classList.remove('is-playing', 'is-settled');
        return;
      }
      if (!played) {
        played = true;
        hero.classList.add('is-playing');
        settleTimer = setTimeout(() => {
          hero.classList.remove('is-playing');
          if (visible && !document.hidden && !paused && !motion.matches) hero.classList.add('is-settled');
        }, ENTRANCE_MS);
      } else {
        hero.classList.add('is-settled');
      }
    };
    const start = () => {
      hero.classList.remove('is-pending');
      sync();
    };
    if (hasIO) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        // Loaded below the hero (anchor or restored scroll): show the final frame instead of replaying later.
        if (!observed) {
          observed = true;
          if (!visible) played = true;
          start();
          return;
        }
        sync();
      }, { threshold: 0.15 }).observe(hero);
    } else {
      visible = true;
      start();
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
  page.querySelectorAll('.sw-compare-frame').forEach(frame => {
    const range = frame.querySelector('.sw-compare-range');
    range?.addEventListener('input', () => frame.style.setProperty('--split', range.value + '%'));
  });

  /* Process timeline: steps activate as they pass the reading line. */
  const steps = [...page.querySelectorAll('.sw-step')];
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

  /* Testimonials: one reveal when the section enters view. The carousel itself is testimonial-carousel.js. */
  const testimonials = page.querySelector('.sw-testimonials');
  if (testimonials && hasIO && !motion.matches) {
    page.classList.add('sw-motion-ready');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        testimonials.classList.add('is-revealed');
        io.disconnect();
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(testimonials);
  }
})();

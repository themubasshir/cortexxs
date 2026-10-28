(() => {
  'use strict';
  const page = document.querySelector('.ai-page');
  if (!page) return;

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

  const track = page.querySelector('.ai-testimonial-track');
  const step = () => (track.querySelector('article')?.getBoundingClientRect().width || 320) + 20;
  page.querySelector('[data-testimonial-prev]').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: motion.matches ? 'instant' : 'smooth' }));
  page.querySelector('[data-testimonial-next]').addEventListener('click', () => track.scrollBy({ left: step(), behavior: motion.matches ? 'instant' : 'smooth' }));

})();

(() => {
  'use strict';
  const page = document.querySelector('.ai-page');
  if (!page) return;

  const menuButton = page.querySelector('.ai-menu-button');
  const mobileNav = page.querySelector('.ai-mobile-nav');
  const closeMenu = () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };
  menuButton.addEventListener('click', () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const workflow = page.querySelector('.ai-workflow');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let played = false;
  let settleTimer;
  const syncMotion = () => {
    clearTimeout(settleTimer);
    if (motion.matches || !visible || document.hidden) {
      workflow.classList.remove('is-playing', 'is-settled');
      return;
    }
    if (!played) {
      played = true;
      workflow.classList.add('is-playing');
      settleTimer = setTimeout(() => {
        workflow.classList.remove('is-playing');
        if (visible && !document.hidden && !motion.matches) workflow.classList.add('is-settled');
      }, 2400);
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
  motion.addEventListener?.('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);

  const track = page.querySelector('.ai-testimonial-track');
  const step = () => (track.querySelector('article')?.getBoundingClientRect().width || 320) + 20;
  page.querySelector('[data-testimonial-prev]').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: motion.matches ? 'instant' : 'smooth' }));
  page.querySelector('[data-testimonial-next]').addEventListener('click', () => track.scrollBy({ left: step(), behavior: motion.matches ? 'instant' : 'smooth' }));

  const form = page.querySelector('.news-form');
  const message = page.querySelector('#newsMsg');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const email = form.querySelector('input[name=email]')?.value.trim() || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = 'Please enter a valid email.';
      return;
    }
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'X-Requested-With': 'fetch' } });
      const result = await response.json();
      message.textContent = result.message || (response.ok ? 'Thanks — we’ll be in touch.' : 'Something went wrong.');
      if (response.ok) form.reset();
    } catch {
      message.textContent = 'Network error — try again.';
    }
  });
})();

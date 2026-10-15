/* Cortexx interactions */
(() => {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* sticky header */
  const header = document.getElementById('header');
  addEventListener('scroll', () => {
    header.classList.toggle('is-stuck', scrollY > 40);
  }, { passive: true });

  /* mobile nav */
  const nav = document.getElementById('mobileNav');
  const open = document.getElementById('menuToggle');
  const close = document.getElementById('menuClose');
  open.addEventListener('click', () => { nav.classList.add('open'); open.setAttribute('aria-expanded','true'); });
  close.addEventListener('click', () => { nav.classList.remove('open'); open.setAttribute('aria-expanded','false'); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* reveals */
  if (!reduceMotion) {
    const io = new IntersectionObserver(es => es.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.delay || (i * 60)) + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* testimonial rows: arrows, drag, keyboard */
  const rows = [...document.querySelectorAll('.mrow')];
  let offset = 0;
  const nudge = dir => {
    offset += dir * 300;
    rows.forEach(r => { r.style.animationPlayState = 'paused'; r.style.transform = `translateX(${offset}px)`; });
    clearTimeout(window.testimonialResume);
    window.testimonialResume = setTimeout(() => rows.forEach(r => { r.style.transform = ''; r.style.animationPlayState = ''; }), 900);
  };
  document.getElementById('tPrev')?.addEventListener('click', () => nudge(1));
  document.getElementById('tNext')?.addEventListener('click', () => nudge(-1));
  rows.forEach(row => {
    row.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') nudge(1); if (e.key === 'ArrowRight') nudge(-1); });
    let start = 0;
    row.addEventListener('pointerdown', e => { start = e.clientX; row.setPointerCapture(e.pointerId); row.style.animationPlayState = 'paused'; });
    row.addEventListener('pointerup', e => { const delta = e.clientX - start; if (Math.abs(delta) > 24) nudge(delta > 0 ? 1 : -1); else row.style.animationPlayState = ''; });
  });

  /* footer reveal */
  const footer = document.querySelector('.footer');
  if (footer && !reduceMotion) new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) { footer.classList.add('footer-in'); observer.disconnect(); }
  }, { threshold: .18 }).observe(footer);
  if (footer && reduceMotion) footer.classList.add('footer-in');

  /* newsletter forms */
  document.querySelectorAll('.news-form').forEach(form => {
    const msg = form.parentElement.querySelector('[role=status]') || document.getElementById('newsMsg');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { if(msg){msg.textContent='Please enter a valid email.';msg.style.color='#ff6347';} return; }
      const fd = new FormData(form);
      try {
        const r = await fetch(form.action, { method: 'POST', body: fd, headers: { 'X-Requested-With': 'fetch' } });
        const j = await r.json();
        if(msg){ msg.textContent = j.message || (r.ok ? 'Thanks — we’ll be in touch.' : 'Something went wrong.'); msg.style.color = r.ok ? '#7b95ff' : '#ff6347'; }
        if (r.ok) form.reset();
      } catch { if(msg){ msg.textContent = 'Network error — try again.'; msg.style.color = '#ff6347'; } }
    });
  });
})();

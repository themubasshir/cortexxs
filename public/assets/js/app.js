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

  /* testimonial carousel */
  const carousel = document.getElementById('testimonialCarousel');
  const track = document.getElementById('testimonialTrack');
  let carouselX = 0;
  const carouselMove = amount => {
    if (!carousel || !track) return;
    const min = Math.min(0, carousel.clientWidth - track.scrollWidth);
    carouselX = Math.max(min, Math.min(0, carouselX + amount));
    track.style.transform = `translateX(${carouselX}px)`;
  };
  const carouselStep = () => {
    const card = track?.querySelector('.tcard');
    return (card?.getBoundingClientRect().width || 400) + 20;
  };
  document.getElementById('tPrev')?.addEventListener('click', () => carouselMove(carouselStep()));
  document.getElementById('tNext')?.addEventListener('click', () => carouselMove(-carouselStep()));
  if (carousel && track) {
    carousel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') carouselMove(420); if (e.key === 'ArrowRight') carouselMove(-420); });
    let start = 0;
    carousel.addEventListener('pointerdown', e => { start = e.clientX; track.classList.add('is-dragging'); carousel.setPointerCapture(e.pointerId); });
    carousel.addEventListener('pointerup', e => {
      const delta = e.clientX - start;
      carouselMove(Math.abs(delta) > 24 ? delta : 0);
      track.classList.remove('is-dragging');
    });
    carousel.addEventListener('pointercancel', () => track.classList.remove('is-dragging'));
  }

  /* footer reveal */
  const footer = document.querySelector('.footer');
  if (footer && !reduceMotion) new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) { footer.classList.add('footer-in'); observer.disconnect(); }
  }, { threshold: .08 }).observe(footer);
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

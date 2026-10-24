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

  /* service previews: hover/focus on fine pointers, viewport activation on touch */
  const serviceList = document.querySelector('[data-services]');
  if (serviceList) {
    const rows = [...serviceList.querySelectorAll('[data-service]')];
    const previews = [...serviceList.querySelectorAll('[data-service-preview]')];
    const activate = slug => {
      rows.forEach(row => row.classList.toggle('is-active', row.dataset.service === slug));
      previews.forEach(image => image.classList.toggle('is-visible', image.dataset.servicePreview === slug));
    };
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => activate(row.dataset.service));
      row.addEventListener('focusin', () => activate(row.dataset.service));
    });
    if (!reduceMotion) {
      const serviceObserver = new IntersectionObserver(entries => {
        const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight / 2) - Math.abs(b.boundingClientRect.top - innerHeight / 2))[0];
        if (active) activate(active.target.dataset.service);
      }, {threshold: 0.45, rootMargin: '-20% 0px -20% 0px'});
      rows.forEach(row => serviceObserver.observe(row));
    } else activate(rows[0]?.dataset.service);
  }

  /* testimonial carousel */
  const carousel = document.getElementById('testimonialCarousel');
  const tracks = carousel ? [...carousel.querySelectorAll('.testimonial-track')] : [];
  const track = tracks[0];
  let carouselTimer;
  let carouselVisible = false;
  let carouselBusy = false;
  let carouselHover = false;
  let carouselFocused = false;
  let carouselDragging = false;
  let carouselPaused = reduceMotion;
  let manualPause = reduceMotion;
  const carouselStep = () => (track?.querySelector('.tcard')?.getBoundingClientRect().width || 400) + 20;
  tracks.forEach(row => row.style.animationPlayState = 'running');
  const carouselCanPlay = () => {
    if (!carousel) return false;
    carouselPaused = manualPause || reduceMotion;
    const rect = carousel.getBoundingClientRect();
    carouselVisible = rect.bottom > 0 && rect.top < innerHeight;
    return carouselVisible && !carouselPaused && !carouselHover && !carouselFocused && !carouselDragging && !document.hidden;
  };
  const scheduleCarousel = () => {
    clearTimeout(carouselTimer);
    if (!carouselCanPlay()) return;
    carouselTimer = setTimeout(() => {
      if (carouselCanPlay()) carouselLoop('next');
    }, 4000);
  };
  const carouselLoop = direction => {
    if (!track || tracks.some(row => row.children.length < 2) || carouselBusy) return;
    tracks.forEach(row => row.style.animation = 'none');
    carouselBusy = true;
    const step = carouselStep();
    if (direction === 'prev') {
      track.prepend(track.lastElementChild);
      track.style.transition = 'none';
      track.style.transform = `translateX(${-step}px)`;
    }
    requestAnimationFrame(() => {
      track.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      track.style.transform = `translateX(${direction === 'next' ? -step : 0}px)`;
    });
    track.addEventListener('transitionend', () => {
      track.style.transition = 'none';
      if (direction === 'next') track.append(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      tracks.forEach(row => { row.style.animation = ''; row.style.animationPlayState = 'running'; });
      carouselBusy = false;
      requestAnimationFrame(() => { track.style.transition = ''; scheduleCarousel(); });
    }, { once: true });
  };
  const manualCarousel = direction => { clearTimeout(carouselTimer); carouselLoop(direction); };
  const toggle = document.getElementById('tToggle');
  const updateToggle = () => {
    if (!toggle) return;
    toggle.textContent = carouselPaused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', carouselPaused ? 'Play testimonials' : 'Pause testimonials');
    toggle.setAttribute('aria-pressed', String(carouselPaused));
  };
  toggle?.addEventListener('click', () => { manualPause = !manualPause; carouselPaused = manualPause || reduceMotion; tracks.forEach(row => row.style.animationPlayState = carouselPaused ? 'paused' : 'running'); updateToggle(); scheduleCarousel(); });
  document.getElementById('tPrev')?.addEventListener('click', () => manualCarousel('prev'));
  document.getElementById('tNext')?.addEventListener('click', () => manualCarousel('next'));
  if (carousel && track) {
    const carouselRegion = document.querySelector('.testi') || carousel;
    carousel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') manualCarousel('prev'); if (e.key === 'ArrowRight') manualCarousel('next'); });
    carouselRegion.addEventListener('mouseenter', () => { carouselHover = true; clearTimeout(carouselTimer); tracks.forEach(row => row.style.animationPlayState = 'paused'); });
    carouselRegion.addEventListener('mouseleave', () => { carouselHover = false; tracks.forEach(row => row.style.animationPlayState = 'running'); scheduleCarousel(); });
    carouselHover = false;
    carouselRegion.addEventListener('focusin', () => { carouselFocused = true; clearTimeout(carouselTimer); tracks.forEach(row => row.style.animationPlayState = 'paused'); });
    carouselRegion.addEventListener('focusout', e => { if (!carouselRegion.contains(e.relatedTarget)) { carouselFocused = false; tracks.forEach(row => row.style.animationPlayState = 'running'); scheduleCarousel(); } });
    let start = 0;
    carousel.addEventListener('pointerdown', e => { carouselDragging = true; start = e.clientX; clearTimeout(carouselTimer); track.classList.add('is-dragging'); carousel.setPointerCapture(e.pointerId); });
    carousel.addEventListener('pointerup', e => { const delta = e.clientX - start; if (Math.abs(delta) > 24) manualCarousel(delta < 0 ? 'next' : 'prev'); carouselDragging = false; track.classList.remove('is-dragging'); scheduleCarousel(); });
    carousel.addEventListener('pointercancel', () => { carouselDragging = false; track.classList.remove('is-dragging'); scheduleCarousel(); });
    new IntersectionObserver(([entry]) => {
      const rect = carousel.getBoundingClientRect();
      carouselVisible = entry.isIntersecting || (rect.bottom > 0 && rect.top < innerHeight);
      scheduleCarousel();
    }, { threshold: .1 }).observe(carousel);
    carouselVisible = carousel.getBoundingClientRect().bottom > 0 && carousel.getBoundingClientRect().top < innerHeight;
    scheduleCarousel();
  }
  addEventListener('scroll', () => {
    if (!carousel) return;
    const rect = carousel.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < innerHeight;
    if (visible !== carouselVisible) { carouselVisible = visible; scheduleCarousel(); }
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(carouselTimer); tracks.forEach(row => row.style.animationPlayState = 'paused'); }
    else { tracks.forEach(row => row.style.animationPlayState = 'running'); scheduleCarousel(); }
  });
  updateToggle();

  /* footer reveal */
  const footer = document.querySelector('.footer');
  const footerReveal = document.querySelector('.footer-reveal');
  if (footer && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) footer.classList.add('footer-in');
      else footer.classList.remove('footer-in');
    }), { threshold: [0, .08] });
    revealObserver.observe(footerReveal || footer);
  }
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

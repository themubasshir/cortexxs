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

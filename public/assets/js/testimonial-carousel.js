/* Three-card testimonial carousel (shared by service pages). One controller per [data-testimonial-carousel] root. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  const init = root => {
    if (root.dataset.carouselReady === 'true') return;
    const track = root.querySelector('.ai-testimonial-track');
    const status = root.querySelector('.ai-testimonial-status');
    if (!track) return;
    root.dataset.carouselReady = 'true';

    // Exactly three original cards are rotated in place. No duplicate slide is shown.
    const cards = [...track.querySelectorAll('article')];
    const directions = [];
    let moving = false;
    const visibleCount = () => matchMedia('(max-width: 520px)').matches ? 1
      : matchMedia('(max-width: 1100px)').matches ? 2 : 3;
    const announce = () => {
      const first = cards.indexOf(track.firstElementChild);
      if (status) status.textContent = `Testimonial ${first + 1} of ${cards.length} first`;
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
        const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
        items.forEach(item => {
          const old = before.get(item);
          const current = item.getBoundingClientRect();
          const dx = old.left - current.left;
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
    root.querySelector('[data-testimonial-prev]')?.addEventListener('click', () => navigate(-1));
    root.querySelector('[data-testimonial-next]')?.addEventListener('click', () => navigate(1));
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
  };

  document.querySelectorAll('[data-testimonial-carousel]').forEach(init);
})();

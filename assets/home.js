(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const spacious = matchMedia('(min-width: 901px) and (min-height: 600px), (max-width: 900px) and (min-height: 640px)');
  const steps = [...document.querySelectorAll('.story-step')];
  const anchors = steps.map((step, index) => {
    const anchor = document.createElement('div');
    anchor.className = 'scene-anchor';
    anchor.setAttribute('aria-hidden', 'true');
    step.before(anchor);
    step.style.setProperty('--scene-index', index + 1);
    return anchor;
  });
  let stackEnabled = false;
  let framePending = false;
  let revealObserver;

  function renderStack() {
    framePending = false;
    if (!stackEnabled) return;
    // Read layout together, then write compositor properties once per frame.
    const progress = steps.map((step, index) => {
      if (index === steps.length - 1) return 0;
      const nextTop = anchors[index + 1].getBoundingClientRect().top;
      return Math.max(0, Math.min(1, (innerHeight - 12 - nextTop) / step.clientHeight));
    });
    steps.forEach((step, index) => {
      step.style.setProperty('--scene-scale', (1 - progress[index] * .045).toFixed(4));
      step.style.setProperty('--scene-lift', `${(-progress[index] * 8).toFixed(2)}px`);
      step.style.setProperty('--scene-brightness', (1 - progress[index] * .12).toFixed(4));
    });
  }

  function queueStackFrame() {
    if (!stackEnabled || framePending) return;
    framePending = true;
    requestAnimationFrame(renderStack);
  }

  function configureStory() {
    stackEnabled = false;
    root.classList.remove('scrolly-ready');
    if (reduced.matches || !spacious.matches) return;
    root.classList.add('scrolly-ready');
    // Text zoom or a shorter viewport must never clip the card's content.
    if (steps.some(step => {
      const inner = step.querySelector('.scene-inner');
      return inner.scrollHeight > inner.clientHeight + 2;
    })) {
      root.classList.remove('scrolly-ready');
      return;
    }
    stackEnabled = true;
    renderStack();
  }

  function configureReveals() {
    revealObserver?.disconnect();
    root.classList.remove('motion-ready');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    root.classList.add('motion-ready');
  }

  configureStory();
  configureReveals();
  spacious.addEventListener('change', configureStory);
  addEventListener('scroll', queueStackFrame, { passive: true });
  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(configureStory, 120);
  });
  reduced.addEventListener('change', () => { configureStory(); configureReveals(); });
  document.fonts.ready.then(configureStory);

  document.querySelector('.story').addEventListener('focusin', event => {
    if (!stackEnabled || !event.target.matches(':focus-visible')) return;
    const index = steps.indexOf(event.target.closest('.story-step'));
    if (index < 0 || index === steps.length - 1) return;
    const top = parseFloat(getComputedStyle(steps[index]).top);
    if (anchors[index + 1].getBoundingClientRect().top < innerHeight - 12) {
      scrollTo({ top: scrollY + anchors[index].getBoundingClientRect().top - top, behavior: 'instant' });
    }
  });

  const menu = document.querySelector('.mobile-menu');
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
})();

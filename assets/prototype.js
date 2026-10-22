(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px) and (min-height: 701px)');
  const steps = [...document.querySelectorAll('.story-step')];
  const frames = [...document.querySelectorAll('.stage-image')];
  const dots = [...document.querySelectorAll('.stage-dots span')];
  const state = document.querySelector('.stage-state');
  const caption = document.querySelector('.stage-caption');
  let storyObserver;
  let revealObserver;

  function activate(index) {
    steps.forEach((step, i) => step.classList.toggle('is-current', i === index));
    const previous = frames.findIndex(frame => frame.classList.contains('is-active'));
    frames.forEach((frame, i) => {
      frame.classList.toggle('is-active', i === index);
      frame.classList.toggle('is-previous', previous !== index && i === previous);
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    state.textContent = `0${index + 1} / 03`;
    caption.textContent = steps[index].querySelector('figcaption span').textContent;
  }

  function configureStory() {
    storyObserver?.disconnect();
    root.classList.remove('scrolly-ready');
    if (reduced.matches || !desktop.matches || !('IntersectionObserver' in window)) return;
    storyObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) {
        const nearest = visible.sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight * .45) - Math.abs(b.boundingClientRect.top - innerHeight * .45))[0];
        activate(Number(nearest.target.dataset.step));
      }
    }, { rootMargin: `-${Math.round(innerHeight * .42)}px 0px -${Math.round(innerHeight * .42)}px 0px`, threshold: 0 });
    steps.forEach(step => storyObserver.observe(step));
    root.classList.add('scrolly-ready');
    const visual = document.querySelector('.story-visual');
    visual.style.top = `${Math.max(110, (innerHeight - visual.getBoundingClientRect().height) / 2)}px`;
    const nearestStep = steps.map((step, index) => {
      const rect = step.getBoundingClientRect();
      return { index, distance: Math.abs(rect.top + rect.height / 2 - innerHeight / 2) };
    }).sort((a, b) => a.distance - b.distance)[0];
    activate(nearestStep.index);
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
  desktop.addEventListener('change', configureStory);
  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(configureStory, 120);
  });
  reduced.addEventListener('change', () => { configureStory(); configureReveals(); });

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

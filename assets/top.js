/* Top page: workflow tabs, muted looping films, mobile menu. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  // Films play only while visible, and never with reduced motion (the poster stays).
  const films = [...document.querySelectorAll('video[data-loop]')];
  const visible = new Set();
  function sync(video) {
    const panel = video.closest('[role="tabpanel"]');
    const shown = !panel || !panel.hidden;
    if (!reduced.matches && shown && visible.has(video)) {
      if (video.preload !== 'auto') video.preload = 'auto';
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
    }
  }
  films.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.controls = false;
    video.playsInline = true;
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
        sync(e.target);
      });
    }, { threshold: .25 });
    films.forEach(v => io.observe(v));
  }
  reduced.addEventListener('change', () => films.forEach(sync));

  // Tabs
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    function select(i, focus) {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
        const v = panels[j].querySelector('video');
        if (v) { if (!on) v.pause(); else { try { v.currentTime = 0; } catch (e) {} sync(v); } }
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
          e.preventDefault();
          const n = k === 'Home' ? 0 : k === 'End' ? tabs.length - 1
            : (i + (k === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          select(n, true);
        }
      });
    });
    select(0);
  });

  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.addEventListener('click', e => { if (e.target.closest('a')) menu.open = false; });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  }
})();

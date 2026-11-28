/* Shared navigation for guide pages, and rows that open from a link. */
(() => {
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
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
  }
  // A link to an anchor inside a closed row opens that row first.
  function openTarget() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    let d = el.closest('details.fold');
    let changed = false;
    while (d) { if (!d.open) { d.open = true; changed = true; } d = d.parentElement.closest('details.fold'); }
    if (changed) requestAnimationFrame(() => el.scrollIntoView());
  }
  openTarget();
  addEventListener('hashchange', openTarget);
  document.addEventListener('click', event => {
    const a = event.target.closest('a[href*="#"]');
    if (!a || a.pathname !== location.pathname) return;
    setTimeout(openTarget, 0);
  });
})();

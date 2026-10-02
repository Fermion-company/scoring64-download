// GA4: Scoring64 案内サイト (enhanced measurement tracks download-link clicks).
(() => {
  'use strict';
  const measurementId = 'G-W7F9B112B7';
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);
})();

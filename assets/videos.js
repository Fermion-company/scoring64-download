// Show each video only when its file exists; otherwise the slot keeps its 「準備中」 label.
(function () {
  var slots = document.querySelectorAll('.video-slot');
  Array.prototype.forEach.call(slots, function (slot) {
    var video = slot.querySelector('video');
    if (!video) return;
    function ready() { slot.classList.add('is-ready'); }
    function missing() { slot.classList.add('is-missing'); }
    if (!window.fetch) { ready(); return; }
    fetch(video.getAttribute('src'), { method: 'HEAD', cache: 'no-store' })
      .then(function (r) { if (r.ok) ready(); else missing(); }, missing);
  });
})();

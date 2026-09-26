// Show each video only when its file exists; otherwise the slot keeps its 「準備中」 label.
// A poster next to the video (assets/videos/<slug>.jpg) replaces the placeholder screenshot when it exists.
(function () {
  var slots = document.querySelectorAll('.video-slot');
  Array.prototype.forEach.call(slots, function (slot) {
    var video = slot.querySelector('video');
    if (!video) return;
    var img = slot.querySelector('img.poster');
    function ready() { slot.classList.add('is-ready'); }
    function missing() { slot.classList.add('is-missing'); }
    if (!window.fetch) { ready(); return; }
    var src = video.getAttribute('src');
    fetch(src, { method: 'HEAD', cache: 'no-store' })
      .then(function (r) { if (r.ok) ready(); else missing(); }, missing);
    var poster = src.replace(/\.mp4$/, '.jpg');
    if (video.getAttribute('poster') === poster) return;
    fetch(poster, { method: 'HEAD', cache: 'no-store' }).then(function (r) {
      if (!r.ok) return;
      video.setAttribute('poster', poster);
      if (img) img.setAttribute('src', poster);
    }, function () {});
  });
})();

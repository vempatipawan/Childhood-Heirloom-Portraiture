// Before and after. The hidden range input does the work, so it drags, taps and answers arrow keys.
// One authored moment: on arrival the divider leans toward the candid and settles back to the middle, once.
(function () {
  var box = document.getElementById("compare");
  if (!box) return;
  var range = box.querySelector(".compare-range");
  var touched = false;
  function set(v) { box.style.setProperty("--pos", v + "%"); }
  range.addEventListener("input", function () { touched = true; set(range.value); });
  ["pointerdown", "keydown"].forEach(function (e) { range.addEventListener(e, function () { touched = true; }); });
  set(range.value);

  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !window.requestAnimationFrame) return;
  // Starts and ends at the middle, so nothing is hidden if the animation never runs.
  var mid = 50, reach = 30, ms = 1700, start = null;
  function ease(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }   // exponential ease-out
  function step(now) {
    if (touched) return;
    if (start === null) start = now;
    var t = Math.min((now - start) / ms, 1);
    var v = mid + reach * Math.sin(Math.PI * ease(t));
    range.value = v; set(v);
    if (t < 1) requestAnimationFrame(step); else { range.value = mid; set(mid); }
  }
  window.addEventListener("load", function () { setTimeout(function () { requestAnimationFrame(step); }, 350); });
})();

// Gallery: colour or black and white.
(function () {
  var grid = document.getElementById("gallery-grid");
  var buttons = document.querySelectorAll(".toggle-btn");
  if (!grid || !buttons.length) return;
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var bw = b.dataset.mode === "bw";
      grid.classList.toggle("is-bw", bw);
      buttons.forEach(function (o) {
        var on = o === b;
        o.classList.toggle("is-on", on);
        o.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
  });
})();

// Offer deadline: says how long is left, updated once a minute. Falls back to the written date.
(function () {
  var el = document.getElementById("countdown");
  if (!el) return;
  var end = new Date(el.dataset.deadline).getTime();
  var mark = el.querySelector(".ast") ? el.querySelector(".ast").outerHTML : "";
  function tick() {
    var left = end - Date.now();
    if (isNaN(end)) return;
    if (left <= 0) { el.textContent = "The founding member price has ended."; return; }
    var d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4);
    var parts = d > 0 ? d + (d === 1 ? " day " : " days ") + h + (h === 1 ? " hour" : " hours") : h + (h === 1 ? " hour " : " hours ") + m + " min";
    el.innerHTML = "Ends Cyber Monday, November 30. " + parts + " left" + mark;
  }
  tick(); setInterval(tick, 60000);
})();

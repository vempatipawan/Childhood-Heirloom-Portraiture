// Before and after: the hidden range input does the work, so it drags, taps and uses arrow keys.
(function () {
  var box = document.getElementById("compare");
  if (!box) return;
  var range = box.querySelector(".compare-range");
  function set(v) { box.style.setProperty("--pos", v + "%"); }
  range.addEventListener("input", function () { set(range.value); });
  set(range.value);
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

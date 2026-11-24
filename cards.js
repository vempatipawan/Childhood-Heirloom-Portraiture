/* The twelve Christmas card designs, drawn in the browser.
   One source for every page: the gallery, the pick page, the checkout summary, and the pictures made from them.
   A card is drawn at 500 x 700 (or 700 x 500 sideways) and scaled to fit its box.
   Her portrait, if she adds one, is read in her own browser and never sent anywhere (see store.js). */
(function () {
  var IMG = "assets/img/cards/";
  var SAMPLE = {
    "girl": IMG + "sample-girl.jpg",
    "boy-laugh": IMG + "sample-boy-laugh.jpg",
    "boy-laugh2": IMG + "sample-boy-laugh2.jpg",
    "boy-up": IMG + "sample-boy-up.jpg",
    "boy-up2": IMG + "sample-boy-up2.jpg",
    "boy-giggle": IMG + "sample-boy-giggle.jpg"
  };
  var GREEN = "#1f3d2f", RED = "#a3262b", NAVY = "#1d2b45", BLUE = "#9db8d9";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function up(s) { return esc(s).toUpperCase(); }
  function dot() { return " &nbsp;&middot;&nbsp; "; }

  // the portrait in a box. Her photo replaces the sample when she has added one.
  function ph(d, sample, box, opt) {
    opt = opt || {};
    var src = (opt.second ? d.photo2 : d.photo) || SAMPLE[sample];
    var mine = !!(opt.second ? d.photo2 : d.photo);
    var st = "left:" + box[0] + "px;top:" + box[1] + "px;width:" + box[2] + "px;height:" + box[3] + "px;" + (opt.round ? "border-radius:" + opt.round + ";" : "") + (opt.bg ? "background:" + opt.bg + ";" : "");
    var im = "object-position:50% " + (mine ? (d.py == null ? 0 : d.py) : 0) + "%;" + (mine && d.pz ? "transform:scale(" + d.pz + ");" : "") + (opt.bw ? "filter:grayscale(1) contrast(1.04);" : "");
    return '<div class="cd-ph" style="' + st + '"><img src="' + src + '" alt="" style="' + im + '" draggable="false"></div>';
  }
  function fade(a, b, col) {
    col = col || "255,255,255";
    var m = Math.round((a + b) / 2 + (b - a) / 6);
    return '<div class="cd-abs" style="inset:0;background:linear-gradient(to bottom,rgba(' + col + ',0) ' + a + 'px,rgba(' + col + ',.9) ' + m + 'px,rgb(' + col + ') ' + b + 'px)"></div>';
  }
  function caps(text, style) { return '<div class="cd-caps" style="' + style + '">' + text + "</div>"; }
  // a line of lettering that shrinks to fit a width (fitted after fonts load)
  function word(cls, size, w, text, style) {
    return '<span class="' + cls + ' cd-fit" data-w="' + w + '" style="font-size:' + size + "px;" + (style || "") + '">' + text + "</span>";
  }
  function star(x, y, s) {
    return '<svg class="cd-abs" style="left:' + x + 'px;top:' + y + 'px" width="' + s + '" height="' + s + '" viewBox="-13 -13 26 26"><path d="M0-12 2.6-2.6 12 0 2.6 2.6 0 12-2.6 2.6-12 0-2.6-2.6Z" fill="#c9a04f"/></svg>';
  }
  function scallops(inset, w, h) {
    var x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset, r = 17;
    var nx = Math.round((x1 - x0) / (2 * r)), ny = Math.round((y1 - y0) / (2 * r));
    var sx = (x1 - x0) / nx, sy = (y1 - y0) / ny, c = ['<rect x="' + x0 + '" y="' + y0 + '" width="' + (x1 - x0) + '" height="' + (y1 - y0) + '" fill="#fff"/>'];
    for (var i = 0; i <= nx; i++) { c.push('<circle cx="' + (x0 + i * sx).toFixed(1) + '" cy="' + y0 + '" r="' + (sx / 2 + .4).toFixed(1) + '" fill="#fff"/>'); c.push('<circle cx="' + (x0 + i * sx).toFixed(1) + '" cy="' + y1 + '" r="' + (sx / 2 + .4).toFixed(1) + '" fill="#fff"/>'); }
    for (var j = 0; j <= ny; j++) { c.push('<circle cx="' + x0 + '" cy="' + (y0 + j * sy).toFixed(1) + '" r="' + (sy / 2 + .4).toFixed(1) + '" fill="#fff"/>'); c.push('<circle cx="' + x1 + '" cy="' + (y0 + j * sy).toFixed(1) + '" r="' + (sy / 2 + .4).toFixed(1) + '" fill="#fff"/>'); }
    return '<svg class="cd-abs" style="left:0;top:0" width="' + w + '" height="' + h + '">' + c.join("") + "</svg>";
  }

  // ---------------------------------------------------------------- backs
  function note(d) { return esc(d.note || (d.child + " has grown so much this year, and we are so thankful for every one of you.")); }
  var MARK = function (color) { return caps("CHILDHOOD HEIRLOOM PORTRAITURE<sup>*</sup>", "bottom:22px;font-size:8.5px;letter-spacing:.3em;opacity:.7;color:" + color); };
  function backField(d, bg, ink, accent, script, foil, frame) {
    var head = '<span class="' + (foil ? "cd-foil lite " : "") + script + '" style="font-size:' + (script === "abril" ? 44 : 66) + "px;line-height:1.1;" + (foil ? "" : "color:" + accent) + '">what a wonderful year</span>';
    return '<div class="cd-abs" style="inset:0;background:' + bg + '"></div>' + (frame || "") +
      '<div class="cd-abs cd-c" style="top:196px;padding:0 50px">' + head +
      '<div class="cormi" style="font-size:24px;line-height:1.45;color:' + ink + ';margin-top:22px">' + note(d) + "</div>" +
      '<div class="' + script + '" style="font-size:44px;color:' + accent + ';margin-top:26px">love,</div>' +
      '<div class="cd-caps cd-static" style="margin-top:8px;color:' + ink + '">' + up(d.family) + "</div></div>" + MARK(ink);
  }
  function backPhoto(d, sample, box, colour, accent) {
    return ph(d, sample, box, { bw: !colour }) + fade(330, 470) +
      '<div class="cd-abs cd-c" style="top:462px;padding:0 54px"><div class="cormi" style="font-size:22px;line-height:1.45;color:#3a342e">' + note(d) + "</div>" +
      '<div class="gv" style="font-size:42px;color:' + (accent || RED) + ';margin-top:14px">love,</div>' +
      '<div class="cd-caps cd-static" style="margin-top:4px;color:' + GREEN + '">' + up(d.family) + "</div></div>" + MARK("#3a342e");
  }
  var STAR_FRAME = '<div class="cd-abs" style="inset:16px;border:1px solid #c9a55a"></div>';

  // ---------------------------------------------------------------- the twelve
  var D = [
    { id: "gilded-script", name: "Gilded Script", note: "Big gold hand-lettering across the bottom of a full portrait.", sample: "girl", gma: "Grandma", style: "script",
      draw: function (d, s) {
        if (s === "back") return backPhoto(d, "girl", [25, 2, 450, 630]);
        var g = s === "gma";
        return ph(d, "girl", [0, 0, 500, 700]) + fade(430, 590) +
          '<div class="cd-abs cd-c" style="top:' + (g ? 492 : 452) + 'px;transform:rotate(-5deg)">' + word("cd-foil dafoe", g ? 132 : 112, 470, g ? esc(d.gma) : "Merry<br>Christmas", "line-height:.84") + "</div>" +
          caps(g ? "MERRY CHRISTMAS" + dot() + "WITH ALL OUR LOVE" : up(d.family), "bottom:24px;color:#6f5a2c");
      } },
    { id: "left-edge", name: "The Left Edge", note: "One line of tall capitals running up the side.", sample: "boy-laugh2", gma: "Nana", style: "classic",
      draw: function (d, s) {
        if (s === "back") return backField(d, GREEN, "#efe6cf", "#d8bb72", "gv", true, STAR_FRAME);
        var g = s === "gma";
        return ph(d, "boy-laugh2", [50, 0, 500, 700]) +
          '<div class="cd-edge">' + word("bod", g ? 45 : 60, 660, g ? "MERRY CHRISTMAS, " + up(d.gma) : "MERRY CHRISTMAS", "letter-spacing:.08em;color:" + GREEN) + "</div>" +
          '<div class="cd-abs" style="left:92px;top:22px;bottom:22px;border-left:1px solid #c9a55a"></div>' +
          caps(g ? "WITH LOVE FROM " + up(d.child) : up(d.family) + dot() + esc(d.year), "bottom:26px;left:92px;color:#3a4a40");
      } },
    { id: "fine-border", name: "The Fine Border", note: "A fine double gold rule and red script. The most traditional.", sample: "boy-up", gma: "Grandmother", style: "classic",
      draw: function (d, s) {
        if (s === "back") return backPhoto(d, "boy-up", [48, 5, 450, 630]);
        var g = s === "gma";
        return '<div class="cd-clip" style="inset:26px">' + ph(d, "boy-up", [0, 0, 448, 648]) + "</div>" +
          '<div class="cd-abs" style="inset:14px;border:1.5px solid #b8944a"></div><div class="cd-abs" style="inset:20px;border:.75px solid #b8944a"></div>' +
          '<div class="cd-abs cd-c" style="top:' + (g ? 528 : 524) + 'px">' + word("gv", g ? 80 : 72, 420, g ? esc(d.gma) : "Merry Christmas", "color:" + RED) + "</div>" +
          (g ? caps("MERRY CHRISTMAS", "top:512px;color:#3a342e") : "") +
          caps(g ? "WITH ALL OUR LOVE, " + up(d.child) : up(d.family), "bottom:46px;color:#3a342e");
      } },
    { id: "joy", name: "Joy", note: "Three giant gold capitals under a laughing face.", sample: "boy-laugh", gma: "Gigi", style: "bold",
      draw: function (d, s) {
        if (s === "back") return backField(d, "#fffdf8", "#3a342e", "#a8843c", "gv", false, STAR_FRAME);
        var g = s === "gma";
        return ph(d, "boy-laugh", [0, 0, 500, 700]) +
          '<div class="cd-abs cd-c" style="top:' + (g ? 462 : 436) + 'px">' + word("cd-foil dms", g ? 190 : 226, 470, g ? up(d.gma) : "JOY", "letter-spacing:" + (g ? ".03em" : ".05em") + ";line-height:1") + "</div>" +
          caps(g ? "MERRY CHRISTMAS" + dot() + "LOVE, " + up(d.child) : "TO THE WORLD" + dot() + up(d.family) + dot() + esc(d.year), "bottom:26px;color:#6f5a2c");
      } },
    { id: "believe", name: "Believe", note: "He looks up at one word.", sample: "boy-up2", gma: "Mimi", style: "classic",
      draw: function (d, s) {
        if (s === "back") return backField(d, RED, "#fbeeea", "#f3d9a0", "gv", true, "");
        var g = s === "gma";
        return ph(d, "boy-up2", [-60, 102, 537, 752]) +
          '<div class="cd-abs" style="right:34px;top:64px;text-align:right">' + word("playi", g ? 78 : 104, 430, g ? "dear " + esc(d.gma) + "," : "believe", "color:" + RED + ";line-height:1") +
          '<div class="cd-caps cd-static" style="text-align:right;margin-top:12px;color:#3a342e">' + (g ? "MERRY CHRISTMAS" : "MERRY CHRISTMAS " + esc(d.year)) + "</div></div>" +
          star(g ? 174 : 212, 40, 26) +
          caps(g ? "WITH LOVE FROM " + up(d.child) : up(d.family), "bottom:26px;left:auto;right:34px;text-align:right;color:#3a342e");
      } },
    { id: "merry-bright", name: "Merry & Bright", note: "Chunky capitals in five colours. The playful one.", sample: "boy-giggle", gma: "Grammy", style: "bold",
      draw: function (d, s) {
        if (s === "back") return backField(d, "#f6efe2", "#3a342e", "#c2382f", "abril", false, "");
        var g = s === "gma", cols = ["#c2382f", "#2f6b4f", "#e59aa6", "#c9a04f", "#7fa3cc"], i = 0;
        function paint(t) { return t.split("").map(function (ch) { if (ch === " ") return "&nbsp;"; return '<span style="color:' + cols[(i++) % 5] + '">' + esc(ch) + "</span>"; }).join(""); }
        var lines = g ? [["MERRY CHRISTMAS", 40], [String(d.gma).toUpperCase(), 84]] : [["MERRY", 84], ["& BRIGHT", 84]];
        return ph(d, "boy-giggle", [0, 0, 500, 700]) + fade(380, 560) +
          '<div class="cd-abs cd-c" style="bottom:' + (g ? 58 : 64) + 'px">' + lines.map(function (l) { return '<div>' + word("abril", l[1], 450, paint(l[0]), "line-height:1.02;letter-spacing:.03em") + "</div>"; }).join("") + "</div>" +
          caps(g ? "LOVE, " + up(d.child) : up(d.family), "bottom:26px;color:#3a342e");
      } },
    { id: "scalloped", name: "The Scalloped Edge", note: "French blue scallops, gold script.", sample: "girl", gma: "Grandma & Grandad", style: "script",
      draw: function (d, s) {
        if (s === "back") return backField(d, BLUE, "#fff", "#fff", "gwen", false, '<div class="cd-abs" style="inset:16px;border:1px solid rgba(255,255,255,.8)"></div>');
        var g = s === "gma";
        return '<div class="cd-abs" style="inset:0;background:' + BLUE + '"></div>' + scallops(38, 500, 700) +
          '<div class="cd-clip" style="inset:24px">' + ph(d, "girl", [10, 9, 431, 604]) + fade(396, 540) + "</div>" +
          '<div class="cd-abs cd-c" style="top:' + (g ? 500 : 492) + 'px">' + word("cd-foil gwen", g ? 56 : 68, 400, g ? esc(d.gma) : "Merry Christmas", "line-height:1") + "</div>" +
          caps(g ? "MERRY CHRISTMAS" + dot() + "LOVE, " + up(d.child) : up(d.family), "bottom:62px;color:#5f7da3");
      } },
    { id: "evergreen", name: "Evergreen", note: "A deep green card, the portrait in an arch, gold script.", sample: "boy-laugh2", gma: "Mimi & Pops", style: "script",
      draw: function (d, s) {
        if (s === "back") return backField(d, GREEN, "#efe6cf", "#d8bb72", "gv", true, "");
        var g = s === "gma";
        return '<div class="cd-abs" style="inset:0;background:' + GREEN + '"></div>' +
          '<div class="cd-abs" style="left:26px;top:26px;width:448px;height:482px;border-radius:224px 224px 0 0;border:1px solid #c9a55a"></div>' +
          '<div class="cd-clip" style="left:34px;top:34px;width:432px;height:474px;border-radius:216px 216px 0 0;background:#fff">' + ph(d, "boy-laugh2", [-18, -22, 468, 655]) + "</div>" +
          '<div class="cd-abs cd-c" style="top:528px;white-space:nowrap">' + word("cd-foil lite gv", g ? 84 : 78, 450, g ? esc(d.gma) : "Merry Christmas", "line-height:1.1") + "</div>" +
          caps(g ? "MERRY CHRISTMAS" + dot() + "LOVE, " + up(d.child) : up(d.family), "bottom:30px;color:#efe6cf");
      } },
    { id: "black-white", name: "Black & White", note: "The portrait in black and white with one red word.", sample: "girl", gma: "Mimi", style: "script",
      draw: function (d, s) {
        if (s === "back") return backPhoto(d, "girl", [25, 2, 450, 630], true);
        var g = s === "gma";
        return ph(d, "girl", [-12, -5, 525, 735], { bw: true }) +
          '<div class="cd-abs cd-c" style="top:458px;transform:rotate(-6deg)">' + word("ariz", g ? 166 : 156, 460, g ? esc(d.gma) : "Merry", "color:" + RED + ";line-height:1") + "</div>" +
          '<div class="cd-abs cd-c" style="bottom:54px"><span class="out" style="font-size:19px;letter-spacing:.62em;color:' + RED + ';font-weight:500;padding-left:.62em">' + (g ? "MERRY CHRISTMAS" : "CHRISTMAS") + "</span></div>" +
          caps(g ? "WITH LOVE FROM " + up(d.child) : up(d.family), "bottom:24px;color:#3a342e");
      } },
    { id: "halo", name: "The Halo", note: "Gold capitals arched over the head. The religious greeting.", sample: "boy-up2", gma: "Grandmother", style: "classic",
      draw: function (d, s) {
        if (s === "back") return backField(d, NAVY, "#e9edf5", "#d8bb72", "gv", true, STAR_FRAME);
        var g = s === "gma";
        var arc = g ? "MERRY CHRISTMAS, " + up(d.gma) : "GLORY TO GOD IN THE HIGHEST";
        var len = arc.replace(/&amp;/g, "&").length, fs = Math.max(14, Math.min(26, (600 / len - 7) / 0.78));
        var k = g ? "g" : "f";
        return ph(d, "boy-up2", [0, 0, 500, 700]) +
          '<svg class="cd-abs" style="left:0;top:0" width="500" height="700"><defs><path id="arc-' + k + '" d="M 34 322 A 216 216 0 0 1 466 322"/></defs>' +
          '<text font-family="Cinzel" font-size="' + fs.toFixed(1) + '" letter-spacing="7" fill="#8f6c2a" font-weight="600" text-anchor="middle"><textPath href="#arc-' + k + '" startOffset="50%">' + arc + "</textPath></text>" +
          '<path d="M250 10 252.4 17.6 260 20 252.4 22.4 250 30 247.6 22.4 240 20 247.6 17.6Z" fill="#c9a04f"/></svg>' +
          '<div class="cd-abs cd-c" style="bottom:66px"><span class="cormi" style="font-size:38px;color:' + GREEN + '">' + (g ? "with all our love" : "and on earth, peace") + "</span></div>" +
          caps(g ? up(d.child) + dot() + "CHRISTMAS " + esc(d.year) : up(d.family) + dot() + esc(d.year), "bottom:30px;color:#6f5a2c");
      } },
    { id: "tartan", name: "The Tartan Band", note: "A red tartan band with white script.", sample: "boy-laugh", gma: "Granny", style: "script",
      draw: function (d, s) {
        if (s === "back") return '<div class="cd-abs cd-tartan" style="inset:0"></div><div class="cd-abs" style="left:60px;right:60px;top:170px;bottom:170px;background:#fffdf8;border:3px solid #d8bb72"></div>' +
          '<div class="cd-abs cd-c" style="top:216px;padding:0 92px"><span class="gv" style="font-size:54px;color:' + RED + ';line-height:1.1">what a wonderful year</span>' +
          '<div class="cormi" style="font-size:20px;line-height:1.4;color:#3a342e;margin-top:14px">' + note(d) + "</div>" +
          '<div class="cd-caps cd-static" style="margin-top:16px;color:#3a342e">' + up(d.family) + "</div></div>" + MARK("#fff");
        var g = s === "gma";
        return ph(d, "boy-laugh", [17, -10, 466, 652]) +
          '<div class="cd-abs cd-tartan" style="left:0;right:0;bottom:0;height:192px;border-top:3px solid #d8bb72"></div>' +
          '<div class="cd-abs cd-c" style="bottom:' + (g ? 70 : 62) + 'px;white-space:nowrap">' + word("gv", g ? 54 : 74, 470, g ? "Merry Christmas, " + esc(d.gma) : "Merry Christmas", "line-height:1.1;color:#fff;text-shadow:0 1px 3px rgba(40,10,10,.65)") + "</div>" +
          caps(g ? "WITH LOVE FROM " + up(d.child) : up(d.family), "bottom:28px;color:#fff;text-shadow:0 1px 2px rgba(40,10,10,.6)");
      } },
    { id: "brother-sister", name: "Brother & Sister", note: "Sideways, for two children.", sample: "girl", sample2: "boy-laugh2", gma: "Mimi & Pops", style: "script", wide: true, two: true,
      draw: function (d, s) {
        if (s === "back") return '<div class="cd-abs" style="inset:0;background:#fffdf8"></div>' +
          '<div class="cd-abs cd-c" style="top:150px;padding:0 90px"><span class="cd-foil dafoe" style="font-size:62px;line-height:1.1">what a wonderful year</span>' +
          '<div class="cormi" style="font-size:24px;line-height:1.45;color:#3a342e;margin-top:14px">' + note(d) + "</div>" +
          '<div class="cd-caps cd-static" style="margin-top:20px;color:#6f5a2c">' + up(d.family) + "</div></div>" + MARK("#3a342e");
        var g = s === "gma";
        return ph(d, "girl", [12, 16, 356, 498]) + ph(d, "boy-laugh2", [322, -6, 367, 514], { second: true }) + fade(300, 420) +
          '<div class="cd-abs cd-c" style="top:344px;transform:rotate(-3deg)">' + word("cd-foil dafoe", g ? 96 : 92, 640, g ? esc(d.gma) : "Merry Christmas", "line-height:1") + "</div>" +
          caps(g ? "MERRY CHRISTMAS" + dot() + "LOVE, " + up(d.child) + " &amp; " + up(d.child2) : "LOVE, " + up(d.child) + " &amp; " + up(d.child2) + dot() + esc(d.year), "bottom:22px;color:#6f5a2c");
      } }
  ];

  var DEFAULTS = { child: "Emma Grace", child2: "James", family: "The Hartwell Family", gma: "", year: "2026" };

  function data(over) {
    var d = {}, k, s = (window.CHPStore && window.CHPStore.get()) || {};
    for (k in DEFAULTS) d[k] = DEFAULTS[k];
    ["child", "child2", "family", "gma", "note"].forEach(function (f) { if (s[f]) d[f] = s[f]; });
    d.py = s.py; d.pz = s.pz;
    d.photo = window.CHPStore ? window.CHPStore.photo(1) : null;
    d.photo2 = window.CHPStore ? window.CHPStore.photo(2) : null;
    for (k in (over || {})) d[k] = over[k];
    return d;
  }
  function byId(id) { for (var i = 0; i < D.length; i++) if (D[i].id === id) return D[i]; return D[0]; }

  // fit lettering to its width (works in card units: the scale is a transform, so offsetWidth is unscaled)
  function fit(root) {
    (root || document).querySelectorAll(".cd-fit").forEach(function (el) {
      var w = +el.dataset.w, f = parseFloat(el.dataset.f || el.style.fontSize);
      el.dataset.f = f; el.style.fontSize = f + "px";
      var guard = 0;
      while (el.offsetWidth > w && f > 10 && guard++ < 60) { f *= 0.95; el.style.fontSize = f + "px"; }
    });
  }

  // draw one card into a box: <div class="cd-box" data-design="joy" data-side="front|gma|back">
  function draw(box, over) {
    var des = byId(box.dataset.design), side = box.dataset.side || "front", d = data(over);
    if (!d.gma) d.gma = des.gma;
    box.classList.toggle("is-wide", !!des.wide);
    box.innerHTML = '<div class="cd' + (des.wide ? " cd-wide" : "") + '">' + des.draw(d, side) + "</div>";
    scale(box); fit(box);
  }
  function scale(box) {
    var c = box.firstElementChild; if (!c) return;
    var w = box.clientWidth, base = c.classList.contains("cd-wide") ? 700 : 500;
    if (w) c.style.transform = "scale(" + (w / base) + ")";
  }
  var ro = window.ResizeObserver ? new ResizeObserver(function (es) { es.forEach(function (e) { scale(e.target); }); }) : null;
  function drawAll(root, over) {
    (root || document).querySelectorAll(".cd-box").forEach(function (b) { draw(b, over); if (ro) ro.observe(b); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(root); });
  }
  window.addEventListener("resize", function () { document.querySelectorAll(".cd-box").forEach(scale); });

  window.CHPCards = { list: D, byId: byId, draw: draw, drawAll: drawAll, fit: fit, defaults: DEFAULTS };
})();

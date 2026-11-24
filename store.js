/* The store's memory, kept in this browser only: her choices, her names, her favourites and, if she adds one,
   her portrait. Nothing here is sent anywhere. When the developers build private storage, the portrait goes up
   at checkout and nowhere earlier. Every read and write is wrapped so a private window still works. */
(function () {
  var KEY = "chp.store.v1", P1 = "chp.photo.1", P2 = "chp.photo.2";
  var mem = {}, memPhoto = {};
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; } catch (e) { return false; } }

  function get() { var s = read(KEY); if (s) { try { return JSON.parse(s); } catch (e) {} } return mem; }
  function set(patch) { var s = get(), k; for (k in patch) s[k] = patch[k]; mem = s; write(KEY, JSON.stringify(s)); fire(); return s; }
  function photo(n) { return read(n === 2 ? P2 : P1) || memPhoto[n] || null; }
  function setPhoto(n, dataUrl) { memPhoto[n] = dataUrl; if (!write(n === 2 ? P2 : P1, dataUrl)) { /* too big or blocked: kept for this page only */ } fire(); }
  function clearPhoto(n) { memPhoto[n] = null; write(n === 2 ? P2 : P1, null); fire(); }
  var subs = [];
  function on(fn) { subs.push(fn); }
  function fire() { subs.forEach(function (f) { try { f(); } catch (e) {} }); }

  // read a picture she picks, shrink it in the browser to at most 1400 px tall, keep it here as a JPEG
  function readFile(file, cb) {
    if (!file || !/^image\//.test(file.type)) { cb(null, "Please choose a photo."); return; }
    var url = URL.createObjectURL(file), im = new Image();
    im.onload = function () {
      var maxH = 1400, maxW = 1000, r = Math.min(1, maxW / im.width, maxH / im.height);
      var c = document.createElement("canvas"); c.width = Math.round(im.width * r); c.height = Math.round(im.height * r);
      var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      cb(c.toDataURL("image/jpeg", 0.86));
    };
    im.onerror = function () { URL.revokeObjectURL(url); cb(null, "That photo could not be opened. Try a JPEG or PNG."); };
    im.src = url;
  }

  // prices
  var C = window.CHPConfig;
  function phase() { return Date.now() >= Date.parse(C.regularFrom) ? "regular" : "bf"; }
  function price(tier) { var t = C.tiers[tier]; return t ? t[phase()] : 0; }
  function money(n) { return "$" + (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0); }

  function order() {
    var s = get(), tier = s.tier || "set", t = C.tiers[tier], base = t.cards || 0;
    var qty = t.cards ? Math.max(base, s.qty || base) : 0, extra = t.cards ? (qty - base) / 25 : 0, a = s.addons || {};
    var lines = [{ name: t.name, amount: price(tier) }];
    if (extra > 0) lines.push({ name: extra * 25 + " more cards", amount: extra * C.addons.more25.price });
    if (t.cards && tier !== "collection" && a.mailed) lines.push({ name: C.addons.mailed.name + " (" + qty + " cards)", amount: C.addons.mailed.price * qty / 25 });
    if (t.cards && a.frame) lines.push({ name: C.addons.frame.name, amount: C.addons.frame.price });
    if (t.cards && a.gmaCard) lines.push({ name: C.addons.gmaCard.name, amount: C.addons.gmaCard.price });
    var total = lines.reduce(function (s, l) { return s + l.amount; }, 0);
    return { tier: tier, qty: qty, lines: lines, total: total, design: s.design || "gilded-script" };
  }

  // where a pay button goes: a payment link if one is set for the tier, otherwise the "opens Black Friday" page
  function payHref(tier) { return (C.payLinks && C.payLinks[tier]) || "opening.html"; }
  function appHref() { return C.appLink || "support.html#open"; }

  window.CHPStore = { get: get, set: set, photo: photo, setPhoto: setPhoto, clearPhoto: clearPhoto, readFile: readFile, on: on,
    phase: phase, price: price, money: money, order: order, payHref: payHref, appHref: appHref };

  // fill any element that shows a live price: <span data-price="set"></span>, data-regular="set"
  function paint() {
    document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = money(price(el.dataset.price)); });
    document.querySelectorAll("[data-regular]").forEach(function (el) { el.textContent = money(C.tiers[el.dataset.regular].regular); });
    document.querySelectorAll("[data-left]").forEach(function (el) { el.textContent = C.placesLeft; });
    document.querySelectorAll("[data-app]").forEach(function (el) { el.href = appHref(); });
    var bf = phase() === "bf";
    document.querySelectorAll("[data-bf-only]").forEach(function (el) { el.hidden = !bf; });
    document.querySelectorAll("[data-regular-only]").forEach(function (el) { el.hidden = bf; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint); else paint();

  // the buy bar on a phone: shows once the first screen has scrolled away
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.querySelector(".buybar"); if (!bar) return;
    var tick = function () { bar.classList.toggle("is-on", window.scrollY > 380); };
    window.addEventListener("scroll", tick, { passive: true }); tick();
  });
})();

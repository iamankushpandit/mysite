/* Progressive enhancement only. The page is complete without this file:
   it adds the colour-scheme toggle, the project filter, and live GitHub
   numbers that replace the static ones written into the HTML. */
(function () {
  'use strict';

  /* ---- colour scheme ------------------------------------------------ */
  var root = document.documentElement;
  var KEY = 'theme';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage unavailable: follow the OS */ }

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---- project filter ------------------------------------------------ */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var cards = document.querySelectorAll('.card[data-kind]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var kind = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      cards.forEach(function (card) {
        card.classList.toggle('is-hidden', kind !== 'all' && card.getAttribute('data-kind') !== kind);
      });
    });
  });

  /* ---- live numbers from GitHub -------------------------------------- */
  var OWNER = 'iamankushpandit';
  var repos = Array.prototype.map.call(cards, function (c) { return c.getAttribute('data-repo'); })
    .filter(Boolean);
  if (!repos.length || typeof fetch !== 'function') return;

  var totalStars = 0, totalForks = 0, answered = 0;

  function setText(el, text) { if (el) el.textContent = text; }

  repos.forEach(function (name) {
    fetch('https://api.github.com/repos/' + OWNER + '/' + name, {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        answered += 1;
        totalStars += data.stargazers_count || 0;
        totalForks += data.forks_count || 0;
        var card = document.querySelector('.card[data-repo="' + name + '"]');
        if (card) {
          var stars = card.querySelector('[data-metric="stars"] b');
          setText(stars, String(data.stargazers_count));
        }
        if (answered === repos.length) {
          setText(document.querySelector('[data-stat="stars"]'), String(totalStars));
          setText(document.querySelector('[data-stat="forks"]'), String(totalForks));
        }
      })
      .catch(function () { /* rate-limited or offline: the static numbers stand */ });
  });

  /* Latest release tag, where one exists. */
  repos.forEach(function (name) {
    var card = document.querySelector('.card[data-repo="' + name + '"]');
    var slot = card && card.querySelector('[data-metric="release"]');
    if (!slot || !/^v\d/.test(slot.textContent)) return;
    fetch('https://api.github.com/repos/' + OWNER + '/' + name + '/releases/latest')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) { if (data && data.tag_name) setText(slot, data.tag_name); })
      .catch(function () { /* keep the written tag */ });
  });
})();

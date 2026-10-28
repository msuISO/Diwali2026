/* Diwali Night page for ISO at MSU. No tracking, no data collection. */
(function () {
  'use strict';

  // Nov 6 is after daylight saving time ends, so Eastern time is UTC-5
  var START = new Date('2026-11-06T19:00:00-05:00');
  var END = new Date('2026-11-06T22:00:00-05:00');

  /* Line under the date, e.g. "Nine days from today" */
  var soon = document.getElementById('soon');
  if (soon) {
    var now = new Date();
    var words = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var text;
    if (now >= END) {
      text = 'Thanks for celebrating with us';
    } else if (now >= START) {
      text = 'Happening now';
    } else {
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var days = Math.round((new Date(2026, 10, 6) - today) / 86400000);
      if (days <= 0) text = 'Tonight';
      else if (days === 1) text = 'Tomorrow';
      else text = (words[days] || days) + ' days from today';
    }
    soon.textContent = text; // textContent only, never innerHTML
  }

  /* Hide the crest if logo.png is missing */
  var logo = document.getElementById('logo');
  function hideLogo() {
    var crest = logo && logo.closest('.crest');
    if (crest) crest.hidden = true;
  }
  if (logo) {
    logo.addEventListener('error', hideLogo);
    if (logo.complete && logo.naturalWidth === 0) hideLogo();
  }

  /* Auto-size the Omella checkout (replaces Omella's helper script) */
  if (document.getElementById('omella-frame') && typeof window.iFrameResize === 'function') {
    window.iFrameResize({ heightCalculationMethod: 'bodyScroll', scrolling: 'auto' }, '#omella-frame');
  }
})();

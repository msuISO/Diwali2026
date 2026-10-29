/* Diwali Night page for ISO at MSU. No tracking, no data collection. */
(function () {
  'use strict';

  // Nov 6 is after daylight saving time ends, so Eastern time is UTC-5
  var START = new Date('2026-11-06T19:00:00-05:00');
  var END = new Date('2026-11-06T22:00:00-05:00');
  var CHECKOUT_URL = 'https://omella.com/ajv33?embed=true&utm_source=msuiso.github.io&utm_medium=embed';

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

  /* Checkout panel: opens Omella's checkout on top of the page.
     If anything here fails, the buttons still work as plain links to Omella. */
  var dialog = document.getElementById('checkout');
  var panelBody = document.getElementById('checkout-body');
  var closeButton = document.getElementById('checkout-close');
  var frame = null;

  function openCheckout(event) {
    event.preventDefault();
    if (!frame) {
      // Load Omella only when someone asks for it
      frame = document.createElement('iframe');
      frame.id = 'omella-frame';
      frame.src = CHECKOUT_URL;
      frame.title = 'Diwali Night ticket checkout by Omella';
      frame.setAttribute('allow', 'payment');
      panelBody.appendChild(frame);
      if (typeof window.iFrameResize === 'function') {
        window.iFrameResize({ heightCalculationMethod: 'bodyScroll', scrolling: 'auto' }, '#omella-frame');
      }
    }
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add('modal-open');
  }

  if (dialog && panelBody && closeButton && typeof dialog.showModal === 'function') {
    var triggers = document.querySelectorAll('[data-checkout]');
    for (var j = 0; j < triggers.length; j++) {
      triggers[j].addEventListener('click', openCheckout);
    }
    closeButton.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('close', function () {
      document.documentElement.classList.remove('modal-open');
    });
    // Clicking the dark area outside the panel closes it
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
  }
})();

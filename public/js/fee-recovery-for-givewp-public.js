(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	$(window).on('load', () => {
		console.log('global css: ' + JSON.stringify(lkn_recovery_fee_globals));

		var inputVal = $('#lkn-fee-recovery-input');

		if (inputVal.length) {
			inputVal.on('click', (event) => {
				var inputElement = $(event.target);
				if (inputElement.val() === 'yes') {
					inputElement.attr('value', 'no');
				} else {
					inputElement.attr('value', 'yes');
				}

				console.log('input test click: ' + inputElement.val());
			})
		} else {
			var iframe = document.getElementsByName('give-embed-form')[0];

			if (iframe) {
				var styleLink = document.createElement('link');
				// styleLink.href = lkn_recovery_fee_globals.css_path;
				// styleLink.rel = 'stylesheet';
				// styleLink.type = 'text/css';

				styleLink.setAttribute('href', lkn_recovery_fee_globals.css_path);
				styleLink.setAttribute('rel', 'stylesheet');
				styleLink.setAttribute('type', 'text/css');

				iframe.document.head.appendChild(styleLink);
			}
		}
	});

})(jQuery);

console.log('teste iframe');
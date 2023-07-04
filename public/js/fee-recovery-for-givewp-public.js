(function ($) {
	'use strict';

	$(window).on('load', () => {
		var inputVal = $('#lkn-fee-recovery-input');

		if (inputVal.length) {
			inputVal.on('click', (event) => {
				var inputElement = $(event.target);
				if (inputElement.val() === 'yes') {
					inputElement.attr('value', 'no');
				} else {
					inputElement.attr('value', 'yes');
				}
			})
		} else {
			var iframe = document.getElementsByName('give-embed-form')[0];

			if (iframe) {
				var styleLink = document.createElement('link');

				styleLink.setAttribute('href', lkn_recovery_fee_globals.css_path);
				styleLink.setAttribute('rel', 'stylesheet');
				styleLink.setAttribute('type', 'text/css');
				var bodyIframe = iframe.contentDocument.getElementsByClassName('give-form')[0];
				bodyIframe.appendChild(styleLink);
			}
		}
	});
})(jQuery);
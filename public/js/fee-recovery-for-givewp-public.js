(function ($) {
	'use strict';

	$(window).on('load', () => {
		var inputVal = $('#lkn-fee-recovery-input');
		var iframe = document.getElementsByName('give-embed-form')[0];

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
			if (iframe) {
				var styleLink = document.createElement('link');

				styleLink.setAttribute('href', lkn_recovery_fee_globals.css_path);
				styleLink.setAttribute('rel', 'stylesheet');
				styleLink.setAttribute('type', 'text/css');
				var bodyIframe = iframe.contentDocument.getElementsByClassName('give-form')[0];
				bodyIframe.appendChild(styleLink);
			}
		}

		if (iframe) {
			var checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0];

			var feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value);
			var feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value);
			var amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value);
			var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

			checkboxLabel.innerHTML = checkboxLabel.innerHTML.replace('##', feeTotal);
		} else {
			var checkboxLabel = $('.lkn-fee-recovery-label');

			var feeValue = parseFloat($('#lkn-fee-recovery-value').val());
			var feePercent = parseFloat($('#lkn-fee-recovery-percent').val());
			var amount = parseFloat($('#give-amount').val());
			var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

			checkboxLabel.html(checkboxLabel.html().replace('##', feeTotal));
		}
	});
})(jQuery);
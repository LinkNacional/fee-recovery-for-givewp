(function ($) {
	'use strict';

	$(window).on('load', () => {
		const urlParams = new URLSearchParams(window.location.search);
		const section = urlParams.get('section');
		const post_type = urlParams.get('post_type');
		const page = urlParams.get('page');
		const tab = urlParams.get('tab');

		if (
			post_type === 'give_forms' &&
			page === 'give-settings' &&
			tab === 'general' &&
			section === 'lkn-fee-recovery'
		) {
			var fixedInput = $('#lkn_fee_recovery_setting_field_fixed');
			var percentInput = $('#lkn_fee_recovery_setting_field_percent');

			fixedInput.attr('min', '0');
			fixedInput.attr('step', '0.01');
			percentInput.attr('min', '0');

			var feeRecoveryGateways = $('.lkn_fee_recovery_wrap_gateways');
			feeRecoveryGateways.insertBefore('.give-submit-wrap');

			var allGatewaysOpt = document.getElementsByClassName('lkn_fee_recovery_wrap_gateways');

			if (allGatewaysOpt.length > 1) {
				for (let index = 1; index < allGatewaysOpt.length; index++) {
					allGatewaysOpt[index].remove();
				}
			}
		}
	});
})(jQuery);

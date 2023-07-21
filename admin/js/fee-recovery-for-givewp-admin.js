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
            var feeEnabled = document.getElementsByName('lkn_fee_recovery_setting_field');

            var fixedInput = $('#lkn_fee_recovery_setting_field_fixed');
            var percentInput = $('#lkn_fee_recovery_setting_field_percent');

            fixedInput.attr('min', '0');
            fixedInput.attr('step', '0.01');
            percentInput.attr('min', '0');

            // Disables unused options
            feeEnabled[1].parentElement.setAttribute('style', 'color: #ababab;cursor: not-allowed;');
            feeEnabled[1].setAttribute('disabled', '');
            feeEnabled[1].setAttribute('style', 'cursor: not-allowed;');
            feeEnabled[2].parentElement.setAttribute('style', 'color: #ababab;cursor: not-allowed;');
            feeEnabled[2].setAttribute('disabled', '');
            feeEnabled[2].setAttribute('style', 'cursor: not-allowed;');

            // Notice to sell the plugin
            var noticeDiv = document.createElement('div');
            noticeDiv.setAttribute('id', 'lkn-fee-recovery-notice');
            noticeDiv.innerHTML = 'Obtenha novas funcionalidades com <a href="https://www.linknacional.com/wordpress/" target="_blank">Fee Recovery Pro</a>';

            var formSubmit = document.getElementsByClassName('give-submit-wrap')[0];
            formSubmit.before(noticeDiv);
        }
    });
})(jQuery);

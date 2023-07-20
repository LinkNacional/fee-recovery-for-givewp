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
            console.log('página certa');
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
            /*  var feeRecoveryGateways = $('.lkn_fee_recovery_wrap_gateways');
             feeRecoveryGateways.insertBefore('.give-submit-wrap');
 
             var wcForm = document.getElementsByClassName('form-table')[0];
             var noticeDiv = document.createElement('div');
             noticeDiv.setAttribute('style', 'padding: 10px 5px;background-color: #fcf9e8;color: #646970;border: solid 1px lightgrey;border-left-color: #dba617;border-left-width: 4px;font-size: 14px;min-width: 625px;margin-top: 10px;');
 
             noticeDiv.innerHTML = 'Obtenha novas funcionalidades com <a href="https://www.linknacional.com.br/wordpress/woocommerce/" target="_blank">Fee Recovery Pro</a>';
 
             wcForm.append(noticeDiv); */
        }
    });
})(jQuery);

(function ($) {
    'use strict';

    $(window).on('load', () => {
        var iframe = document.getElementsByName('give-embed-form')[0];

        if (iframe) {
            var amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value);
            update_fee(amount);

            // Compatibility to load css in iframe forms
            var styleLink = document.createElement('link');

            styleLink.setAttribute('href', lkn_recovery_fee_globals.css_path);
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.setAttribute('type', 'text/css');
            var bodyIframe = iframe.contentDocument.getElementsByClassName('give-form')[0];
            bodyIframe.appendChild(styleLink);

            var inputAmount = iframe.contentDocument.getElementById('give-amount');
            inputAmount.addEventListener('change', (event) => {
                var amount = parseFloat(event.target.value);
                update_fee(amount);
            });

            var donationLevelWrap = iframe.contentDocument.getElementById('give-donation-level-button-wrap');
            donationLevelWrap.addEventListener('click', (event) => {
                setTimeout(() => {
                    var amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value);
                    update_fee(amount);
                }, 500);
            });

            // Compatibility to add events for iframe forms
            var inputVal = iframe.contentDocument.getElementById('lkn-fee-recovery-input');
            inputVal.addEventListener('click', (event) => {
                change_checkbox_opt($(event.target));
            });

            var giveGateway = iframe.contentDocument.getElementsByClassName('give-gateway');
            for (let c = 0; c < giveGateway.length; c++) {
                giveGateway[c].addEventListener('click', (event) => {
                    var amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value);
                    var feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled').value;

                    var checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0];
                    var originalLabel = iframe.contentDocument.getElementById('lkn-fee-recovery-original-description').value;

                    if (feeRecovery === 'global') {
                        var feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value);
                        var feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value);
                        var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

                        checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal);
                    }
                });
            }
        } else {
            var amount = parseFloat($('#give-amount').val());
            update_fee(amount);

            var inputAmount = $('#give-amount');
            inputAmount.on('change', (event) => {
                var amount = parseFloat($(event.target).val());
                update_fee(amount);
            });

            var donationLevelWrap = $('#give-donation-level-button-wrap');
            donationLevelWrap.on('click', (event) => {
                setTimeout(() => {
                    var amount = parseFloat($('#give-amount').val());
                    update_fee(amount);
                }, 500);
            });

            var inputVal = $('#lkn-fee-recovery-input');
            if (inputVal.length) {
                inputVal.on('click', (event) => {
                    change_checkbox_opt($(event.target));
                });
            }

            var giveGateway = $('.give-gateway');
            giveGateway.on('click', (event) => {
                var amount = parseFloat($('#give-amount').val());

                var feeRecovery = $('#lkn-fee-recovery-enabled').val();

                var checkboxLabel = $('.lkn-fee-recovery-label');
                var originalLabel = $('#lkn-fee-recovery-original-description').val();

                if (feeRecovery === 'global') {
                    var feeValue = parseFloat($('#lkn-fee-recovery-value').val());
                    var feePercent = parseFloat($('#lkn-fee-recovery-percent').val());
                    var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

                    checkboxLabel.html(originalLabel.replaceAll('##', feeTotal));
                }
            });
        }
    });

    function change_checkbox_opt(inputCheckbox) {
        if (inputCheckbox.val() === 'yes') {
            inputCheckbox.attr('value', 'no');
        } else {
            inputCheckbox.attr('value', 'yes');
        }
    }

    function update_fee(amount) {
        var iframe = document.getElementsByName('give-embed-form')[0];

        if (iframe) {
            var feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled').value;

            var checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0];
            var originalLabel = iframe.contentDocument.getElementById('lkn-fee-recovery-original-description').value;

            if (feeRecovery === 'global') {
                var feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value);
                var feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value);
                var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

                checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal);
            }
        } else {
            var feeRecovery = $('#lkn-fee-recovery-enabled').val();

            var checkboxLabel = $('.lkn-fee-recovery-label');
            var originalLabel = $('#lkn-fee-recovery-original-description').val();

            if (feeRecovery === 'global') {
                var feeValue = parseFloat($('#lkn-fee-recovery-value').val());
                var feePercent = parseFloat($('#lkn-fee-recovery-percent').val());
                var feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue);

                checkboxLabel.html(originalLabel.replaceAll('##', feeTotal));
            }
        }
    }
})(jQuery);
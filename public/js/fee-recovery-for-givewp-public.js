/* eslint-disable no-undef */
(function ($) {
  'use strict'

  let previousValue = '##'
  const feePercent = lknRecoveryFeeGlobals.feeValuePercent ? lknRecoveryFeeGlobals.feeValuePercent : null
  const feeValue = lknRecoveryFeeGlobals.feeValue ? lknRecoveryFeeGlobals.feeValue : null

  $(window).on('load', () => {

    const iframe = document.querySelector('iframe[title="Donation Form"]')
    // Check if GiveWP donation form has iframe
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

      const multiStepForm = innerDoc.querySelector('.givewp-donation-form.givewp-donation-form-design--multi-step')

      if (multiStepForm) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              const checkboxWrapper = innerDoc.querySelector('input[name="lkn_fee_recovery_enabled"]');

              if (checkboxWrapper) {
                const inputAmount = innerDoc.querySelector('input[name="amount"]');
                const checkboxLabel = innerDoc.querySelector('.givewp-fields-checkbox-lkn_fee_recovery_enabled label span');

                if (checkboxLabel && inputAmount) {
                  const amountValue = lknFormatFloat(inputAmount.value);

                  if (feePercent && feeValue) {
                    const currencySymbol = innerDoc.querySelector('input[name="currency"]');
                    const feeTotal = new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: currencySymbol.value
                    }).format((amountValue * feePercent) + parseInt(feeValue));

                    const oldText = checkboxLabel.textContent;

                    const newText = oldText.includes('##')
                      ? checkboxLabel.textContent.replaceAll('##', feeTotal)
                      : checkboxLabel.textContent.replaceAll(previousValue, feeTotal);

                    if (oldText !== newText) {
                      checkboxLabel.textContent = newText;
                      previousValue = feeTotal;
                    }
                  }
                }
              }
            }
          }
        });

        observer.observe(innerDoc.body, {
          childList: true,
          subtree: true
        });
      } else {

        const checkboxWrapper = innerDoc.querySelector('input[name="lkn_fee_recovery_enabled"]')

        // Verify if page template is loaded
        if (checkboxWrapper) {
          const inputAmount = innerDoc.querySelector('input[name="amount"]')
          const donationTotal = innerDoc.querySelector('#total .givewp-elements-donationSummary__list__item__value')
          const donationAmount = innerDoc.querySelector('#amount .givewp-elements-donationSummary__list__item__value')

          if (inputAmount && donationTotal && donationAmount) {
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                  const checkboxLabel = innerDoc.querySelector('.givewp-fields-checkbox-lkn_fee_recovery_enabled label span');
                  const feeRecoverySummary = innerDoc.querySelector('#fee-recovery .givewp-elements-donationSummary__list__item__value');
                  const currencySymbol = innerDoc.querySelector('input[name="currency"]');

                  if (checkboxLabel && inputAmount) {
                    const amountValue = lknFormatFloat(inputAmount.value);
                    if (feePercent && feeValue) {
                      const feeTotal = new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: currencySymbol.value
                      }).format((amountValue * feePercent) + parseInt(feeValue));

                      checkboxLabel.innerHTML = checkboxLabel.textContent.replaceAll(previousValue, feeTotal);
                      previousValue = feeTotal;

                      if (feeRecoverySummary && donationTotal) {
                        const feeRecoveryDiv = innerDoc.querySelector('#fee-recovery');
                        const style = window.getComputedStyle(feeRecoveryDiv);
                        const isVisible = style.display !== 'none';

                        let amountCalc = isVisible ? (amountValue * feePercent) + parseInt(feeValue) : 0;
                        const feeCalc = amountCalc + amountValue;
                        const feeTotalValue = new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: currencySymbol.value
                        }).format(feeCalc);

                        donationTotal.textContent = feeTotalValue;
                        feeRecoverySummary.textContent = feeTotal;
                      }
                    }
                  }
                }
              });
            });

            observer.observe(donationAmount, {
              childList: true,
              characterData: true,
              subtree: true
            });
          }



          const formObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const checkboxWrapper = innerDoc.querySelector('input[name="lkn_fee_recovery_enabled"]');

                if (checkboxWrapper) {
                  const inputAmount = innerDoc.querySelector('input[name="amount"]');
                  const checkboxLabel = innerDoc.querySelector('.givewp-fields-checkbox-lkn_fee_recovery_enabled label span');

                  if (checkboxLabel && inputAmount) {
                    const amountValue = lknFormatFloat(inputAmount.value);

                    if (feePercent && feeValue) {
                      const currencySymbol = innerDoc.querySelector('input[name="currency"]');
                      const feeTotal = new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: currencySymbol.value
                      }).format((amountValue * feePercent) + parseInt(feeValue));

                      const oldText = checkboxLabel.textContent;

                      const newText = oldText.includes('##')
                        ? checkboxLabel.textContent.replaceAll('##', feeTotal)
                        : checkboxLabel.textContent.replaceAll(previousValue, feeTotal);

                      if (oldText !== newText) {
                        checkboxLabel.textContent = newText;
                        previousValue = feeTotal;
                      }
                    }
                  }
                }
              }
            }
          });

          formObserver.observe(innerDoc.body, {
            childList: true,
            subtree: true
          });
        }
      }
    } else {
      // GiveWP donation form is legacy template
      const checkboxWrapper = $('#lkn-fee-recovery-checkbox-wrapper')

      // Verify if page template is loaded
      if (checkboxWrapper.length) {
        const amount = lknFormatFloat($('#give-amount').val())
        lknUpdateFee(amount)

        const inputAmount = $('#give-amount')
        inputAmount.on('change', (event) => {
          const amount = lknFormatFloat($(event.target).val())
          lknUpdateFee(amount)
        })

        const donationLevelWrap = $('#give-donation-level-button-wrap')
        donationLevelWrap.on('click', (event) => {
          setTimeout(() => {
            const amount = lknFormatFloat($('#give-amount').val())
            lknUpdateFee(amount)
          }, 500)
        })

        const inputVal = $('#lkn-fee-recovery-input')
        if (inputVal.length) {
          inputVal.on('click', (event) => {
            lknChangeFeeCheckboxOpt($(event.target))
            const amount = lknFormatFloat($('#give-amount').val())
            lknUpdateTotalAmount(amount)
          })
        }

        const giveGateway = $('.give-gateway')
        giveGateway.on('click', (event) => {
          const amount = lknFormatFloat($('#give-amount').val())

          const feeRecovery = $('#lkn-fee-recovery-enabled').val()

          const checkboxLabel = $('.lkn-fee-recovery-label')
          const originalLabel = $('#lkn-fee-recovery-original-description').val()

          if (feeRecovery === 'global') {
            const feeValue = parseFloat($('#lkn-fee-recovery-value').val())
            const feePercent = parseFloat($('#lkn-fee-recovery-percent').val())
            const feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue)

            checkboxLabel.html(originalLabel.replaceAll('##', feeTotal))
          }
        })
      }
    }
  })

  function lknChangeFeeCheckboxOpt(inputCheckbox) {
    if (inputCheckbox.val() === 'yes') {
      inputCheckbox.attr('value', 'no')
    } else {
      inputCheckbox.attr('value', 'yes')
    }
  }

  /**
   * Calculate and update fee value
   * @param {string} amount
   */
  function lknUpdateFee(amount) {
    const iframe = document.querySelector('iframe[title="Donation Form"]')
    // Check if GiveWP donation form has iframe
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const feeRecovery = innerDoc.getElementById('lkn-fee-recovery-enabled')

      if (feeRecovery && feeRecovery.value === 'global') {
        const checkboxLabel = innerDoc.getElementsByClassName('lkn-fee-recovery-label')[0]
        const originalLabel = innerDoc.getElementById('lkn-fee-recovery-original-description').value

        const feeValue = parseFloat(innerDoc.getElementById('lkn-fee-recovery-value').value)
        const feePercent = parseFloat(innerDoc.getElementById('lkn-fee-recovery-percent').value)
        let feeTotal = (amount * feePercent) + feeValue
        feeTotal = lknFeeFormatCurrency(feeTotal.toFixed(lknRecoveryFeeGlobals.decimal_qtd))

        checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal)
      }

      setTimeout(() => {
        const amount = lknFormatFloat(innerDoc.getElementById('give-amount').value)
        lknUpdateTotalAmount(amount)
      }, 500)
    } else {
      const feeRecovery = $('#lkn-fee-recovery-enabled').val()

      if (feeRecovery === 'global') {
        const checkboxLabel = $('.lkn-fee-recovery-label')
        const originalLabel = $('#lkn-fee-recovery-original-description').val()

        const feeValue = parseFloat($('#lkn-fee-recovery-value').val())
        const feePercent = parseFloat($('#lkn-fee-recovery-percent').val())
        let feeTotal = (amount * feePercent) + feeValue
        feeTotal = lknFeeFormatCurrency(feeTotal.toFixed(lknRecoveryFeeGlobals.decimal_qtd))

        checkboxLabel.html(originalLabel.replaceAll('##', feeTotal))
      }

      setTimeout(() => {
        const amount = lknFormatFloat($('#give-amount').val())
        lknUpdateTotalAmount(amount)
      }, 500)
    }
  }

  /**
   * Update the GiveWP total amount with the fee amount
   * @param {Number} amount
   */
  function lknUpdateTotalAmount(amount) {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const feeRecovery = innerDoc.getElementById('lkn-fee-recovery-enabled').value
      const totalAmountInput = innerDoc.querySelector("[data-tag='total']")
      const inputCheckbox = innerDoc.getElementById('lkn-fee-recovery-input')

      switch (feeRecovery) {
        case 'global': {
          const feeValue = parseFloat(innerDoc.getElementById('lkn-fee-recovery-value').value)
          const feePercent = parseFloat(innerDoc.getElementById('lkn-fee-recovery-percent').value)
          let feeTotal = (amount * feePercent) + feeValue
          feeTotal = amount + feeTotal
          const feeTotalAmount = lknFeeFormatCurrency(feeTotal.toFixed(lknRecoveryFeeGlobals.decimal_qtd))

          if (inputCheckbox.value === 'yes') {
            totalAmountInput.innerHTML = feeTotalAmount
          } else {
            amount = lknFeeFormatCurrency(amount.toFixed(lknRecoveryFeeGlobals.decimal_qtd))
            totalAmountInput.innerHTML = amount
          }

          break
        }

        default:
          break
      }
    } else {
      const feeRecovery = $('#lkn-fee-recovery-enabled').val()
      const totalAmountInput = $('.give-final-total-amount')
      const inputCheckbox = document.getElementById('lkn-fee-recovery-input')

      switch (feeRecovery) {
        case 'global': {
          const feeValue = parseFloat($('#lkn-fee-recovery-value').val())
          const feePercent = parseFloat($('#lkn-fee-recovery-percent').val())
          let feeTotal = (amount * feePercent) + feeValue
          feeTotal = amount + feeTotal
          const feeTotalAmount = lknFeeFormatCurrency(feeTotal.toFixed(lknRecoveryFeeGlobals.decimal_qtd))

          if (inputCheckbox.value === 'yes') {
            totalAmountInput.html(feeTotalAmount)
          } else {
            amount = lknFeeFormatCurrency(amount.toFixed(lknRecoveryFeeGlobals.decimal_qtd))
            totalAmountInput.html(amount)
          }

          break
        }

        default:
          break
      }
    }
  }

  /**
   * Format currency to locale
   * @param {string} amount
   * @returns {string}
   */
  function lknFeeFormatCurrency(amount) {
    amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: lknRecoveryFeeGlobals.currency, minimumFractionDigits: lknRecoveryFeeGlobals.decimal_qtd }).format(amount)
    amount = amount.replaceAll('.', '|')
    amount = amount.replaceAll(',', lknRecoveryFeeGlobals.thousand_separator)
    amount = amount.replaceAll('|', lknRecoveryFeeGlobals.decimal_separator)

    return amount
  }

  /**
   * Format string currency to float
   * @param {string} amount
   * @return {float}
   */
  function lknFormatFloat(amount) {
    amount = amount.replaceAll(lknRecoveryFeeGlobals.thousand_separator, '')
    amount = amount.replaceAll(lknRecoveryFeeGlobals.decimal_separator, '.')

    return parseFloat(amount)
  }
})(jQuery)

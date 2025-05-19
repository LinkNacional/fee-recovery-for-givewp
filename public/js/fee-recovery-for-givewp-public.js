/* eslint-disable no-undef */
(function ($) {
  'use strict'

  let previousValue = '##'
  let valueFound = false
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
                    const feeTotal = lknFeeTotal((amountValue * feePercent) + parseInt(feeValue), currencySymbol.value)

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
                      const feeTotal = lknFeeTotal((amountValue * feePercent) + parseInt(feeValue), currencySymbol.value)

                      checkboxLabel.innerHTML = checkboxLabel.textContent.replaceAll(previousValue, feeTotal);
                      previousValue = feeTotal;

                      if (feeRecoverySummary && donationTotal) {
                        const feeRecoveryDiv = innerDoc.querySelector('#fee-recovery');
                        const style = window.getComputedStyle(feeRecoveryDiv);
                        const isVisible = style.display !== 'none';

                        let amountCalc = isVisible ? (amountValue * feePercent) + parseInt(feeValue) : 0;
                        const feeCalc = amountCalc + amountValue;
                        const feeTotalValue = lknFeeTotal(feeCalc, currencySymbol.value);

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
                      const feeTotal = lknFeeTotal((amountValue * feePercent) + parseInt(feeValue), currencySymbol.value)

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
      // Legacy code for non-iframe forms
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' || mutation.type === 'subtree') {
            const amountValue = document.querySelector('#give-amount')
            if (amountValue && ) {
              const amountList = document.querySelector('#give-donation-level-radio-list')
              if (amountList) {
                amountList.addEventListener('change', handleAmountChange)
              }
              amountValue.addEventListener('input', handleAmountChange)
              handleAmountChange()
            }
          }
        }
      })

      // Configuração de observação
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

    }
  })

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

  /**
   * Format float to string currency
   * @param {float} amount
   * @return {string/null}
   */
  function lknFeeTotal(amount, currencySymbol = null) {
    currencySymbol = currencySymbol || lknRecoveryFeeGlobals.currency;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencySymbol
    }).format(amount);
  }

  /**
   * Update fee recovery label
   */
  function handleAmountChange() {
    const checkboxWrapper = document.querySelector('.lkn-fee-recovery-label')
    const amountValue = document.querySelector('#give-amount')

    console.log(document.querySelector('#give-amount').value)

    if (checkboxWrapper) {
      let feeTotal = 0
      const currencySymbol = document.querySelector('#give-mc-currency-selected')
      const amount = amountValue ? lknFormatFloat(amountValue.value) : 0

      if (currencySymbol) {
        feeTotal = lknFeeTotal((amount * feePercent) + parseInt(feeValue), currencySymbol.value)
      } else {
        feeTotal = lknFeeTotal((amount * feePercent) + parseInt(feeValue))
      }

      const oldText = checkboxWrapper.textContent;

      const newText = oldText.includes('##') ? checkboxWrapper.textContent.replaceAll('##', feeTotal) :
        checkboxWrapper.textContent.replaceAll(previousValue, feeTotal);

      checkboxWrapper.textContent = newText

      previousValue = feeTotal
    }
  }
})(jQuery)

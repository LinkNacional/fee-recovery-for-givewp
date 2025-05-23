/* eslint-disable no-undef */
(function ($) {
  'use strict'

  let previousValue = '##'
  let valueFound = false
  let previousCheckboxValue = null
  let defaultDonationValue = 0
  let feeCheckboxDisabled = true
  const feePercent = lknRecoveryFeeGlobals.feeValuePercent ? lknRecoveryFeeGlobals.feeValuePercent : null
  const feeValue = lknRecoveryFeeGlobals.feeValue ? lknRecoveryFeeGlobals.feeValue : null

  $(window).on('load', () => {

    const iframe = document.querySelector('iframe[title="Donation Form"]')
    // Check if GiveWP donation form has iframe
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

      const multiStepForm = innerDoc.querySelector('.givewp-donation-form.givewp-donation-form-design--multi-step')
      const twoPanelForm = innerDoc.querySelector('.givewp-donation-form.givewp-donation-form-design--two-panel-steps')

      if (multiStepForm || twoPanelForm) {
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

                    // Cielo installments
                    let cieloInstallments = innerDoc.getElementById('lkn-card-amount')

                    if (!cieloInstallments) {
                      feeCheckboxDisabled = true
                    }

                    if (checkboxWrapper.checked && feeCheckboxDisabled && cieloInstallments) {
                      feeCheckboxDisabled = false

                      setTimeout(() => {
                        cieloInstallments.value = parseFloat((amountValue * feePercent) + parseInt(feeValue) + amountValue).toFixed(2)
                        if (window[0] && typeof window[0].lknInitInstallment === 'function') {
                          window[0].lknInitInstallment();
                        }
                      }, 600)
                    }

                    if (!checkboxWrapper.checked && !feeCheckboxDisabled && cieloInstallments) {
                      feeCheckboxDisabled = true

                      setTimeout(() => {
                        cieloInstallments.value = parseFloat(amountValue).toFixed(2)
                        if (window[0] && typeof window[0].lknInitInstallment === 'function') {
                          window[0].lknInitInstallment();
                        }
                      }, 600)
                    }

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

                        // Cielo installments
                        if (checkboxWrapper.checked) {
                          let cieloInstallments = innerDoc.getElementById('lkn-card-amount')

                          if (cieloInstallments) {
                            cieloInstallments.value = parseFloat((amountValue * feePercent) + parseInt(feeValue) + amountValue).toFixed(2)
                            if (window[0] && typeof window[0].lknInitInstallment === 'function') {
                              window[0].lknInitInstallment();
                            }
                          }
                        }

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

                      if (checkboxWrapper.checked && feeCheckboxDisabled) {
                        feeCheckboxDisabled = false
                        let cieloInstallments = innerDoc.getElementById('lkn-card-amount')

                        if (cieloInstallments) {
                          cieloInstallments.value = parseFloat((amountValue * feePercent) + parseInt(feeValue) + amountValue).toFixed(2)
                          if (window[0] && typeof window[0].lknInitInstallment === 'function') {
                            window[0].lknInitInstallment();
                          }
                        }
                      }

                      if (!checkboxWrapper.checked && !feeCheckboxDisabled) {
                        feeCheckboxDisabled = true
                        let cieloInstallments = innerDoc.getElementById('lkn-card-amount')

                        if (cieloInstallments) {
                          cieloInstallments.value = parseFloat(amountValue).toFixed(2)
                          if (window[0] && typeof window[0].lknInitInstallment === 'function') {
                            window[0].lknInitInstallment();
                          }
                        }
                      }

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
          if (mutation.type === 'childList') {
            const amountValue = document.querySelector('#give-amount')
            const feeCheckbox = document.querySelector('#lkn-fee-recovery-input')

            if (!amountValue && !feeCheckbox) {
              valueFound = false
            }

            if (amountValue && feeCheckbox && !valueFound) {
              valueFound = true
              defaultDonationValue = lknFormatFloat(amountValue.value)
              const amountList = document.querySelector('#give-donation-level-radio-list')
              const multiCurrencySelect = document.querySelector('#give-mc-select')

              const cieloInstallmentsSelect = document.querySelector('#lkn-cielo-installment-select')

              if (multiCurrencySelect) {
                multiCurrencySelect.addEventListener('change', handleAmountChange)
              }

              if (amountList) {
                amountList.addEventListener('change', handleAmountChange)
              }
              amountValue.addEventListener('input', handleAmountChange)
              amountValue.addEventListener('blur', handleAmountChange)
              feeCheckbox.addEventListener('change', handleTotalAmount)
              handleAmountChange()

              // TODO fix cielo and remove this code
              if (cieloInstallmentsSelect) {
                cieloInstallmentsSelect.style.display = 'none';
              }
            }
          }
        }
      })

      // Configuração de observação
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      const originalOpen = XMLHttpRequest.prototype.open;
      const originalSend = XMLHttpRequest.prototype.send;

      XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        this._url = url;
        return originalOpen.apply(this, arguments);
      };

      XMLHttpRequest.prototype.send = function (body) {
        if (this._url && this._url.includes('admin-ajax.php')) {
          const feeCheckbox = document.querySelector('#lkn-fee-recovery-input');
          const amountValue = document.querySelector('#give-amount')
          const feeHiddenPriceId = document.querySelector('input[name="give-price-id"]')

          if (feeCheckbox && feeCheckbox.checked) {
            let feeTotal = 0
            const amount = amountValue ? lknFormatFloat(amountValue.value) : 0

            feeTotal = (amount * feePercent) + parseInt(feeValue) + amount

            if (typeof body === 'string') {
              // Transforma string em objeto
              const params = new URLSearchParams(body);

              if (params.has('give-amount')) {
                if (feeTotal !== 0) {
                  params.set('give-amount', feeTotal);
                  params.set('give-radio-donation-level', 'custom');
                  params.set('give-price-id', 'custom');

                  if (amountValue) {
                    amountValue.value = feeTotal
                  }

                  if (feeHiddenPriceId) {
                    feeHiddenPriceId.value = "custom"
                  }
                }
              }

              // Converte de volta para string
              body = params.toString();
            }
          }
        }

        return originalSend.call(this, body);
      };
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
  function handleAmountChange(event) {
    let value = event?.target?.value;

    if (value && event.type === "input") {
      // Remove o último caractere se for uma letra ou caractere especial (não numérico ou ponto ou vírgula)
      if (/[^\d]$/.test(value)) {
        value = value.slice(0, -1);
        event.target.value = value;
      }
    }

    const checkboxWrapper = document.querySelector('.lkn-fee-recovery-label')
    const amountValue = document.querySelector('#give-amount')

    if (checkboxWrapper) {
      let feeTotal = 0
      const currencySymbol = document.querySelector('#give-mc-currency-selected')
      let amount = amountValue && amountValue.value != '' ? lknFormatFloat(amountValue.value) : defaultDonationValue
      handleTotalAmount()

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

  function handleTotalAmount() {
    const totalAmountComponent = document.querySelector('.give-final-total-amount')
    const amountValueComponent = document.querySelector('#give-amount')
    const feeCheckbox = document.querySelector('#lkn-fee-recovery-input')

    if (totalAmountComponent && amountValueComponent && (feeCheckbox && feeCheckbox.checked)) {
      const amount = amountValueComponent ? lknFormatFloat(amountValueComponent.value) : 0
      const totalAmount = totalAmountComponent.getAttribute('data-total') ? lknFormatFloat(totalAmountComponent.getAttribute('data-total')) : 0

      if (amount !== 0 && totalAmount !== 0) {
        const feeTotalValue = (amount * feePercent) + parseInt(feeValue)
        const newTotal = totalAmount + feeTotalValue
        previousCheckboxValue = newTotal

        totalAmountComponent.textContent = lknFeeTotal(newTotal)
      }
    } else if (totalAmountComponent && amountValueComponent && (feeCheckbox || !feeCheckbox.checked)) {
      const amount = amountValueComponent ? lknFormatFloat(amountValueComponent.value) : 0
      const totalAmount = totalAmountComponent.getAttribute('data-total') ? lknFormatFloat(totalAmountComponent.getAttribute('data-total')) : 0

      if (amount !== 0 && totalAmount !== 0 && previousCheckboxValue) {
        const feeTotalValue = (amount * feePercent) + parseInt(feeValue)
        const newTotal = previousCheckboxValue - feeTotalValue
        previousCheckboxValue = null

        totalAmountComponent.textContent = lknFeeTotal(newTotal)
      }
    }
  }
})(jQuery)

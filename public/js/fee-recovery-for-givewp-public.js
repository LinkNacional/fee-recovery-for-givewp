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
      function initializeObserver(targetDocument) {
        const observer = new MutationObserver((mutationsList, observer) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              const amountValue = targetDocument.querySelector('#give-amount');
              const feeCheckbox = targetDocument.querySelector('#lkn-fee-recovery-input');

              if (!amountValue && !feeCheckbox) {
                valueFound = false;
              }

              if (amountValue && feeCheckbox && !valueFound) {

                valueFound = true;
                defaultDonationValue = lknFormatFloat(amountValue.value);
                const amountList = targetDocument.querySelector('#give-donation-level-radio-list, #give-donation-level-button-wrap');
                const multiCurrencySelect = targetDocument.querySelector('#give-mc-select');
                const cieloInstallmentsSelect = targetDocument.querySelector('#lkn-cielo-installment-select');
                const levelButtons = targetDocument.querySelectorAll('.give-donation-level-btn');

                if (levelButtons && levelButtons.length > 0) {
                  levelButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                      setTimeout(() => handleAmountChange(targetDocument, event), 100);
                    });
                  });
                }

                if (multiCurrencySelect) {
                  multiCurrencySelect.addEventListener('change', (event) => handleAmountChange(targetDocument, event));
                }

                if (amountList) {
                  amountList.addEventListener('change', (event) => handleAmountChange(targetDocument, event));
                }

                amountValue.addEventListener('input', (event) => handleAmountChange(targetDocument, event));
                amountValue.addEventListener('blur', (event) => handleAmountChange(targetDocument, event));
                feeCheckbox.addEventListener('change', () => handleTotalAmount(targetDocument));

                // Chama a função diretamente com o parâmetro
                handleAmountChange(targetDocument);

                // TODO fix cielo and remove this code
                if (cieloInstallmentsSelect) {
                  cieloInstallmentsSelect.style.display = 'none';
                }
              }
            }
          }
        });

        observer.observe(targetDocument.body, {
          childList: true,
          subtree: true,
        });

        return observer;
      }

      // Check if the form is inside an iframe
      const iframe = document.querySelector('#container iframe');
      if (iframe) {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        initializeObserver(innerDoc);

        // Sobrescreve o XMLHttpRequest no contexto do iframe
        const originalOpen = innerDoc.defaultView.XMLHttpRequest.prototype.open;
        const originalSend = innerDoc.defaultView.XMLHttpRequest.prototype.send;

        innerDoc.defaultView.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
          this._url = url; // Armazena a URL para uso posterior no send
          return originalOpen.apply(this, arguments);
        };

        innerDoc.defaultView.XMLHttpRequest.prototype.send = function (body) {
          if (this._url && this._url.includes('admin-ajax.php')) {
            const feeCheckbox = innerDoc.querySelector('#lkn-fee-recovery-input');
            const amountValue = innerDoc.querySelector('#give-amount');
            const feeHiddenPriceId = innerDoc.querySelector('input[name="give-price-id"]');
            previousCheckboxValue = null;

            if (feeCheckbox && feeCheckbox.checked) {
              let feeTotal = 0;
              const amount = amountValue ? lknFormatFloat(amountValue.value) : 0;

              feeTotal = (amount * feePercent) + parseInt(feeValue) + amount;

              if (typeof body === 'string') {
                // Transforma string em objeto
                const params = new URLSearchParams(body);

                if (params.has('give-amount')) {
                  if (feeTotal !== 0) {
                    params.set('give-amount', feeTotal);
                    params.set('give-radio-donation-level', 'custom');
                    params.set('give-price-id', 'custom');

                    if (amountValue) {
                      amountValue.value = feeTotal;
                    }

                    if (feeHiddenPriceId) {
                      feeHiddenPriceId.value = 'custom';
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
      } else {
        // Observe the main document
        initializeObserver(document);

        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
          this._url = url; // Armazena a URL para uso posterior no send
          return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function (body) {
          if (this._url && this._url.includes('admin-ajax.php')) {
            const feeCheckbox = document.querySelector('#lkn-fee-recovery-input');
            const amountValue = document.querySelector('#give-amount');
            const feeHiddenPriceId = document.querySelector('input[name="give-price-id"]');
            previousCheckboxValue = null

            if (feeCheckbox && feeCheckbox.checked) {
              let feeTotal = 0;
              const amount = amountValue ? lknFormatFloat(amountValue.value) : 0;

              feeTotal = (amount * feePercent) + parseInt(feeValue) + amount;

              if (typeof body === 'string') {
                // Transforma string em objeto
                const params = new URLSearchParams(body);

                if (params.has('give-amount')) {
                  if (feeTotal !== 0) {
                    params.set('give-amount', feeTotal);
                    params.set('give-radio-donation-level', 'custom');
                    params.set('give-price-id', 'custom');

                    if (amountValue) {
                      amountValue.value = feeTotal;
                    }

                    if (feeHiddenPriceId) {
                      feeHiddenPriceId.value = 'custom';
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
    }
  })

  /**
   * Format string currency to float
   * @param {string} amount
   * @return {float}
   */
  function lknFormatFloat(amount) {
    amount = amount.replace(/[^0-9.,]/g, '')
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
  function handleAmountChange(targetDocument, event) {
    let value = event?.target?.value;

    if (value && event.type === "input") {
      // Remove o último caractere se for uma letra ou caractere especial (não numérico ou ponto ou vírgula)
      if (/[^\d]$/.test(value)) {
        value = value.slice(0, -1);
        event.target.value = value;
      }
    }

    const checkboxWrapper = targetDocument.querySelector('.lkn-fee-recovery-label')
    const amountValue = targetDocument.querySelector('#give-amount')

    if (checkboxWrapper) {
      let feeTotal = 0
      const currencySymbol = targetDocument.querySelector('#give-mc-currency-selected')
      let amount = amountValue && amountValue.value != '' ? lknFormatFloat(amountValue.value) : defaultDonationValue
      handleTotalAmount(targetDocument)

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

  function handleTotalAmount(targetDocument) {
    const totalAmountComponent = targetDocument.querySelector('.give-final-total-amount, th[data-tag="total"]')
    const subTotalAmountComponent = targetDocument.querySelector('td[data-tag="amount"]')
    const amountValueComponent = targetDocument.querySelector('#give-amount')
    const feeCheckbox = targetDocument.querySelector('#lkn-fee-recovery-input')

    if (totalAmountComponent && amountValueComponent && (feeCheckbox && feeCheckbox.checked)) {
      const amount = amountValueComponent ? lknFormatFloat(amountValueComponent.value) : 0
      let totalAmount = totalAmountComponent.getAttribute('data-total') ? lknFormatFloat(totalAmountComponent.getAttribute('data-total')) : 0

      if (totalAmount === 0) {
        if (totalAmountComponent.getAttribute('data-tag')) {
          totalAmount = lknFormatFloat(totalAmountComponent.textContent)
        }
      }

      if (amount !== 0 && totalAmount !== 0) {
        const feeTotalValue = (amount * feePercent) + parseInt(feeValue)
        const newTotal = totalAmount + feeTotalValue
        previousCheckboxValue = newTotal

        totalAmountComponent.textContent = lknFeeTotal(newTotal)

        if (subTotalAmountComponent) {
          const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'childList' || mutation.type === 'characterData') {
                subTotalAmountComponent.textContent = lknFeeTotal(newTotal);

                // Desconecta o observer após a mudança
                observer.disconnect();
                break;
              }
            }
          });

          // Configura o observer para observar mudanças no conteúdo do subTotalAmountComponent
          observer.observe(subTotalAmountComponent, {
            childList: true,
            characterData: true,
            subtree: true,
          });
        }
      }
    } else if (totalAmountComponent && amountValueComponent && (feeCheckbox || !feeCheckbox.checked)) {
      const amount = amountValueComponent ? lknFormatFloat(amountValueComponent.value) : 0
      let totalAmount = totalAmountComponent.getAttribute('data-total') ? lknFormatFloat(totalAmountComponent.getAttribute('data-total')) : 0

      if (totalAmount === 0) {
        if (totalAmountComponent.getAttribute('data-tag')) {
          totalAmount = lknFormatFloat(totalAmountComponent.textContent)
        }
      }

      if (amount !== 0 && totalAmount !== 0 && previousCheckboxValue) {
        const feeTotalValue = (amount * feePercent) + parseInt(feeValue)
        const newTotal = previousCheckboxValue - feeTotalValue
        previousCheckboxValue = null

        totalAmountComponent.textContent = lknFeeTotal(newTotal)

        if (subTotalAmountComponent) {
          const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'childList' || mutation.type === 'characterData') {
                subTotalAmountComponent.textContent = lknFeeTotal(newTotal);

                // Desconecta o observer após a mudança
                observer.disconnect();
                break;
              }
            }
          });

          // Configura o observer para observar mudanças no conteúdo do subTotalAmountComponent
          observer.observe(subTotalAmountComponent, {
            childList: true,
            characterData: true,
            subtree: true,
          });
        }
      }
    }
  }
})(jQuery)

/* eslint-disable no-undef */
(function ($) {
  'use strict'

  $(window).on('load', () => {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const checkboxWrapper = iframe.contentDocument.getElementById('lkn-fee-recovery-checkbox-wrapper')

      if (checkboxWrapper) {
        const amount = lknFormatFloat(iframe.contentDocument.getElementById('give-amount').value)
        lknUpdateFee(amount)

        // Compatibility to load css in iframe forms
        const styleLink = document.createElement('link')

        styleLink.setAttribute('href', lknRecoveryFeeGlobals.css_path)
        styleLink.setAttribute('rel', 'stylesheet')
        styleLink.setAttribute('type', 'text/css')
        const bodyIframe = iframe.contentDocument.getElementsByClassName('give-form')[0]
        bodyIframe.appendChild(styleLink)

        const inputAmount = iframe.contentDocument.getElementById('give-amount')
        inputAmount.addEventListener('change', (event) => {
          const amount = lknFormatFloat(event.target.value)
          lknUpdateFee(amount)
        })

        const donationLevelWrap = iframe.contentDocument.getElementById('give-donation-level-button-wrap')
        donationLevelWrap.addEventListener('click', (event) => {
          setTimeout(() => {
            const amount = lknFormatFloat(iframe.contentDocument.getElementById('give-amount').value)
            lknUpdateFee(amount)
          }, 500)
        })

        // Compatibility to add events for iframe forms
        const inputVal = iframe.contentDocument.getElementById('lkn-fee-recovery-input')
        inputVal.addEventListener('click', (event) => {
          lknChangeFeeCheckboxOpt($(event.target))
          const amount = lknFormatFloat(iframe.contentDocument.getElementById('give-amount').value)
          lknUpdateTotalAmount(amount)
        })

        const giveGateway = iframe.contentDocument.getElementsByClassName('give-gateway')
        for (let c = 0; c < giveGateway.length; c++) {
          giveGateway[c].addEventListener('click', (event) => {
            const amount = lknFormatFloat(iframe.contentDocument.getElementById('give-amount').value)
            const feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled').value

            const checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0]
            const originalLabel = iframe.contentDocument.getElementById('lkn-fee-recovery-original-description').value

            if (feeRecovery === 'global') {
              const feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value)
              const feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value)
              const feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue)

              checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal)
            }
          })
        }
      }
    } else {
      const checkboxWrapper = $('#lkn-fee-recovery-checkbox-wrapper')

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

  function lknChangeFeeCheckboxOpt (inputCheckbox) {
    if (inputCheckbox.val() === 'yes') {
      inputCheckbox.attr('value', 'no')
    } else {
      inputCheckbox.attr('value', 'yes')
    }
  }

  function lknUpdateFee (amount) {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled')

      if (feeRecovery && feeRecovery.value === 'global') {
        const checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0]
        const originalLabel = iframe.contentDocument.getElementById('lkn-fee-recovery-original-description').value

        const feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value)
        const feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value)
        let feeTotal = (amount * feePercent) + feeValue
        feeTotal = lknFeeFormatCurrency(feeTotal.toFixed(lknRecoveryFeeGlobals.decimal_qtd))

        checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal)
      }

      setTimeout(() => {
        const amount = lknFormatFloat(iframe.contentDocument.getElementById('give-amount').value)
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
  function lknUpdateTotalAmount (amount) {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled').value
      const totalAmountInput = iframe.contentDocument.querySelector("[data-tag='total']")
      const inputCheckbox = iframe.contentDocument.getElementById('lkn-fee-recovery-input')

      switch (feeRecovery) {
        case 'global':{
          const feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value)
          const feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value)
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
        case 'global':{
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
  function lknFeeFormatCurrency (amount) {
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
  function lknFormatFloat (amount) {
    amount = amount.replaceAll(lknRecoveryFeeGlobals.thousand_separator, '')
    amount = amount.replaceAll(lknRecoveryFeeGlobals.decimal_separator, '.')

    return parseFloat(amount)
  }
})(jQuery)

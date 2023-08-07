(function ($) {
  'use strict'

  $(window).on('load', () => {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value)
      updateFee(amount)

      // Compatibility to load css in iframe forms
      const styleLink = document.createElement('link')

      // eslint-disable-next-line no-undef
      styleLink.setAttribute('href', lknRecoveryFeeGlobals.css_path)
      styleLink.setAttribute('rel', 'stylesheet')
      styleLink.setAttribute('type', 'text/css')
      const bodyIframe = iframe.contentDocument.getElementsByClassName('give-form')[0]
      bodyIframe.appendChild(styleLink)

      const inputAmount = iframe.contentDocument.getElementById('give-amount')
      inputAmount.addEventListener('change', (event) => {
        const amount = parseFloat(event.target.value)
        updateFee(amount)
      })

      const donationLevelWrap = iframe.contentDocument.getElementById('give-donation-level-button-wrap')
      donationLevelWrap.addEventListener('click', (event) => {
        setTimeout(() => {
          const amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value)
          updateFee(amount)
        }, 500)
      })

      // Compatibility to add events for iframe forms
      const inputVal = iframe.contentDocument.getElementById('lkn-fee-recovery-input')
      inputVal.addEventListener('click', (event) => {
        changeCheckboxOpt($(event.target))
      })

      const giveGateway = iframe.contentDocument.getElementsByClassName('give-gateway')
      for (let c = 0; c < giveGateway.length; c++) {
        giveGateway[c].addEventListener('click', (event) => {
          const amount = parseFloat(iframe.contentDocument.getElementById('give-amount').value)
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
    } else {
      const amount = parseFloat($('#give-amount').val())
      updateFee(amount)

      const inputAmount = $('#give-amount')
      inputAmount.on('change', (event) => {
        const amount = parseFloat($(event.target).val())
        updateFee(amount)
      })

      const donationLevelWrap = $('#give-donation-level-button-wrap')
      donationLevelWrap.on('click', (event) => {
        setTimeout(() => {
          const amount = parseFloat($('#give-amount').val())
          updateFee(amount)
        }, 500)
      })

      const inputVal = $('#lkn-fee-recovery-input')
      if (inputVal.length) {
        inputVal.on('click', (event) => {
          changeCheckboxOpt($(event.target))
        })
      }

      const giveGateway = $('.give-gateway')
      giveGateway.on('click', (event) => {
        const amount = parseFloat($('#give-amount').val())

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
  })

  function changeCheckboxOpt (inputCheckbox) {
    if (inputCheckbox.val() === 'yes') {
      inputCheckbox.attr('value', 'no')
    } else {
      inputCheckbox.attr('value', 'yes')
    }
  }

  function updateFee (amount) {
    const iframe = document.getElementsByName('give-embed-form')[0]

    if (iframe) {
      const feeRecovery = iframe.contentDocument.getElementById('lkn-fee-recovery-enabled').value

      const checkboxLabel = iframe.contentDocument.getElementsByClassName('lkn-fee-recovery-label')[0]
      const originalLabel = iframe.contentDocument.getElementById('lkn-fee-recovery-original-description').value

      if (feeRecovery === 'global') {
        const feeValue = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-value').value)
        const feePercent = parseFloat(iframe.contentDocument.getElementById('lkn-fee-recovery-percent').value)
        const feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue)

        checkboxLabel.innerHTML = originalLabel.replaceAll('##', feeTotal)
      }
    } else {
      const feeRecovery = $('#lkn-fee-recovery-enabled').val()

      const checkboxLabel = $('.lkn-fee-recovery-label')
      const originalLabel = $('#lkn-fee-recovery-original-description').val()

      if (feeRecovery === 'global') {
        const feeValue = parseFloat($('#lkn-fee-recovery-value').val())
        const feePercent = parseFloat($('#lkn-fee-recovery-percent').val())
        const feeTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((amount * feePercent) + feeValue)

        checkboxLabel.html(originalLabel.replaceAll('##', feeTotal))
      }
    }
  }
// eslint-disable-next-line no-undef
})(jQuery)

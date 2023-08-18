(function ($) {
  'use strict'

  $(window).on('load', () => {
    const urlParams = new URLSearchParams(window.location.search)
    const section = urlParams.get('section')
    const postType = urlParams.get('post_type')
    const page = urlParams.get('page')
    const tab = urlParams.get('tab')

    if (
      postType === 'give_forms' &&
      page === 'give-settings' &&
      tab === 'general' &&
      section === 'lkn-fee-recovery'
    ) {
      const feeEnabled = document.getElementsByName('lkn_fee_recovery_setting_field')

      const fixedInput = $('#lkn_fee_recovery_setting_field_fixed')
      const percentInput = $('#lkn_fee_recovery_setting_field_percent')

      // Sets inputs as to accept float values
      fixedInput.attr('min', '0')
      fixedInput.attr('step', '0.01')
      percentInput.attr('min', '0')
      percentInput.attr('step', '0.01')

      // Disables unused options
      feeEnabled[1].parentElement.setAttribute('style', 'color: #ababab;cursor: not-allowed;')
      feeEnabled[1].setAttribute('disabled', '')
      feeEnabled[1].setAttribute('style', 'cursor: not-allowed;')
      feeEnabled[2].parentElement.setAttribute('style', 'color: #ababab;cursor: not-allowed;')
      feeEnabled[2].setAttribute('disabled', '')
      feeEnabled[2].setAttribute('style', 'cursor: not-allowed;')

      // Notice to sell the plugin
      const noticeDiv = document.createElement('div')
      noticeDiv.setAttribute('id', 'lkn-fee-recovery-notice')
      // eslint-disable-next-line no-undef
      noticeDiv.innerHTML = lknRecoveryFeeAdmin.notice + ' <a href="https://www.linknacional.com/wordpress/" target="_blank">Fee Recovery Pro</a>'

      const formSubmit = document.getElementsByClassName('give-submit-wrap')[0]
      formSubmit.before(noticeDiv)
    }
  })
// eslint-disable-next-line no-undef
})(jQuery)

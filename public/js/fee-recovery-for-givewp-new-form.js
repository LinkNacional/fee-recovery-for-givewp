jQuery(document).ready(function ($) {
    // Variáveis com valores do PHP
    var feeValue = varsPhp.feeValue;
    var feeValuePercent = varsPhp.feeValuePercent;
    var enabledFee = varsPhp.enabledFee;
    var description = varsPhp.description;

    // Estrutura dos elementos a serem inseridos
    // var elements = `
    //     <div id="lkn-fee-recovery-checkbox-wrapper">
    //         <input type="hidden" name="lkn-fee-recovery-value" id="lkn-fee-recovery-value" value="${feeValue}" />
    //         <input type="hidden" name="lkn-fee-recovery-percent" id="lkn-fee-recovery-percent" value="gatewayData[${feeValuePercent}]" />
    //         <input type="hidden" name="lkn-fee-recovery-enabled" id="lkn-fee-recovery-enabled" value="${enabledFee}" />
    //         <input type="hidden" name="lkn-fee-recovery-original-description" id="lkn-fee-recovery-original-description" value="${description}" />
            
    //         <div style="display:flex; gap:15px; justify-content:center;" id="lkn-fee-recovery-list-wrap">
    //             <input class="give-input" type="checkbox" id="lkn-fee-recovery-input" name="lkn-fee-recovery" value="no">
    //             <p class="lkn-fee-recovery-label" for="lkn-fee-recovery-input">${description}</p>
    //         </div>
    //     </div>
    // `;
    var elements= '<div class="givewp-fields givewp-fields-text givewp-fields-text-firstName"><label><span class="givewp-fields__label-text">Nome <span class="givewp-field-required" title="Field Required">*</span></span><input type="text" aria-invalid="false" placeholder="Nome" name="firstName2"></label></div>'

    // Inserir o conteúdo após o primeiro elemento filho de #give-next-gen se a taxa estiver habilitada
    if (enabledFee) {
        var firstChild = $('#give-next-gen').children().first();
        if (firstChild.length) {
            firstChild.after(elements);
        }
    }
});

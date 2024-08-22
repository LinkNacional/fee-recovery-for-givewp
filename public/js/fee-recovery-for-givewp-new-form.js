document.addEventListener('DOMContentLoaded', function () {
    // Variáveis com valores do PHP
    const feeValue = parseFloat(varsPhp.feeValue);
    const feeValuePercent = parseFloat(varsPhp.feeValuePercent);

    // Função para atualizar o valor da taxa de recuperação
    function atualizarTaxaDeRecuperacao() {
        const hiddenInput = document.querySelector('input[name="amount"]');
        const feeRecoveryElement = document.querySelector("#fee-recovery .givewp-elements-donationSummary__list__item__value");

        if (hiddenInput && feeRecoveryElement) {
            const amountValue = parseFloat(hiddenInput.value);
            const feeRecoveryValue = (amountValue * feeValuePercent + feeValue).toFixed(2);
            feeRecoveryElement.textContent = `R$ ${feeRecoveryValue}`;
        }
    }

    // Função para atualizar os textos dos elementos de doação
    function atualizarTextos(checked) {
        const elements = document.querySelectorAll(".givewp-elements-donationSummary__list__item__value");
        const hiddenInput = document.querySelector('input[name="amount"]');

        if (elements.length > 0 && hiddenInput) {
            const lastElement = elements[elements.length - 1];
            const amountValue = parseFloat(hiddenInput.value);
            const newAmount = checked
                ? (amountValue + (amountValue * feeValuePercent + feeValue)).toFixed(2)
                : amountValue.toFixed(2);

            lastElement.textContent = `R$ ${newAmount}`;
            atualizarTaxaDeRecuperacao();
        }
    }

    // Função para adicionar um novo item na lista de doações
    function adicionarElementoTaxaDeRecuperacao() {
        const list = document.querySelector(".givewp-elements-donationSummary__list");
        const hiddenInput = document.querySelector('input[name="amount"]');

        if (list && hiddenInput) {
            const amountValue = parseFloat(hiddenInput.value);
            const novoItem = document.createElement('li');
            novoItem.id = 'fee-recovery';
            novoItem.className = 'givewp-elements-donationSummary__list__item';
            novoItem.innerHTML = `
                <div class="givewp-elements-donationSummary__list__item">
                    <div class="givewp-elements-donationSummary__list__item__label">Taxa de recuperação</div>
                    <div class="givewp-elements-donationSummary__list__item__value">R$ ${(amountValue * feeValuePercent + feeValue).toFixed(2)}</div>
                </div>
            `;
            novoItem.style.display = "none";

            const items = list.querySelectorAll('.givewp-elements-donationSummary__list__item');
            list.insertBefore(novoItem, items[1] || null);
        }
    }

    // Função para inicializar as atualizações e adicionar o elemento de taxa de recuperação
    function inicializar() {
        adicionarElementoTaxaDeRecuperacao();
    }

    // Inicializa ao carregar o DOM
    inicializar();

    // Listener para o checkbox de recuperação de taxa
    const checkbox = document.querySelector("input[name='lkn_fee_recovery_enabled']");
    if (checkbox) {
        checkbox.addEventListener("click", () => {
            const info = document.querySelector("#fee-recovery");
            if (info) {
                if (checkbox.checked) {
                    info.style.display = "block";
                    checkbox.value = true;
                    atualizarTextos(true);
                } else {
                    info.style.display = "none";
                    checkbox.value = false;
                    atualizarTextos(false);
                }
            }
        });

        const hiddenInput = document.querySelector('input[name="amount"]');
        const amountCustom = document.querySelector("input[name='amount-custom']");
        if (hiddenInput && amountCustom) {
            amountCustom.addEventListener("change", () => {
                const info = document.querySelector("#fee-recovery");
                if (info) {
                    if (checkbox.checked) {
                        info.style.display = "block";
                        checkbox.value = true;
                        atualizarTextos(true);
                    } else {
                        info.style.display = "none";
                        checkbox.value = false;
                        atualizarTextos(false);
                    }
                }
            });
        }
    }
});

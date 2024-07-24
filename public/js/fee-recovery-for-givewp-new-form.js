document.addEventListener('DOMContentLoaded', function () {
    // Variáveis com valores do PHP (exemplo de atribuição)
    var feeValue = parseFloat(varsPhp.feeValue);
    var feeValuePercent = parseFloat(varsPhp.feeValuePercent);

    // Função para extrair e incrementar o número no texto
    function incrementarNumero(texto) {
        var numeroAtual = parseFloat(texto.replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (!isNaN(numeroAtual)) {
            var novoNumero = numeroAtual * (1 + feeValuePercent) + feeValue;
            return texto.replace(numeroAtual, novoNumero.toFixed(0));
        } else {
            return texto;
        }
    }

    // Função para atualizar o valor da taxa de recuperação
    function atualizarTaxaDeRecuperacao() {
        var hiddenInput = document.querySelector('input[name="amount"]');
        if (hiddenInput) {
            var amountValue = parseFloat(hiddenInput.value);
            var feeRecoveryValue = (amountValue * feeValuePercent + feeValue).toFixed(2);
            var feeRecoveryElement = document.querySelector("#fee-recovery .givewp-elements-donationSummary__list__item__value");
            if (feeRecoveryElement) {
                feeRecoveryElement.innerHTML = `R$ ${feeRecoveryValue}`;
            }
        }
    }

    // Função para atualizar os textos dos elementos de doação
    function atualizarTextos() {
        var elements = document.querySelectorAll(".givewp-elements-donationSummary__list__item__value");
        if (elements.length > 0) {
            var lastElement = elements[elements.length - 1];
            var hiddenInput = document.querySelector('input[name="amount"]');
            if (hiddenInput) {
                var amountValue = parseFloat(hiddenInput.value);
                lastElement.innerHTML = `R$ ${(amountValue + (amountValue * feeValuePercent + feeValue)).toFixed(2)}`;
            }

            atualizarTaxaDeRecuperacao();
        }
    }

    // Função para adicionar um novo item na lista de doações
    function adicionarElementoTaxaDeRecuperacao() {
        var list = document.querySelector(".givewp-elements-donationSummary__list");
        var hiddenInput = document.querySelector('input[name="amount"]');
        if (list && hiddenInput) {
            var amountValue = parseFloat(hiddenInput.value);
            var novoItem = document.createElement('li');
            novoItem.id = 'fee-recovery';
            novoItem.className = 'givewp-elements-donationSummary__list__item';
            novoItem.innerHTML = `
                <div class="givewp-elements-donationSummary__list__item__label-container">
                    <div class="givewp-elements-donationSummary__list__item__label">Taxa de recuperação</div>
                </div>
                <div class="givewp-elements-donationSummary__list__item__value">R$ ${(amountValue * feeValuePercent + feeValue).toFixed(2)}</div>
            `;

            var items = list.querySelectorAll('.givewp-elements-donationSummary__list__item');
            if (items.length >= 1) {
                list.insertBefore(novoItem, items[1]);
            } else {
                list.appendChild(novoItem);
            }
        }
    }

    // Função para inicializar as atualizações e adicionar o elemento de taxa de recuperação
    function inicializar() {
        adicionarElementoTaxaDeRecuperacao();
        atualizarTextos();
    }

    // Inicializa ao carregar o DOM
    inicializar();

    // Adiciona event listener para atualizar os textos ao clicar em qualquer elemento
    document.addEventListener('click', function () {
        atualizarTextos();
    });

    // Função debounce para introduzir um atraso antes da execução da função
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Adiciona event listener para atualizar os textos ao alterar o valor do input "amount-custom" com debounce
    var amountCustomInput = document.querySelector('input[name="amount-custom"]');
    if (amountCustomInput) {
        amountCustomInput.addEventListener('input', debounce(function () {
            atualizarTextos();
        }, 500)); // Ajuste o tempo de espera conforme necessário (500ms neste exemplo)
    }
});

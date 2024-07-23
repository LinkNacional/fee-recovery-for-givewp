document.addEventListener('DOMContentLoaded', function () {
    // Variáveis com valores do PHP (exemplo de atribuição)
    var feeValue = parseFloat(varsPhp.feeValue);
    var feeValuePercent = parseFloat(varsPhp.feeValuePercent);

    // Função para incrementar o número no texto
    function incrementarNumero(texto) {
        // Extrair o número atual do texto usando uma expressão regular
        var numeroAtual = parseFloat(texto.replace(/[^0-9.,]/g, '').replace(',', '.'));

        // Verificar se a extração foi bem-sucedida e se o número não é NaN
        if (!isNaN(numeroAtual)) {
            // Incrementar o número
            var novoNumero = numeroAtual * (1 + feeValuePercent) + feeValue; // Corrigido para incrementar

            // Atualizar o texto com o novo número formatado
            return texto.replace(numeroAtual, novoNumero.toFixed(0)); // Garantir que o número tenha duas casas decimais
        } else {
            // Retornar o texto original se o número não puder ser extraído
            return texto;
        }
    }

    // Função para atualizar os textos dos elementos
    function atualizarTextos() {
        var elements = document.querySelectorAll(".givewp-elements-donationSummary__list__item__value");
        
        if (elements.length >= 3) {
            var lastElement = elements[elements.length - 1];

      

            // Atualizar o texto do último elemento
            var textoAtualUltimo = lastElement.textContent;
            var novoTextoUltimo = incrementarNumero(textoAtualUltimo);
            lastElement.textContent = novoTextoUltimo;
        }
    }

    adicionarNovoElemento();

    // Adicionar o novo elemento
    function adicionarNovoElemento() {
        var list = document.querySelector(".givewp-elements-donationSummary__list");
        var hiddenInput = document.querySelector('input[name="amount"]');
        
        // Verificar se o input foi encontrado
        if (hiddenInput) {
            // Obter o valor do input hidden
            var amountValue = hiddenInput.value;
    
            if (list) {
                // Criar o novo item
                var novoItem = document.createElement('li');
                novoItem.id = 'fee-recovery';
                novoItem.className = 'givewp-elements-donationSummary__list__item';
                novoItem.innerHTML = `
                    <div class="givewp-elements-donationSummary__list__item__label-container">
                        <div class="givewp-elements-donationSummary__list__item__label">Taxa de recuperação</div>
                    </div>
                    <div class="givewp-elements-donationSummary__list__item__value">R$ ${(parseFloat(amountValue) * feeValuePercent + feeValue).toFixed(2)}</div>
                `;
                
                // Inserir o novo item como o segundo filho
                var items = list.querySelectorAll('.givewp-elements-donationSummary__list__item');
                if (items.length >= 1) {
                    // Inserir o novo item antes do segundo item existente (índice 1)
                    list.insertBefore(novoItem, items[1]);
                } else {
                    // Caso a lista não tenha pelo menos um item, adicionar o novo item ao final
                    list.appendChild(novoItem);
                }
            }
        }
    }
    

    // Atualizar textos e adicionar novo elemento
    atualizarTextos();

    // Adicionar um event listener para cliques em qualquer botão, exceto submit
    document.body.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON' && event.target.type !== 'submit') {
            atualizarTextos();
        }
    });
});

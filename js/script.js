// =====================================================
// CARROSSEL / ABAS — lógica de navegação entre painéis
// =====================================================

// querySelectorAll retorna uma NodeList (lista) com TODOS
// os elementos que têm a classe .button-carrosel
const botoes = document.querySelectorAll('.button-carrosel');

// Mesmo para os painéis de conteúdo
const paineis = document.querySelectorAll('.painel');

// Array com os IDs dos painéis, na mesma ordem
// que os botões aparecem no HTML
const ids = [
    'painel-senhas',
    'painel-navegação',
    'painel-email',
    'painel-celular',
    'painel-redes',
    'painel-idoso',
    'painel-gerador'
];

// forEach percorre cada botão da lista.
// "btn" é o botão atual, "i" é o índice (0, 1, 2, ...)
botoes.forEach((btn, i) => {

    // O carrossel tem os botões duplicados no HTML (14 no total, 7 reais).
    // O operador % (módulo) pega o resto da divisão.
    // Exemplo: botão de índice 7 → 7 % 7 = 0 → mapeia para "painel-senhas"
    // Assim, os botões duplicados apontam para os mesmos painéis
    const idx = i % ids.length;

    // addEventListener "escuta" um evento no elemento.
    // 'click' = quando o usuário clica no botão,
    // a função dentro é chamada
    btn.addEventListener('click', () => {

        // 1) Remove a classe "ativa" de TODOS os botões
        //    para que o visual de selecionado suma de todos
        botoes.forEach(b => b.classList.remove('ativa'));

        // 2) Remove a classe "ativo" de TODOS os painéis
        //    para que eles fiquem ocultos (display: none no CSS)
        paineis.forEach(p => p.classList.remove('ativo'));

        // 3) Adiciona "ativa" no botão clicado E em seus duplicados.
        //    j % ids.length === idx → verifica se o botão j
        //    corresponde ao mesmo painel que o botão clicado
        botoes.forEach((b, j) => {
            if (j % ids.length === idx) {
                b.classList.add('ativa');
            }
        });

        // 4) Pega o painel correspondente pelo ID e o torna visível
        const painel = document.getElementById(ids[idx]);
        if (painel) {
            painel.classList.add('ativo');
            // O CSS .painel.ativo tem display: block,
            // então o painel aparece
        }

        // 5) Rola o carrossel para que o botão clicado
        //    fique visível (centralizado) na tela
        btn.scrollIntoView({
            behavior: 'smooth', // Rolagem animada
            block: 'nearest',   // Não rola verticalmente
            inline: 'center'    // Centraliza horizontalmente
        });
    });
});


// =====================================================
// GERADOR DE SENHA
// =====================================================

// getElementById busca UM elemento pelo seu id único
const slider       = document.getElementById('tamanho');
const tamanhoValor = document.getElementById('tamanho-valor');
const btnGerar     = document.getElementById('btn-gerar');
const btnCopiar    = document.getElementById('btn-copiar');
const senhaGerada  = document.getElementById('senha-gerada');
const forcaLabel   = document.getElementById('forca-label');

// Evento 'input' no slider: disparado enquanto o usuário
// arrasta o controle deslizante
slider.addEventListener('input', () => {
    // slider.value é o valor atual do range (8 a 32)
    // textContent altera o texto visível do elemento
    tamanhoValor.textContent = slider.value;
});


// Função que gera a senha — chamada ao clicar no botão
function gerarSenha() {

    // parseInt converte a string do slider para número inteiro
    const tamanho = parseInt(slider.value);

    // .checked retorna true se o checkbox está marcado, false se não
    const usaMin = document.getElementById('minusculos').checked;
    const usaMai = document.getElementById('maiusculas').checked;
    const usaNum = document.getElementById('numeros').checked;
    const usaSim = document.getElementById('simbolos').checked;

    // Monta o "alfabeto" de caracteres possíveis
    // conforme as opções marcadas pelo usuário
    let chars = ''; // começa vazio
    if (usaMin) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (usaMai) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (usaNum) chars += '0123456789';
    if (usaSim) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Se o usuário desmarcou tudo, avisa e para a função
    if (!chars) {
        senhaGerada.textContent = 'Selecione ao menos um tipo';
        forcaLabel.textContent = '';
        return; // return interrompe a execução da função aqui
    }

    // Gera a senha caractere por caractere
    let senha = ''; // começa vazia

    for (let i = 0; i < tamanho; i++) {
        // Math.random() → número decimal entre 0 e 1 (ex: 0.7432)
        // * chars.length → multiplica pelo total de chars possíveis
        // Math.floor() → arredonda para baixo, virando um índice inteiro
        // chars[índice] → pega o caractere naquela posição
        senha += chars[Math.floor(Math.random() * chars.length)];
    }

    // Exibe a senha gerada na tela
    senhaGerada.textContent = senha;

    // Avalia e exibe a força da senha
    avaliarForca(senha, usaMin, usaMai, usaNum, usaSim);
}


// Função que avalia a força da senha e atualiza o label
function avaliarForca(senha, min, mai, num, sim) {

    // Conta quantos tipos de caracteres foram usados.
    // filter(Boolean) remove os valores false do array,
    // e .length conta os que sobraram (os true)
    const tipos = [min, mai, num, sim].filter(Boolean).length;

    const len = senha.length; // Comprimento da senha

    let nivel = ''; // Texto a exibir
    let cor   = ''; // Cor do texto

    // Lógica de avaliação em cascata:
    if (len < 8 || tipos < 2) {
        // Fraca: curta demais OU poucos tipos de caractere
        nivel = '🔴 Senha fraca';
        cor   = '#f87171'; // Vermelho
    } else if (len < 12 || tipos < 3) {
        // Moderada
        nivel = '🟡 Senha moderada';
        cor   = '#fbbf24'; // Âmbar
    } else if (len < 16 || tipos < 4) {
        // Forte
        nivel = '🟢 Senha forte';
        cor   = '#4ade80'; // Verde
    } else {
        // Muito forte: longa E todos os tipos de caractere
        nivel = '🟢 Senha muito forte';
        cor   = '#22c55e'; // Verde mais vivo
    }

    forcaLabel.textContent = nivel;
    forcaLabel.style.color = cor;
    // .style.color altera o CSS do elemento diretamente via JS
}


// Conecta o botão "Gerar senha" à função
btnGerar.addEventListener('click', gerarSenha);


// Lógica do botão "Copiar"
btnCopiar.addEventListener('click', () => {

    const texto = senhaGerada.textContent;

    // Se ainda não gerou senha, não faz nada
    if (!texto
        || texto === 'Clique em gerar senha'
        || texto === 'Selecione ao menos um tipo') {
        return;
    }

    // navigator.clipboard.writeText() copia o texto
    // para a área de transferência do sistema operacional.
    // Retorna uma Promise (operação assíncrona)
    navigator.clipboard.writeText(texto).then(() => {

        // .then() é executado quando a cópia termina com sucesso
        const original = btnCopiar.textContent; // Salva o texto original
        btnCopiar.textContent = '✅ Copiado!';  // Muda temporariamente

        // setTimeout executa a função após 1800ms (1,8 segundo)
        // Aqui restaura o texto original do botão
        setTimeout(() => {
            btnCopiar.textContent = original;
        }, 1800);
    });
});
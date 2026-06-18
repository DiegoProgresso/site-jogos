const btnQRCode = document.getElementById("btn-qrcode");
const modal = document.getElementById("qrcode-modal");
const fechar = document.getElementById("fechar");

btnQRCode.addEventListener("click", () => {
    modal.style.display = "flex";
});

fechar.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if(event.target === modal){
        modal.style.display = "none";
    }
});

/* chatbot */

const btnChatbot = document.getElementById("btn-chatbot");
const chatPanel = document.getElementById("chat-panel");
const chatOverlay = document.getElementById("chat-overlay");
const chatFechar = document.getElementById("chat-fechar");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Base de perguntas e respostas (ordem importa: mais específico primeiro)
const faq = [
    {
        keywords: ["oi", "ola", "olar", "ei", "bom dia", "boa tarde", "boa noite"],
        answer: "Olá! Posso te ajudar com informações sobre os jogos do site ou sobre o QR Code. O que você quer saber?"
    },
    {
        keywords: ["diego"],
        answer: "O jogo do Diego é um RPG de fantasia por turnos. Clique em 'Jogar' no card dele para abrir."
    },
    {
        keywords: ["guilherme"],
        answer: "O jogo do Guilherme é um roguelike. Clique em 'Jogar' no card dele para abrir."
    },
    {
        keywords: ["eduardo"],
        answer: "O jogo do Eduardo é de parkour. Clique em 'Jogar' no card dele para abrir."
    },
    {
        keywords: ["giovanna"],
        answer: "O jogo da Giovanna é 'O Ninja'. Clique em 'Jogar' no card dela para abrir."
    },
    {
        keywords: ["gabriela"],
        answer: "O jogo da Gabriela é inspirado na Branca de Neve. Clique em 'Jogar' no card dela para abrir."
    },
    {
        keywords: ["yohan"],
        answer: "O jogo do Yohan é de blocos. Clique em 'Jogar' no card dele para abrir."
    },
    {
        keywords: ["qrcode", "qr code", "qr"],
        answer: "Tem um botão 'QR Code' no canto superior direito da tela. Clique nele para abrir um QR Code e acessar o site pelo celular."
    },
    {
        keywords: ["quantos jogos", "lista de jogos", "quais jogos", "jogos tem", "jogos disponiveis"],
        answer: "O site tem 6 jogos: Diego (fantasia de turno), Guilherme (roguelike), Eduardo (parkour), Giovanna (O Ninja), Gabriela (branca de neve) e Yohan (blocos)."
    },
    {
        keywords: ["como jogar", "como funciona", "como abre o jogo"],
        answer: "Basta clicar no botão verde 'Jogar' dentro do card do jogo que você quer abrir. Cada jogo abre em uma nova aba."
    },
    {
        keywords: ["quem fez", "autor", "turma", "criou o site", "desenvolveu"],
        answer: "Esse site reúne jogos feitos por alunos de uma turma, cada um desenvolveu o seu próprio jogo."
    },
    {
        keywords: ["jogos", "jogo"],
        answer: "O site tem 6 jogos: Diego (fantasia de turno), Guilherme (roguelike), Eduardo (parkour), Giovanna (O Ninja), Gabriela (branca de neve) e Yohan (blocos)."
    },
    {
        keywords: ["obrigado", "obrigada", "valeu", "gracas"],
        answer: "De nada! Qualquer outra dúvida, só perguntar."
    }
];

const respostaPadrao = "Não entendi muito bem. Você pode perguntar, por exemplo: \"quais jogos tem aqui?\" ou \"como funciona o QR Code?\"";

function normalizar(texto){
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function buscarResposta(pergunta){
    const textoNormalizado = normalizar(pergunta);

    for(const item of faq){
        for(const palavra of item.keywords){
            if(textoNormalizado.includes(palavra)){
                return item.answer;
            }
        }
    }

    return respostaPadrao;
}

function adicionarMensagem(texto, tipo){
    const msg = document.createElement("div");
    msg.classList.add("msg", tipo === "bot" ? "msg-bot" : "msg-user");
    msg.textContent = texto;

    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function abrirChat(){
    chatPanel.classList.add("open");
    chatOverlay.classList.add("show");

    if(chatMessages.children.length === 0){
        adicionarMensagem("Oi! Sou o assistente do site. Pergunte sobre os jogos ou sobre o QR Code.", "bot");
    }
}

function fecharChat(){
    chatPanel.classList.remove("open");
    chatOverlay.classList.remove("show");
}

function enviarPergunta(){
    const texto = chatInput.value.trim();

    if(texto === ""){
        return;
    }

    adicionarMensagem(texto, "user");
    chatInput.value = "";

    setTimeout(() => {
        adicionarMensagem(buscarResposta(texto), "bot");
    }, 400);
}

btnChatbot.addEventListener("click", abrirChat);
chatFechar.addEventListener("click", fecharChat);
chatOverlay.addEventListener("click", fecharChat);

chatSend.addEventListener("click", enviarPergunta);

chatInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        enviarPergunta();
    }
});
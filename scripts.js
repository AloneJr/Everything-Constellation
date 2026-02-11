const dbCuriosidades = [
    // --- O CENTRO DE TUDO ---
    {
        id: "big_bang",
        titulo: "O Big Bang",
        tipo: "bigbang", // Isso ativa o CSS novo que criamos
        x: 1500, // Centro exato do universo (3000px / 2)
        y: 1500, 
        // AQUI ESTÁ O SEGREDO: Ele se conecta ao início de cada constelação
        conexoes: ["fisica_1", "bio_1"], 
        conteudo: "O início do espaço-tempo. De onde tudo surgiu há 13.8 bilhões de anos."
    },

    // --- RAMO DA FÍSICA (Vai para a Direita/Cima) ---
    {
        id: "fisica_1",
        titulo: "Partículas Elementares",
        tipo: "fisica",
        x: 1700, // Um pouco à direita do centro
        y: 1400, // Um pouco acima
        conexoes: ["fisica_2"], // Continua a linha da física
        conteudo: "Logo após o Big Bang, surgiram os primeiros Quarks e Léptons..."
    },
    {
        id: "fisica_2",
        titulo: "Átomos",
        tipo: "fisica",
        x: 1850, 
        y: 1300,
        conexoes: [], 
        conteudo: "380 mil anos depois, o universo esfriou o suficiente para formar hidrogênio..."
    },

    // --- RAMO DA BIOLOGIA (Vai para a Esquerda/Baixo) ---
    {
        id: "bio_1",
        titulo: "Química da Vida",
        tipo: "biologia",
        x: 1300, // Um pouco à esquerda do centro
        y: 1700, // Um pouco abaixo
        conexoes: ["bio_2"],
        conteudo: "Elementos forjados em estrelas começam a se combinar..."
    },
    {
        id: "bio_2",
        titulo: "RNA / DNA",
        tipo: "biologia",
        x: 1150,
        y: 1800,
        conexoes: [],
        conteudo: "Moléculas capazes de se replicar iniciam a evolução..."
    }
];

// script.js
const universe = document.getElementById('universe');
const viewport = document.getElementById('viewport');
const svgLayer = document.getElementById('lines-layer');

// 1. RENDERIZAR O MAPA
function renderizarMapa() {
    dbCuriosidades.forEach(item => {
        // Criar a Estrela (Div)
        const star = document.createElement('div');
        star.className = `star ${item.tipo}`;
        star.style.left = `${item.x}px`;
        star.style.top = `${item.y}px`;
        
        // Evento de Clique para abrir info
        star.onclick = () => abrirModal(item);

        // Adicionar Tooltip (título ao passar o mouse)
        star.title = item.titulo; 

        universe.appendChild(star);

        // Criar Conexões (Linhas)
        if (item.conexoes) {
            item.conexoes.forEach(conexaoID => {
                const alvo = dbCuriosidades.find(i => i.id === conexaoID);
                if (alvo) {
                    criarLinha(item.x, item.y, alvo.x, alvo.y);
                }
            });
        }
    });
}

function criarLinha(x1, y1, x2, y2) {
    const linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    linha.setAttribute("x1", x1);
    linha.setAttribute("y1", y1);
    linha.setAttribute("x2", x2);
    linha.setAttribute("y2", y2);
    svgLayer.appendChild(linha);
}

// 2. SISTEMA DE ARRASTAR (PANNING)
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - viewport.offsetLeft;
    startY = e.pageY - viewport.offsetTop;
    // Onde o scroll estava antes de começar a arrastar
    scrollLeft = viewport.scrollLeft; 
    scrollTop = viewport.scrollTop;
});

viewport.addEventListener('mouseleave', () => { isDragging = false; });
viewport.addEventListener('mouseup', () => { isDragging = false; });

viewport.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Cálculo de quanto o mouse andou
    const x = e.pageX - viewport.offsetLeft;
    const y = e.pageY - viewport.offsetTop;
    const walkX = (x - startX) * 1; // Velocidade do arrasto
    const walkY = (y - startY) * 1;

    // Move o scroll do viewport
    viewport.scrollLeft = scrollLeft - walkX;
    viewport.scrollTop = scrollTop - walkY;
});

// Inicializar
renderizarMapa();

// Funções do Modal (simples)
function abrirModal(item) {
    const modal = document.getElementById('info-modal');
    document.getElementById('modal-titulo').innerText = item.titulo;
    document.getElementById('modal-texto').innerText = item.conteudo;
    modal.classList.remove('hidden');
}
function fecharModal() {
    document.getElementById('info-modal').classList.add('hidden');
}
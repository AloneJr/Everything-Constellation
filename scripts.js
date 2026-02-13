const dbCuriosidades = [
    // --- O CENTRO (A Origem) ---
    {
        id: "big_bang",
        titulo: "O Big Bang",
        tipo: "bigbang",
        x: 1500, 
        y: 1500, 
        conexoes: ["particulas", "elementos"], // O ponto de divergência
        conteudo: "Há 13.8 bilhões de anos, o universo expandiu-se de um ponto de densidade infinita. Não foi uma explosão no espaço, mas uma explosão DO espaço."
    },

    // =================================================
    // RAMO DA FÍSICA & COSMOS (Direita Superior)
    // =================================================
    {
        id: "particulas",
        titulo: "Sopa Primordial",
        tipo: "fisica",
        x: 1700,
        y: 1350,
        conexoes: ["estrelas"],
        conteudo: "Nos primeiros segundos, o calor era tanto que átomos não podiam existir. O universo era uma sopa de quarks e glúons."
    },
    {
        id: "estrelas",
        titulo: "O Nascimento das Estrelas",
        tipo: "fisica",
        x: 1900,
        y: 1250,
        conexoes: ["supernova", "galaxias"],
        conteudo: "400 milhões de anos depois, a gravidade colapsou nuvens de gás hidrogênio, acendendo as primeiras fornalhas nucleares do cosmos."
    },
    {
        id: "supernova",
        titulo: "Supernovas",
        tipo: "fisica",
        x: 2100,
        y: 1150,
        conexoes: ["buraco_negro"],
        conteudo: "Estrelas massivas morrem em explosões colossais, espalhando ouro, ferro e carbono pelo universo. Somos poeira de estrelas."
    },
    {
        id: "buraco_negro",
        titulo: "Buracos Negros",
        tipo: "fisica",
        x: 2250,
        y: 1000,
        conexoes: [],
        conteudo: "Regiões onde a gravidade é tão forte que nada, nem a luz, escapa. Eles moldam o coração de quase todas as galáxias."
    },
    {
        id: "galaxias",
        titulo: "Estrutura Galáctica",
        tipo: "fisica",
        x: 1950,
        y: 1450, // Uma ramificação lateral
        conexoes: [],
        conteudo: "A gravidade uniu bilhões de estrelas em ilhas cósmicas. A Via Láctea é apenas uma entre trilhões no universo observável."
    },

    // =================================================
    // RAMO DA QUÍMICA & BIOLOGIA (Esquerda Inferior)
    // =================================================
    {
        id: "elementos",
        titulo: "Química Complexa",
        tipo: "biologia",
        x: 1300,
        y: 1650,
        conexoes: ["agua", "rna"],
        conteudo: "Com o resfriamento e as supernovas, elementos pesados permitiram reações químicas complexas em discos protoplanetários."
    },
    {
        id: "agua",
        titulo: "Água Líquida",
        tipo: "biologia",
        x: 1150,
        y: 1550,
        conexoes: [],
        conteudo: "O solvente universal. Essencial para a vida como conhecemos, facilitando o transporte de nutrientes e reações bioquímicas."
    },
    {
        id: "rna",
        titulo: "Mundo de RNA",
        tipo: "biologia",
        x: 1100,
        y: 1800,
        conexoes: ["luca"],
        conteudo: "Antes do DNA, acredita-se que o RNA era responsável tanto por armazenar informação genética quanto por catalisar reações."
    },
    {
        id: "luca",
        titulo: "LUCA",
        tipo: "biologia",
        x: 900,
        y: 1900,
        conexoes: ["eucariontes"],
        conteudo: "Last Universal Common Ancestor. O microrganismo ancestral de onde descendem todas as bactérias, fungos, plantas e animais."
    },
    {
        id: "eucariontes",
        titulo: "Células Complexas",
        tipo: "biologia",
        x: 750,
        y: 2000,
        conexoes: ["consciencia"],
        conteudo: "Uma fusão simbiótica: uma célula engoliu outra (a mitocôndria), gerando energia suficiente para criar organismos multicelulares."
    },
    {
        id: "consciencia",
        titulo: "A Consciência",
        tipo: "biologia",
        x: 600,
        y: 2100,
        conexoes: [], // Fim da linha... por enquanto?
        conteudo: "O universo desenvolveu uma maneira de observar a si mesmo. O cérebro humano é a estrutura mais complexa conhecida."
    }
];


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

// ==========================================
// 2. SISTEMA DE NAVEGAÇÃO (CORRIGIDO)
// ==========================================
let zoom = 2.5; // Zoom inicial
let panX = 0;
let panY = 0;

// Constantes do Centro do Universo (Onde está o Big Bang)
const BIG_BANG_X = 1500;
const BIG_BANG_Y = 1500;

function centralizarNoBigBang() {
    const telaW = window.innerWidth;
    const telaH = window.innerHeight;

    // MATEMÁTICA PURA: 
    // Queremos que o ponto 1500 esteja no meio da tela.
    // Fórmula: Centro da Tela - (Ponto do Objeto * Zoom)
    // Ignora qualquer "transform-origin" confuso e coloca o pixel exato no meio.
    
    // Mas como estamos usando transform-origin: 1500px 1500px no CSS (ou forçando aqui),
    // A conta simplifica para: Centro da Tela - Centro do Objeto.
    
    universe.style.transformOrigin = `${BIG_BANG_X}px ${BIG_BANG_Y}px`;
    
    panX = (telaW / 2) - BIG_BANG_X;
    panY = (telaH / 2) - BIG_BANG_Y;

    atualizarUniverso();
}

function atualizarUniverso() {
    // Aplica o movimento e o zoom
    universe.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;
}

// Evento de Zoom (Mantendo o foco no Big Bang se não tiver movido, ou no mouse)
viewport.addEventListener('wheel', (e) => {
    e.preventDefault();

    const oldZoom = zoom;
    if (e.deltaY > 0) {
        zoom -= 0.15;
    } else {
        zoom += 0.15;
    }
    zoom = Math.max(0.5, Math.min(zoom, 4.0)); // Limites de zoom

    atualizarUniverso();
}, { passive: false });

// Evento de Arrastar (Drag)
let isDragging = false;
let startX, startY;

viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    viewport.style.cursor = 'grabbing';
});

viewport.addEventListener('mouseleave', () => { isDragging = false; viewport.style.cursor = 'grab'; });
viewport.addEventListener('mouseup', () => { isDragging = false; viewport.style.cursor = 'grab'; });

viewport.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    atualizarUniverso();
});

// Atraso de segurança para garantir que o navegador calculou o tamanho da tela
setTimeout(centralizarNoBigBang, 100);
window.addEventListener('resize', centralizarNoBigBang); // Recalcula se redimensionar a janela

// Inicializar o Mapa
renderizarMapa(); // 1º: Desenha todas as estrelas
centralizarNoBigBang(); // 2º: Posiciona a câmera no centro com zoom

// ==========================================
// 3. FUNÇÕES DO MODAL
// ==========================================
function abrirModal(item) {
    const modal = document.getElementById('info-modal');
    document.getElementById('modal-titulo').innerText = item.titulo;
    document.getElementById('modal-texto').innerText = item.conteudo;
    modal.classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('info-modal').classList.add('hidden');
}

// ==========================================
// SISTEMA DE INTRODUÇÃO (A "Função Mestra")
// ==========================================
const introLayer = document.getElementById('intro-layer');
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função Genérica: Aplica o efeito em QUALQUER elemento
// *Atualizada*
async function aplicarEfeitoRandomico(elementoId, tempoDeLeitura) {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;

    // 1. Prepara o texto
    const textoOriginal = elemento.innerText; // Pega o texto que está no HTML
    
    // --- CORREÇÃO AQUI ---
    // Se o texto já estiver vazio (porque a função rodou antes), não faz nada
    if(textoOriginal === '') return; 
    
    elemento.innerText = ''; // Limpa para inserir as letras animadas
    
    // Liga o elemento (tira do display: none)
    elemento.style.display = 'flex'; 
    elemento.style.opacity = '1'; 

    const spans = [];
    for (let letra of textoOriginal) {
        const span = document.createElement('span');
        span.innerText = letra;
        span.style.opacity = '0'; 
        
        if (letra === ' ') {
            span.style.width = '15px';
            span.innerHTML = '&nbsp;';
        }

        elemento.appendChild(span);
        spans.push(span);
    }

    // 2. Embaralha
    const spansRandomicos = [...spans].sort(() => Math.random() - 0.5);

    // 3. Animação de Entrada
    const velocidade = textoOriginal.length > 20 ? 30 : 50; 

    for (let span of spansRandomicos) {
        span.style.opacity = '1';
        await esperar(velocidade); 
    }

    // 4. Tempo de Leitura
    await esperar(tempoDeLeitura);

    // 5. Animação de Saída
    elemento.style.transition = "opacity 1.5s ease";
    elemento.style.opacity = '0';
    
    await esperar(1500); 
    
    // --- CORREÇÃO FINAL ---
    // Desliga o elemento de novo para ele não atrapalhar os outros
    elemento.style.display = 'none'; 
    
    // (Opcional?) Restaura o texto original caso precise rodar de novo no futuro sem reload
    elemento.innerText = textoOriginal; 
    elemento.style.transition = ""; // Reseta transição
}

// O Roteiro do Filme (Sequência de execução)
async function iniciarJornada() {
    // Verifica se já assistiu
    if (localStorage.getItem('introAssistida') === 'true') {
        introLayer.style.display = 'none';
        document.getElementById('texto-final').style.display = 'none';
        return;
    }

    // Pequena pausa no escuro antes de começar
    await esperar(1000);

    // CENA 1: "Constelações contam histórias,"
    await aplicarEfeitoRandomico('texto-1', 2000);

    // CENA 2: "a minha te conta sobre tudo."
    await aplicarEfeitoRandomico('texto-2', 2000);

    // CENA 3: "E tudo começou com:"
    await aplicarEfeitoRandomico('texto-3', 1500);

    // CENA 4: O Big Bang (Tela preta some)
    introLayer.style.transition = "opacity 2s ease";
    introLayer.style.opacity = '0';
    
    // Salva que o usuário já viu
    localStorage.setItem('introAssistida', 'true');
    
    // Remove a camada preta do DOM
    setTimeout(() => { introLayer.style.display = 'none'; }, 2000);

    // CENA 5: Título Final "O Big Bang" (O Gran Finale)
    // Note que usamos a MESMA função, só mudamos o ID e o tempo!
    const textoFinal = document.getElementById('texto-final');
    textoFinal.innerText = "O Big Bang"; // Garante o texto
    textoFinal.style.display = "flex"; // Garante que aparece
    
    // Um pequeno delay para o Big Bang explodir visualmente antes do texto
    await esperar(500); 
    await aplicarEfeitoRandomico('texto-final', 4000); // 4 segundos de tela
}

// Luz, Camera, Ação!
iniciarJornada();
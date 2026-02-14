# 🌌 Everything Constellation 

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

> "Constelações contam histórias, a minha te conta sobre tudo."

Uma experiência interativa de exploração de dados (Data Visualization) onde o conhecimento humano é mapeado como um universo em expansão. O projeto foge do layout tradicional de sites (scroll vertical) para criar um **"Canvas Infinito"** navegável.

---

## 🖼️ Preview

![Preview do Projeto](./assets/preview.gif)

*Assista à introdução cinemática do projeto.*

---

## 🚀 A Experiência (Features)

Este projeto não utiliza bibliotecas externas (como Canvas API ou Three.js). Toda a lógica física e visual foi construída do zero com **Vanilla JS**.

### 1. 🌟 O Big Bang Interativo
- **Intro Cinematográfica:** Um sistema de sequenciamento de texto com *fade-in/fade-out* assíncrono (`async/await`) conta a história do início de tudo.
- **Explosão Inicial:** O site inicia focado no "Big Bang", com um efeito visual pulsante e textos que se formam letra por letra aleatoriamente.

### 2. 🗺️ Motor de Navegação (Custom Map Engine)
- **Pan & Drag:** O usuário pode clicar e arrastar o universo infinito para explorar tópicos.
- **Zoom Dinâmico:** Sistema de zoom via *scroll* (rodinha do mouse) que foca matematicamente no centro do universo ou na posição do mouse.
- **Renderização por Dados:** O mapa não é desenhado no HTML. Ele é gerado via JavaScript a partir de um JSON complexo que dita coordenadas (X, Y), conexões e categorias.

### 3. 🔗 Conexões Neurais (SVG)
- As "estrelas" (tópicos de conhecimento) são conectadas dinamicamente por linhas SVG, criando constelações visuais que representam a evolução do conhecimento (ex: Big Bang -> Partículas -> Estrelas).

---

## 🛠️ Tecnologias & Desafios Técnicos

### 🧠 JavaScript (Lógica Avançada)
- **Matemática de Coordenadas:** Cálculo em tempo real de `translateX`, `translateY` e `scale` para criar a ilusão de câmera móvel.
- **Manipulação de SVG:** Criação dinâmica de linhas (`<line>`) baseada nas coordenadas dos objetos DOM.
- **Assincronismo:** Uso intensivo de `Promises` e `setTimeout` para orquestrar a animação de introdução e garantir que o usuário só veja o mapa após a narrativa.

### 🎨 CSS3 (Imersão)
- **Animações de Keyframes:** Efeitos de pulsação estelar e brilho neon (`box-shadow`).
- **Transformações 3D:** Uso de `translate3d` para garantir performance de 60fps na renderização do mapa.
- **Layout Absoluto:** Posicionamento fixo de elementos em um container gigante (3000px x 3000px).

---

## 📂 Estrutura de Dados
Cada "estrela" no céu é um objeto JSON que contém sua posição e suas conexões, permitindo que o mapa cresça infinitamente apenas adicionando dados:

```json
{
    "id": "big_bang",
    "titulo": "O Big Bang",
    "x": 1500,
    "y": 1500,
    "conexoes": ["particulas", "elementos"],
    "conteudo": "A origem do espaço-tempo..."
}
```
---

🚧 Roadmap (Próximos Passos)
[ ] Modo Mobile: Adicionar suporte a eventos de toque (touchstart, touchmove) para celulares.

[ ] Busca: Uma barra de pesquisa para "viajar" automaticamente até uma estrela específica.

[ ] Novas Constelações: Adicionar ramos de História, Arte e Tecnologia.

---

💻 Como rodar localmente
1. Clone o repositório:

```bash
git clone https://github.com/alonejr/everything-constellation.git
```
2. Entre na pasta:

```Bash
cd nome-do-repositorio
```

3. Abra o index.html no seu navegador ou utilise o LiveServer do VSCode.

<p align="center">
Feito com 🌌 e Javascript por <a href="https://www.google.com/search?q=https://github.com/alonejr" target="_blank">Jeryel A.</a>
</p>

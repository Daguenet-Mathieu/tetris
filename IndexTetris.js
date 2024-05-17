

console.log(document.getElementsByTagName("main")[0].clientWidth);

function renderHomePage() {
    const main = document.getElementsByTagName("main")[0];
    Array.from(main.children).forEach(child => {
        main.removeChild(child);
    });
    main.style.justifyContent = "";
    main.style.alignItems = "";
    const buttonTetris = document.createElement("div");
    buttonTetris.classList.add("gameChoiceButton");
    buttonTetris.appendChild(document.createElement("p")).innerHTML = "Tetris";
    const buttonPong = document.createElement("div");
    buttonPong.classList.add("gameChoiceButton");
    buttonPong.appendChild(document.createElement("p")).innerHTML = "Pong";
    main.appendChild(buttonTetris);
    main.appendChild(buttonPong);
    buttonTetris.addEventListener("click", (e) => { loadTetris(e.target.parentNode) });
    buttonPong.addEventListener("click", (e) => { loadPong(e.target.parentNode) });
}

function homeButton(element) {
    const buttonHome = document.createElement("div");
    buttonHome.classList.add("Home");
    buttonHome.appendChild(document.createElement("p")).innerHTML = "Home";
    element.appendChild(buttonHome);
    buttonHome.addEventListener("click", () => { renderHomePage() });
}

async function getNbPlayer(element, nbr) {
    return new Promise((resolve, reject) => {
        const playerList = document.createElement("ul");
        playerList.classList.add("player-list");
        playerList.innerHTML = `<p>select player number</p>`;
        
        Array.from({ length: nbr }, (_, i) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<label><input type="checkbox" value="${i + 1}"><span>${i + 1}</span></label>`;
            listItem.querySelector("input[type='checkbox']").addEventListener("change", (event) => {
                resolve(parseInt(event.target.value));
            });
            playerList.appendChild(listItem);
        });

        element.appendChild(playerList);
    });
}

function initCanvas(element, nbCanvas) {
    const canvasContainer = document.createElement("div");
    canvasContainer.classList.add("canvas-container");

    const parentHeight = element.clientHeight - 100;
    const canvasHeight = Math.floor((parentHeight) / 20) * 20;
    const canvasWidth = canvasHeight / 2;
    const canvases = [];
    for (let i = 0; i < nbCanvas; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvases.push({ ctx: canvas.getContext("2d"), width: canvasWidth, height: canvasHeight });
        canvasContainer.appendChild(canvas);
    }
    element.appendChild(canvasContainer);
    return (canvases);
}


async function loadPong(element) {
    Array.from(element.children).forEach(child => {
        element.removeChild(child);
    });
    homeButton(element);
    const selectedPlayers = await getNbPlayer(element, 2);
}

async function loadTetris(element) {
    Array.from(element.children).forEach(child => {
        element.removeChild(child);
    });
    homeButton(element);
    const selectedPlayers = await getNbPlayer(element, 2);
    console.log(selectedPlayers);
    Array.from(element.children).forEach(child => {
        if (!child.classList.contains("Home")) {
            element.removeChild(child);
        }
    });
    const canvas = initCanvas(element, selectedPlayers);
    console.log(canvas);
    const tetris = [];
    canvas.forEach((c, i) => {
        console.log(c);
        tetris.push({
            currentPiece: getNextPiece(),
            nextPiece: getNextPiece(),
            savedPiece:"undefined",
            map: initMap(),
            canvas: c.ctx,
            sizeSquare: c.width / 10,
            line: 0,
            events: [],
            listen: i == 0?["a", "w", "d", "s"]: ["ArrowLeft", "ArrowDown", "ArrowUp","ArrowRight"],
        });});
    fallPiece(tetris);
    myEvent(tetris);
    console.log(tetris[0].map);
    loop(tetris);
}

renderHomePage();
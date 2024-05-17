
function drawCanevas(canvas, map){
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            canvas.fillStyle = map[y][x];
            canvas.fillRect(x * 40, y * 40, 40, 40);
            canvas.strokeStyle = "#F0F0F2";
            canvas.strokeRect(x * 40, y * 40, 40, 40);
        }
    }
}

function drawPreview(canvas, piece) {
    console.log(piece);
    for (let y = 0; y < piece.width; y++) {
        for (let x = 0; x < piece.width; x++) {
            piece.fillStyle = "#FFFFFF";
            console.log(piece);
            if (typeof nextPiece.positions[y] !== 'undefined' && typeof piece.positions[y][x] !== 'undefined') {
                canvas.fillStyle = piece.positions[y][x];
            }
            canvas.fillRect(x * 20, y * 20, 20, 20);
        }
    }
}



function drawPiece(canvas, piece){
    for (let y = 0; y < piece.width; y++) {
        for (let x = 0; x < piece.width; x++) {
            let color = piece.positions[y][x];
            canvas.fillStyle = color;
            if (color != "#FFFFFF")
                canvas.fillRect((piece.start.x + x) * 40, (piece.start.y + y) * 40, 40, 40);
            //canvas.fillRect((piece.start.y + x) * 40, (piece.start.y + y) * 40, 40, 40);
        }
    }
}

function drawShadow(canvas, piece){
    let newpiece = JSON.parse(JSON.stringify(piece));
    while (fctDrop(newpiece, 1));
    let color = piece.color;
    for (let y = 0; y < piece.width; y++) {
        for (let x = 0; x < piece.width; x++) {
            if (newpiece.positions[y][x] != "#FFFFFF")
            {
                canvas.fillStyle = color + "3F";
                canvas.fillRect((newpiece.start.x + x) * 40, (newpiece.start.y + y) * 40, 40, 40);
            }             
            //canvas.fillRect((piece.start.y + x) * 40, (piece.start.y + y) * 40, 40, 40);
        }
    }

}

function isValid(piece, map){
    for (let i = 0; i < piece.positions.length; i++)
    {
        if (piece.positions[i].y > 19 || map[piece.positions[i].y][piece.positions[i].x] != "#FFFFFF")
            return false;
    }
    return true;
}

function fctRotate(dir) {
    let newpos =  new Array(currentPiece.width);
    let col;
    console.log(currentPiece);
    if (dir == 'a' || "ArrowUp")
    {
        col = currentPiece.width - 1;
        for (let i = 0; i < currentPiece.positions.length; i++)
        {
            newpos[i] = [];
            for (let j = 0; j < currentPiece.positions[i].length; j++)
                newpos[i].push(currentPiece.positions[j][col]);
            col--
        }
    }
    else
    {
        for (let i = 0; i < currentPiece.positions.length; i++)
        {
            newpos[i] = [];
            for (let j = 0; j < currentPiece.positions[i].length; j++)
                newpos[i].push(currentPiece.positions[j][i]);
        }
    }
    if (!checkPos(newpos, currentPiece.start))
        currentPiece.positions = newpos;
}

function fctDown(piece){
    piece.axe.y += 1;
    for (let i = 0; i < 4; i++)
    {
        piece.positions[i].y += 1;
    }
}

function getCanevas(name) {
    const canvas = document.getElementById(name);
    const ctx = canvas.getContext('2d');
    return ctx;
}

function initMap() {
    const numRows = 20;
    const numCols = 10;

    const tab = new Array(numRows).fill().map(() => new Array(numCols).fill("#FFFFFF"));

    return tab;
}

function addInMap(map, piece){
    for (let i = 0; i < piece.positions.length; i++)
    {
        for (let j = 0; j < piece.positions[i].length; j++)
        {
            if (piece.start.y + i < 20 && piece.start.x + j < 10 && piece.start.x + j >= 0  && piece.positions[i][j] != "#FFFFFF")
                map[piece.start.y + i][piece.start.x + j] = piece.color;
        }
    }
}

function removeLine(map)
{
    let j = 0;
    for (let i = 0; i < map.length; i++)
    {
        for (j = 0; j < map[i].length; j++)
        {
            if (map[i][j] == "#FFFFFF")
                break;
        }
        if (j == map[i].length)
        {
            map.splice(i, 1);
            let newLine = new Array(10).fill("#FFFFFF");
            map.unshift(newLine);
            lines++;
        }
    }
}

let events = [];
const canvas = getCanevas("monCanevas");
const preview = getCanevas("preview");
const keep = getCanevas("keep");
const map = initMap();
let currentPiece = getNextPiece2();
let nextPiece = getNextPiece2();
let keepPiece;
let lines = 0;

function draw(){
    drawCanevas(canvas, map);
    drawPiece(canvas, currentPiece);
    drawShadow(canvas, currentPiece);
    drawPreview(preview, nextPiece);
    console.log(keep, keepPiece);
    if (typeof keepPiece !== "undefined")
        drawPreview(keep, keepPiece);

}

function fallPiece(game)
{
    setInterval(() => {
      events.push("drop");
    }, 600);
}
function myEvent(){
    document.body.addEventListener("keydown", function(event, ){
        const listen = ["ArrowLeft", "ArrowDown", "ArrowUp","ArrowRight", "a", "d", " "];
        if (listen.find((key) => key == event.key) != undefined)
            events.push(event.key);
    })}

function checkPos(positions, newpos)
{
    let error = false;
    for (let i = 0; i < positions.length; i++)
    {
        for (let j = 0; j < positions[i].length; j++)
        {
            if (positions[i][j] != "#FFFFFF" && (newpos.y + i > 19 || newpos.x + j > 10 || newpos.x + j < 0 || map[newpos.y + i][newpos.x + j] != "#FFFFFF"))
                error = true;
        }
    }
    return (error);
}

function fctDrop(piece, shaddow)
{
    console.log(t);
    console.log(t.map);
    let newy;
    let error = false;
    let newpos = {x: piece.start.x, y: piece.start.y + 1};
    error = checkPos(piece.positions, newpos, t.map);
    if (error)
    {
        if (!shaddow)
        {
            addInMap(map, piece);
            currentPiece = nextPiece;
            nextPiece = getNextPiece2();
        }
        return (false);
    }
    else
    piece.start = newpos;
    return (true);
}

function switchPiece()
{
    let tmp = currentPiece;
    if (typeof keepPiece != "undefined" /*&& checkPos(keepPiece, keepPiece.start)*/)
    {
        currentPiece = keepPiece;
        keepPiece = tmp;
    }
    else
    {
        keepPiece = currentPiece;
        currentPiece = nextPiece;
        nextPiece = getNextPiece2();
    }
}

function lateralMove(dir)
{
    let newx;
    let newpos = {x: currentPiece.start.x + dir , y: currentPiece.start.y};
    let error = checkPos(currentPiece.positions, newpos);
    if (!error)
        currentPiece.start = newpos;
}

fallPiece();
myEvent();
let lastSize = 0;
function loop()
{
    console.log(currentPiece);
    let size = events.length;
    lastSize = size
    let move = events.shift();
    if (move == "drop")
        fctDrop(currentPiece, 0);
    if (move == "ArrowDown")
    {
        fctDrop(currentPiece, 0);
        fctDrop(currentPiece, 0);
    }
    if (move == "ArrowRight")
        lateralMove(+1);
    if (move == "ArrowLeft")
        lateralMove(-1);
    if (move == "a" || move == "d" || move == "ArrowUp")
        fctRotate(move);
    if (move == " ")
        switchPiece();
    removeLine(map);
    document.getElementById("lines").innerText = lines;
    draw();
    requestAnimationFrame(loop);
}
loop();
const piece = {
    position:[],
    movable:true,
    rotate: function(direction) {},
    down: function(speed) {},
    color: "#0"
};

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
    let newpos =  new Array(4);
    let col = currentPiece.width - 1;
    for (let i = 0; i < currentPiece.positions.length; i++)
    {
        newpos[i] = [];
        for (let j = 0; j < currentPiece.positions[i].length; j++)
        {
            // console.log("col == ", col);
            // console.log("j == ", j);
            // console.log("current pos ", currentPiece.positions[j][col]);
            newpos[i].push(currentPiece.positions[j][col]);
        }
        col--
    }
    // console.log(newpos.length);
    // console.log(newpos[0].length);
    currentPiece.positions = newpos;
    // console.log(currentPiece.positions.length);
    // console.log(currentPiece.positions[0].length);
    // console.log(currentPiece);
    // console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
}


function fctDown(piece){
    piece.axe.y += 1;
    for (let i = 0; i < 4; i++)
    {
        piece.positions[i].y += 1;
    }
}

function getCanevas() {
    const canvas = document.getElementById('monCanevas');
    const ctx = canvas.getContext('2d');
    return ctx;
}

function initMap() {
    const numRows = 20;
    const numCols = 10;

    const tab = new Array(numRows).fill().map(() => new Array(numCols).fill("#FFFFFF"));

    return tab;
}


function getNextPiece(){
    let piece = [{
        positions: [{x:5,y:0},{x:4,y:0},{x:4,y:1},{x:4,y:2}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#7F00FF",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:3,y:0},{x:4,y:1},{x:4,y:2}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#00FF00",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#0000FF",
        movable: true
    },
    {
        positions: [{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:4,y:0}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#FF0000",
        movable: true
    },
    {
        positions: [{x:3,y:0},{x:3,y:1},{x:4,y:0},{x:4,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#FFD700",
        movable: true
    },
    {
        positions: [{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:5,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  "#808080",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:5,y:0},{x:3,y:1},{x:4,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        color:  " #ED7F10",
        movable: true
    }];
    return (piece[Math.round(Math.random()*10)%7]);
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
        }
    }
}

let allowTimeout = true;

function tetriminoI(){
    const piece = {
        width: 4,
        color: "#0000FF",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[0][1] = piece.color;
    piece.positions[1][1] = piece.color;
    piece.positions[2][1] = piece.color;
    piece.positions[3][1] = piece.color;
    return (piece);
}

function tetriminoO(){
    const piece = {
        width: 2,
        color: "#FFD700",
        start: {x: 4, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    // console.log(piece.positions.length);
    // console.log(piece.positions[0].length);
    // console.log(piece);
    piece.positions[0][0] = piece.color;
    piece.positions[0][1] = piece.color;
    piece.positions[1][0] = piece.color;
    piece.positions[1][1] = piece.color;
    return (piece);
}

function tetriminoT(){
    const piece = {
        width: 4,
        color: "#FF0000",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[1][2] = piece.color;
    piece.positions[1][1] = piece.color;
    piece.positions[1][0] = piece.color;
    piece.positions[0][1] = piece.color;
    return (piece);
}

function tetriminoL(){
    const piece = {
        width: 4,
        color: "#7F00FF",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[1][0] = piece.color;
    piece.positions[0][0] = piece.color;
    piece.positions[0][1] = piece.color;
    piece.positions[0][2] = piece.color;
    return (piece);
}

function tetriminoJ(){
    const piece = {
        width: 4,
        color: "#00FF00",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[0][2] = piece.color;
    piece.positions[1][0] = piece.color;
    piece.positions[1][1] = piece.color;
    piece.positions[1][2] = piece.color;
    return (piece);
}

function tetriminoS(){
    const piece = {
        width: 4,
        color: "#ED7F10",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[0][1] = piece.color;
    piece.positions[0][2] = piece.color;
    piece.positions[1][0] = piece.color;
    piece.positions[1][1] = piece.color;
    return (piece);
}

function tetriminoZ(){
    const piece = {
        width: 4,
        color: "#808080",
        start: {x: 3, y: 0},
        positions: []
    };
    piece.positions = new Array(piece.width).fill().map(() => new Array(piece.width).fill("#FFFFFF"))
    piece.positions[0][0] = piece.color;
    piece.positions[0][1] = piece.color;
    piece.positions[1][1] = piece.color;
    piece.positions[1][2] = piece.color;
    return (piece);
}

function getNextPiece2(){
    const fctPiece = [tetriminoI, tetriminoO, tetriminoT, tetriminoL, tetriminoJ, tetriminoS, tetriminoZ]
    return (fctPiece[Math.round(Math.random()*10)%7]());
}



time = performance.now();
let events = [];
const canvas = getCanevas();
const map = initMap();
let currentPiece = getNextPiece2();
let nextPiece = getNextPiece2();

console.log(currentPiece);

function draw(){
    drawCanevas(canvas, map);
    drawPiece(canvas, currentPiece);
    drawShadow(canvas, currentPiece);
}

function fallPiece(game)
{
    setInterval(() => {
      events.push("drop");
    }, 600);
}
function myEvent(){
    document.body.addEventListener("keydown", function(event, ){
        const listen = ["ArrowLeft", "ArrowDown", "ArrowUp","ArrowRight", "a", "d"];
        if (listen.find((key) => key == event.key) != undefined)
            events.push(event.key);
    })}

function checkPos(piece, newpos)
{
    let error = false;
    //console.log("piece 1", piece);
    //console.log(piece.positions.length);
    //console.log(piece.positions[0].length);
    for (let i = 0; i < piece.positions.length; i++)
    {
        for (let j = 0; j < piece.positions.length; j++)
        {
            //console.log("i == ", i, " j == ", j);
            if (piece.positions[i][j] != "#FFFFFF" && (newpos.y + i > 19 || newpos.x + j > 10 || newpos.x + j < 0 || map[newpos.y + i][newpos.x + j] != "#FFFFFF"))
                error = true;
        }
    }
    //console.log("piece 2", piece);
    return (error);
}

function fctDrop(piece, shaddow)
{
    let newy;
    let error = false;
    let newpos = {x: piece.start.x, y: piece.start.y + 1};
    error = checkPos(piece, newpos);
    if (error /*|| !allowedMove(newpos, piece)*/)
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

function lateralMove(dir)
{
    let newx;
    let newpos = {x: currentPiece.start.x + dir , y: currentPiece.start.y};
    let error = checkPos(currentPiece, newpos);
    if (!error)
        currentPiece.start = newpos;
}

fallPiece();
myEvent();
let lastSize = 0;
function loop()
{
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
    if (move == "a" || move == "d")
        fctRotate(move);
    removeLine(map);
    draw();
    requestAnimationFrame(loop);
}
loop();
// // Créer le tableau 2D
// var tableau = new Array(20);
// for (var i = 0; i < tableau.length; i++) {
//     tableau[i] = new Array(10);
// }

// // Remplir chaque case avec une couleur aléatoire
// for (var i = 0; i < tableau.length; i++) {
//     for (var j = 0; j < tableau[i].length; j++) {
//         // Générer une couleur aléatoire
//         tableau[i][j] = "#FFFFFF";
//     }
// }

// // Obtenir le contexte du canevas
// var canvas = document.getElementById('monCanevas');
// var ctx = canvas.getContext('2d');

// for (var y = 0; y < tableau.length; y++) {
//     for (var x = 0; x < tableau[y].length; x++) {
//         ctx.fillStyle = tableau[y][x];
//         console.log("i == ",y);
//         console.log("x == ",j);
//         ctx.fillRect(x * 40, y * 40, 40, 40);//taille d'une case
//     }
// }

const piece = {
    position:[],
    movable:true,
    rotate: function(direction) {},
    down: function(speed) {},
    color: "#0"
};

function drawCanevas(canvas, map){
    //console.log('canevas');
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            canvas.fillStyle = map[y][x];
            canvas.fillRect(x * 40, y * 40, 40, 40);//taille d'une case
        }
    }
}

function drawPiece(canvas, piece){
    //console.log('piece', piece);
    //console.log('canevas', canvas);
    //console.log(piece.positions.length);
    for (let x = 0; x < piece.positions.length; x++) {
        canvas.fillStyle = piece.color;
        //console.log(piece.color);
        //console.log(piece.positions[x].x , piece.positions[x].y );
       // console.log(piece.positions[x].x * 40 , piece.positions[x].y * 40 );
        canvas.fillRect(piece.positions[x].x * 40, piece.positions[x].y * 40, 40, 40);//taille d'une case
    }
}

function fctRotate(direction, piece){
   console.log(direction);
   console.log(piece);
}

function fctDown(speed, piece){
   // console.log(speed);
   // console.log(piece);
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
    return ({
            positions: [{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}],
            axe: {x: 4, y:1.5},
            rotateFunction: fctRotate,
            color:  "#FF0000",
            movable: true
        });
}


// const curPiece = new piece({
//     positions: [{x:19,y:5},{x:18,y:5},{x:17,y:5},{x:16,y:5}],
//     rotateFunction: fctRotate,
//     downFunction: fctDown
// });

function isValid(piece, map){
   // console.log("piece", piece);
    for (let i = 0; i < piece.positions.length; i++)
    {
       // console.log(piece.positions[i].y, piece.positions[i].x);
        // console.log(map[piece.positions[i].y][piece.positions[i].x]);
        if (piece.positions[i].y > 19 || map[piece.positions[i].y][piece.positions[i].x] != "#FFFFFF")
            return false;
    }
    return true;
}

function addInMap(map, piece){
   // console.log("piece", piece);
    for (let i = 0; i < piece.positions.length; i++)
    {
       // console.log(piece.positions[i].y, piece.positions[i].x);
        map[piece.positions[i].y-1][piece.positions[i].x] = piece.color;
    }
}

function removeLine(map, line)
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
            console.log("i ==", i);
            map.splice(i, 1);
            let newLine = new Array(10).fill("#FFFFFF");
            map.unshift(newLine);
            line+=1;
            console.log("line", line);
        }
    }
}

let allowTimeout = true;

const game = {
    canevas: getCanevas(),
    //downFunction: fctDown,
    map: initMap(),
    nextPiece: getNextPiece(),
    currentPiece: getNextPiece(),
    nbPiece:0,
    line:0,
    draw: function(){
        drawCanevas(this.canevas, this.map);
        drawPiece(this.canevas, this.currentPiece);
    },
    move: function(){
        const self = this;
        document.body.addEventListener("keydown", function(event, ){
        allowTimeout = false;
        //console.log(event.key)
        //console.log(self.currentPiece);
        if (event.key == "a" || event.key == "d")
        {
            fctRotate(event.key, self.currentPiece);
        }
        if (event.key == "ArrowLeft")
        {
            for (let i = 0; i < self.currentPiece.positions.length; i++)
            {
                if (self.currentPiece.positions[i].x > 0)
                    self.currentPiece.positions[i].x -= 1;
            }
        }
        if (event.key == "ArrowRight")
        {
            for (let i = 0; i < self.currentPiece.positions.length; i++)
            {
                //console.log("in event", self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1]);
                //console.log("in event", self.map[self.currentPiece.positions[i].y+1][self.currentPiece.positions[i].x]);
                if (self.currentPiece.movable && self.currentPiece.positions[i].x < 9 /* || self.map[self.currentPiece.positions[i].y + 1][self.currentPiece.positions[i].x] == "#FFFFFF"*/)
                    self.currentPiece.positions[i].x += 1;
            }
        }
        allowTimeout = true;
    })},
    fall: function (speed){
        const intervalId = setInterval(() => {
            console.log("line", this.line);
            while (allowTimeout == false)
                ;
            fctDown(speed, this.currentPiece);
            if (isValid(this.currentPiece, this.map))
                this.draw();
            else
            {
                //this.currentPiece.movable = false
                addInMap(this.map, this.currentPiece)
                removeLine(this.map, this.line);
                console.log("line ",this.line);
                this.currentPiece = this.nextPiece;
                this.nextPiece = getNextPiece();
                this.nbPiece +=1;
            }
        }, 300);
    },
    start: function(){
       // console.log("coucou");
        //console.log(this.canevas);
        this.draw()
        this.move();
        this.fall();
    }
};

game.start();

// piece.startFalling(1); // dans l'objet game





// startFalling: function(speed) {
//     const intervalId = setInterval(() => {
//         this.down(speed);
//     }, 1000); // Appel de la méthode down toutes les 1000 millisecondes (1 seconde)
// }

[{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}]
[{x:3,y:2},{x:4,y:2},{x:5,y:2},{x:6,y:2}]
[{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1}]

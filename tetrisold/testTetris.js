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

// function fctRotate(piece){
    //     console.log(piece);
    //     for (let i = 0; i < piece.positions.length; i++)
    //     {
        //         tmpx = piece.positions[i].x;
//         tmpy = piece.positions[i].y;
//         tmpx -= piece.axe.x;
//         tmpy -= piece.axe.y;
//         piece.positions[i].x = tmpx * Math.cos(piece.angle * (Math.PI / 180)) - tmpy * Math.sin(piece.angle * (Math.PI / 180));
//         piece.positions[i].y = tmpy * Math.sin(piece.angle * (Math.PI / 180)) + tmpx * Math.cos(piece.angle * (Math.PI / 180)); 
//         piece.positions[i].x += piece.axe.x;
//         piece.positions[i].y += piece.axe.y;
//         Math.round(piece.positions[i].x);
//         Math.round(piece.positions[i].y);
//     }
//     console.log(piece);
//     console.log("angle ", piece.angle);
// }

// function fctRotate(piece) {
//     console.log(piece);
//     for (let i = 0; i < piece.positions.length; i++) {
//         let tmpx = piece.positions[i].x;
//         let tmpy = piece.positions[i].y;
//         tmpx -= piece.axe.x;
//         tmpy -= piece.axe.y;
//         const newX = tmpx * Math.cos(piece.angle * (Math.PI / 180)) - tmpy * Math.sin(piece.angle * (Math.PI / 180));
//         const newY = tmpy * Math.sin(piece.angle * (Math.PI / 180)) + tmpx * Math.cos(piece.angle * (Math.PI / 180)); 
//         piece.positions[i].x = newX + piece.axe.x;
//         piece.positions[i].y = newY + piece.axe.y;
//         // piece.positions[i].x = Math.round(piece.positions[i].x);
//         // piece.positions[i].y = Math.round(piece.positions[i].y);
//     }
//     console.log(piece);
//     console.log("angle ", piece.angle);
// }
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

function fctRotate(piece) {
    //console.log("''''''''''''''''''''''''''''''''''''''''''", piece);
//     for (let i = 0; i < piece.positions.length; i++) {
//         let tmpx = piece.positions[i].y + (piece.axe.x - piece.axe.y);
//         let tmpy = piece.positions[i].x + (piece.axe.y - piece.axe.x);
//         piece.positions[i].x = tmpx;
//         piece.positions[i].y = tmpy;
//     }
//     console.log(piece);
    let tmp = [];
    console.log("angle ", piece.angle);
    for (let i = 0; i < piece.positions.length; i++) {
        let tmpx, tmpy;
        if (piece.angle === 90 || piece.angle === 180) { 
            tmpx = piece.positions[i].y + (piece.axe.x - piece.axe.y);
            tmpy = piece.positions[i].x + (piece.axe.y - piece.axe.x);
        } else if (piece.angle === 270 || piece.angle === 0) { 
            tmpx = piece.axe.x * 2 - piece.positions[i].x;
            tmpy = piece.axe.y * 2 - piece.positions[i].y;
        }
        if (tmpx < 10 && tmpx > 0 && tmpy > 0 && tmpy < 20)
            tmp.push({x:tmpx, y:tmpy});
    }
}


function fctDown(piece){
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
    let piece = [{
        positions: [{x:5,y:0},{x:4,y:0},{x:4,y:1},{x:4,y:2}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#7F00FF",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:3,y:0},{x:4,y:1},{x:4,y:2}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#00FF00",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#0000FF",
        movable: true
    },
    {
        positions: [{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:4,y:0}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#FF0000",
        movable: true
    },
    {
        positions: [{x:3,y:0},{x:3,y:1},{x:4,y:0},{x:4,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#FFD700",
        movable: true
    },
    {
        positions: [{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:5,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  "#808080",
        movable: true
    },
    {
        positions: [{x:4,y:0},{x:5,y:0},{x:3,y:1},{x:4,y:1}],
        axe: {x: 3.5, y:1.5},
        angle: 0,
        rotateFunction: fctRotate,
        color:  " #ED7F10",
        movable: true
    }];
    console.log("rand = ", Math.round(Math.random()*10)%7);
    return (piece[Math.round(Math.random()*10)%7]);
}


// const curPiece = new piece({
//     positions: [{x:19,y:5},{x:18,y:5},{x:17,y:5},{x:16,y:5}],
//     rotateFunction: fctRotate,
//     downFunction: fctDown
// });


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
            //console.log("i ==", i);
            map.splice(i, 1);
            let newLine = new Array(10).fill("#FFFFFF");
            map.unshift(newLine);
            line+=1;
           // console.log("line", line);
        }
    }
}

let allowTimeout = true;

// const game = {
//     canevas: getCanevas(),
//     //downFunction: fctDown,
//     map: initMap(),
//     nextPiece: getNextPiece(),
//     currentPiece: getNextPiece(),
//     moved:0,
//     nbPiece:0,
//     line:0,
//     draw: function(){
//         drawCanevas(this.canevas, this.map);
//         drawPiece(this.canevas, this.currentPiece);
//     },
//     move: function(self){
//         document.body.addEventListener("keydown", function(event, ){
//         allowTimeout = false;
//        // console.log(event.key)
//        // console.log(self.currentPiece);
//         if (event.key == "a" || event.key == "d")
//         {
//             self.moved = 1;
//             if (event.key == "a")
//                 self.currentPiece.angle -= 90;
//             else
//                 self.currentPiece.angle += 90;
//            // console.log("angle", self.currentPiece.angle);
//             if (self.currentPiece.angle > 359)
//                 self.currentPiece.angle -= 360;
//             else if (self.currentPiece.angle < 0)
//                 self.currentPiece.angle += 360;
//             //console.log("angle", self.currentPiece.angle);
//         }
//         if (event.key == "ArrowLeft")
//         {
//             for (let i = 0; i < self.currentPiece.positions.length; i++)
//             {
//                 if (self.currentPiece.positions[i].x > 0)
//                     self.currentPiece.positions[i].x -= 1;
//             }
//         }
//         if (event.key == "ArrowRight")
//         {
//             for (let i = 0; i < self.currentPiece.positions.length; i++)
//             {
//                 //console.log("in event", self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1]);
//                 //console.log("in event", self.map[self.currentPiece.positions[i].y+1][self.currentPiece.positions[i].x]);
//                 if (self.currentPiece.movable && self.currentPiece.positions[i].x < 9 /* || self.map[self.currentPiece.positions[i].y + 1][self.currentPiece.positions[i].x] == "#FFFFFF"*/)
//                     self.currentPiece.positions[i].x += 1;
//             }
//         }
//        // console.log("angle fin event", self.currentPiece.angle);
//         allowTimeout = true;
//     })},
//     fall: function (speed){
//         setInterval(() => {
//            // console.log("line", this.line);
//             while (allowTimeout == false)
//                 ;
//             fctDown(speed, this.currentPiece);
//             //console.log("piece", this.currentPiece);
//             if (this.moved)
//             {
//                 console.log("//////////////////////////////////////////////////////////////////");
//                 fctRotate(this.currentPiece);
//                 this.moved = 0;
//             }
//             if (isValid(this.currentPiece, this.map))
//                 this.draw();
//             else
//             {
//                 addInMap(this.map, this.currentPiece)
//                 removeLine(this.map, this.line);
//                // console.log("line ",this.line);
//                 this.currentPiece = this.nextPiece;
//                 this.id++;
//                 this.nextPiece = getNextPiece(this.id);
//                 this.nbPiece +=1;
//             }
//             console.log("angle", this.currentPiece.angle);
//            // console.log("game", this);
//         },300);
//     },
//     start: function(){
//         this.draw()
//         this.fall();
//     }
// };

// game.move(game);


// // function display()
// // {
// //     game.draw();
// //     requestAnimationFrame(display);
// // }
// // display();
// game.start();






// startFalling: function(speed) {
//     const intervalId = setInterval(() => {
//         this.down(speed);
//     }, 1000); // Appel de la méthode down toutes les 1000 millisecondes (1 seconde)
// }

// [{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3}]
// [{x:3,y:2},{x:4,y:2},{x:5,y:2},{x:6,y:2}]
// [{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1}]
// [{x:5,y:0},{x:5,y:1},{x:5,y:2},{x:5,y:3}]

// floodfill(char **tab, startx, starty)
// (
//     floodfill()
//     floodfill()
//     floodfill()
//     floodfill()
// )

// 000
// 999


// sans timeinterval
const game = {
    canevas: getCanevas(),
    map: initMap(),
    nextPiece: getNextPiece(),
    currentPiece: getNextPiece(),
    moved:0,
    nbPiece:0,
    line:0,
    time: performance.now(),
    draw: function(){
        drawCanevas(this.canevas, this.map);
        drawPiece(this.canevas, this.currentPiece);
    },
    move: function(self){
        document.body.addEventListener("keydown", function(event, ){
        allowTimeout = false;
        if (event.key == "a" || event.key == "d")
        {
            self.moved = 1;
            if (event.key == "a")
                self.currentPiece.angle -= 90;
            else
                self.currentPiece.angle += 90;
           // console.log("angle", self.currentPiece.angle);
            if (self.currentPiece.angle > 359)
                self.currentPiece.angle -= 360;
            else if (self.currentPiece.angle < 0)
                self.currentPiece.angle += 360;
            //console.log("angle", self.currentPiece.angle);
        }
        let newpos=[];
        console.log("newpos 1 ", newpos);
        console.log(self.currentPiece);
        console.log("map ", self.map);
        if (event.key == "ArrowLeft")
        {
            for (let i = 0; i < self.currentPiece.positions.length; i++)
            {
                //console.log("in event", self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1]);
                //console.log("in event", self.map[self.currentPiece.positions[i].y+1][self.currentPiece.positions[i].x]);
                if (self.currentPiece.positions[i].x - 1 >= 0 && self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x-1] == "#FFFFFF" /* || self.map[self.currentPiece.positions[i].y + 1][self.currentPiece.positions[i].x] == "#FFFFFF"*/)
                    newpos.push({x:self.currentPiece.positions[i].x - 1, y:self.currentPiece.positions[i].y});
            }
            console.log(newpos);
            if (newpos.length == 4)
                self.currentPiece.positions = newpos;
        }
        if (event.key == "ArrowRight")
        {
            for (let i = 0; i < self.currentPiece.positions.length; i++)
            {
               // console.log("in event", self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1]);
               console.log("x + 1 ", self.currentPiece.positions[i].x + 1 );
               console.log("y ", self.currentPiece.positions[i].y );
                console.log("in event", self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1]);
                if (self.currentPiece.positions[i].x + 1 < 10 && self.map[self.currentPiece.positions[i].y][self.currentPiece.positions[i].x+1] == "#FFFFFF" /* || self.map[self.currentPiece.positions[i].y + 1][self.currentPiece.positions[i].x] == "#FFFFFF"*/)
                    newpos.push({x:self.currentPiece.positions[i].x + 1, y:self.currentPiece.positions[i].y});
            }
            console.log("newpos 2 ", newpos);
            if (newpos.length == 4)
                self.currentPiece.positions = newpos;
        }
       // console.log("angle fin event", self.currentPiece.angle);
        allowTimeout = true;
        // clearInterval(fallPiece);
        // fallPiece();
    })},
    fall: function (speed){
        // console.log("perf now ", performance.now());
        // console.log("game time ", game.time);
        // let end = performance.now();
        // console.log("dif", (end - game.time));
        // if ((end - game.time) > 17)
        // {
        //     while (allowTimeout == false)
        //         ;
        //     fctDown(speed, game.currentPiece);
        //     if (game.moved)
        //     {
        //         fctRotate(game.currentPiece);
        //         game.moved = 0;
        //     }
        //     if (isValid(game.currentPiece, game.map))
        //         game.draw();
        //     else
        //     {
        //         addInMap(game.map, game.currentPiece)
        //         removeLine(game.map, game.line);
        //         game.currentPiece = game.nextPiece;
        //         game.id++;
        //         game.nextPiece = getNextPiece(game.id);
        //         game.nbPiece += 1;
        //     }
        // }
            //console.log(game.nbPiece);
        game.draw();
        game.time = performance.now();
        requestAnimationFrame(game.fall);
        },
    start: function(){
        this.fall();
        this.move(this);
    }
};

function fallPiece(game)
{
    setInterval(() => {
        while (allowTimeout == false)
        ;
    fctDown(game.currentPiece);
    if (game.moved)
    {
        fctRotate(game.currentPiece);
        game.moved = 0;
    }
    if (isValid(game.currentPiece, game.map))
        game.draw();
    else
    {
        addInMap(game.map, game.currentPiece)
        removeLine(game.map, game.line);
        game.currentPiece = game.nextPiece;
        game.id++;
        game.nextPiece = getNextPiece(game.id);
        game.nbPiece += 1;
    }}, 200);
}
fallPiece(game);
game.time = performance.now();
game.start();
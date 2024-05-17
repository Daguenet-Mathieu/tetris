
function getCanevas(name) {
    const canvas = document.getElementById(name);
    console.log(canvas.width);
    const ctx = canvas.getContext('2d');
    return ctx;
}

const   canvas = getCanevas("Pong");
let     paddles = {height:75, width:20, coorr: [{x: 0, y:100},{x: 1000-20, y:100}],move:[{up:0, down:0},{up:0, down:0}]};

const speed = 2;
console.log(canvas);

document.body.addEventListener("keydown", function(event){
    console.log(event);
    if (event.key == "w")
        paddles.move[0].up = 1;
    else if (event.key == "s")
        paddles.move[0].down = 1;
    else if (event.key == "ArrowUp")
        paddles.move[1].up = 1;
    else if (event.key == "ArrowDown")
        paddles.move[1].down = 1;
})

document.body.addEventListener("keyup", function(event){
    console.log(event);
    if (event.key == "w")
        paddles.move[0].up = 0;
    else if (event.key == "s")
        paddles.move[0].down = 0;
    else if (event.key == "ArrowUp")
        paddles.move[1].up = 0;
    else if (event.key == "ArrowDown")
        paddles.move[1].down = 0;
})

let ball = {x:500, y:150};
let dir = 20;

function display()
{
    //console.log(paddles);
    canvas.fillStyle = "#FFFFFF";
    canvas.fillRect(0, 0, 1000, 300);
    if (paddles.move[0].up == 1 && paddles.coorr[0].y >=0)
        paddles.coorr[0].y -= speed;
    if (paddles.move[0].down == 1 && paddles.coorr[0].y < 300 - 75)
        paddles.coorr[0].y += speed;    
    if (paddles.move[1].up == 1 && paddles.coorr[1].y >=0)
        paddles.coorr[1].y -= speed;
    if (paddles.move[1].down == 1&& paddles.coorr[1].y < 300 - 75)
        paddles.coorr[1].y += speed;
    canvas.beginPath();
    canvas.arc(ball.x, ball.y, 15, 0, 2 * Math.PI);
    canvas.fillStyle = "green";
    canvas.fill();
    canvas.fillStyle = "#FF0000";
    canvas.fillRect(paddles.coorr[0].x, paddles.coorr[0].y, paddles.width, paddles.height);
    canvas.fillRect(paddles.coorr[1].x, paddles.coorr[1].y, paddles.width, paddles.height);
    ball.x += dir;
    if (ball.x >= paddles.coorr[1].x - 20)
        dir = -dir
    if (ball.x <= paddles.coorr[0].x + 20 + 15)
        dir = -dir
    requestAnimationFrame(display);
}

display();
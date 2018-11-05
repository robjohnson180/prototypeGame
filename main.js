console.log('javascript');

var canvas = document.getElementById("PlayArea");
var nextCanvas = document.getElementById('NextPiece');
var context = canvas.getContext('2d');
var nextContext = nextCanvas.getContext('2d');

var lives = 3;
var nextBlock = null;
var block = null;

var gridX = [];
var gridY = [];

var grid = 20;

var paddle = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 20,
    width: 40,
    height: 4,
    moveLeft: false,
    moveRight: false,
    speed: 2
}

function createBall() {
    var b = {
        x: paddle.x,
        y: paddle.y - (paddle.height + 1),
        speed: 1.25,
        radius: 5,
        dx: -1,
        dy: 1
    }
    return b
}
var ball = createBall();


var tetrisBlocks = {
    startX: canvas.width / 2,
    startY: 0,
    currentX: this.startX,
    currentY: this.startY,
    currentCells: [],
    speed: 1,
    types: ['square', 'line', 'L', 'L2', 'stairsL', 'stairsR', 'T']
}
nextBlock = createPiece();
block = nextBlock;
nextBlock = createPiece();
function pickPiece() {
    var num = Math.floor(Math.random() * tetrisBlocks.types.length);
    console.log(tetrisBlocks.types[num]);
    return tetrisBlocks.types[num];
}

function createPiece() {
    var thisPiece = pickPiece();
    var tiles = {
        ax: tetrisBlocks.startX,
        ay: tetrisBlocks.startY,
        bx: 0,
        by: 0,
        cx: 0,
        cy: 0,
        dx: 0,
        dy: 0,
        color: '#ffffff'
    }
    switch (thisPiece) {
        case 'square':
            tiles.bx = tetrisBlocks.startX + grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;
            tiles.color = '#0859db';
            break;
        case 'line':
            tiles.bx = tetrisBlocks.startX;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + (grid * 2);
            tiles.dx = tetrisBlocks.startX;
            tiles.dy = tetrisBlocks.startY + (grid * 3);
            tiles.color = '#b56f07';
            break;
        case 'L':
            tiles.bx = tetrisBlocks.startX;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + (grid * 2);
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + (grid * 2);
            tiles.color = '#a308db';
            break;
        case 'L2':
            tiles.bx = tetrisBlocks.startX;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + (grid * 2);
            tiles.dx = tetrisBlocks.startX - grid;
            tiles.dy = tetrisBlocks.startY + (grid * 2);
            tiles.color = '#03aaad';
            break;
        case 'stairsR':
            tiles.bx = tetrisBlocks.startX - grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;
            tiles.color = '#dd9d9d';
            break;
        case 'stairsL':
            tiles.bx = tetrisBlocks.startX + grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX - grid;
            tiles.dy = tetrisBlocks.startY + grid;
            tiles.color = '#ada703';
            break;
        case 'T':
            tiles.bx = tetrisBlocks.startX - grid;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;
            tiles.color = '#06a30e';
            break;
        default:
            break;
    }
    return tiles;
}

document.onkeydown = function (press) {
    var key = press.keyCode;
    console.log(key);
    switch (key) {
        case 37:
            //left
            paddle.moveLeft = true;
            break;
        case 38:
            //up

            break;
        case 39:
            //right
            paddle.moveRight = true;
            break;
        case 40:
            //down

            break;
        case 65:
            //a
            //tetris left

            break;
        case 87:
            //w
            //rotate tetris block

            break;
        case 68:
            //d
            //tetris right

            break;
        case 83:
            //s
            //rotate tetris block

            break;
        default:
            console.log('invalid key');
            break;
    }
}
document.onkeyup = function (press) {
    var key = press.keyCode;
    console.log(key);
    switch (key) {
        case 37:
            //left
            paddle.moveLeft = false;
            break;
        case 38:
            //up

            break;
        case 39:
            //right
            paddle.moveRight = false;
            break;
        case 40:
            //down

            break;
        case 65:
            //a
            //tetris left
            block.ax -= grid;
            block.bx -= grid;
            block.cx -= grid;
            block.dx -= grid;
            break;
        case 87:
            //w
            //rotate tetris block

            break;
        case 68:
            //d
            //tetris right
            block.ax += grid;
            block.bx += grid;
            block.cx += grid;
            block.dx += grid;
            break;
        case 83:
            //s
            //rotate tetris block

            break;
        default:
            console.log('invalid key');
            break;
    }
}
requestAnimationFrame(draw);

function loseLife() {
    console.log('life lost');
    lives -= 1;
    if (lives <= 0) {
        console.log('game over');
        ball = null;
        return
    }
    ball = createBall();

}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = '#ffffff';
    context.fill();
    context.closePath();

    //var dir = Math.sqrt((dx * dx) + (dy * dy));
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;
    if (ball.y > (paddle.y - paddle.height / 2)) {
        if (ball.x > (paddle.x - paddle.width / 2) && ball.x < (paddle.x + paddle.width / 2)) {
            console.log('collide');
            ball.dy = -ball.dy;
        }
    }
    if (ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > (paddle.y + 10)) {
        loseLife();
    }
}

function draw() {
    if (ball != null) {
        if (paddle.moveLeft === true) {
            paddle.x -= paddle.speed;
            console.log('left')
        }
        else if (paddle.moveRight) {
            paddle.x += paddle.speed;
        }
        if (paddle.x - (paddle.width / 2) < 0) {
            paddle.x = 0 + paddle.width / 2;
        }
        if (paddle.x + (paddle.width / 2) > canvas.width) {
            paddle.x = canvas.width - paddle.width / 2;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Draw red box
        context.beginPath();
        context.rect(0, paddle.y + 10, canvas.width, canvas.height);
        context.fillStyle = '#ff2222';
        context.closePath();
        context.fill();

        //Draw health

        //Draw paddle
        context.beginPath();
        //context.lineWidth = '1';
        //context.strokeStyle = '#000000';
        context.rect(paddle.x - paddle.width / 2, paddle.y, paddle.width, paddle.height);
        context.fillStyle = '#ffffff';
        context.closePath();
        //context.stroke();
        context.fill();

        //draw ball
        drawBall();

        //TODO draw nexc block

        //context.fillStyle = nextBlock.color;

        //TODO draw tetris block

        context.fillStyle = block.color;
        context.fillRect(block.ax, block.ay, grid, grid);
        context.fillRect(block.bx, block.by, grid, grid);
        context.fillRect(block.cx, block.cy, grid, grid);
        context.fillRect(block.dx, block.dy, grid, grid);

        requestAnimationFrame(draw);
    }
}
console.log('javascript');

var canvas = document.getElementById("PlayArea");
var nextCanvas = document.getElementById('NextPiece');
var context = canvas.getContext('2d');
var nextContext = nextCanvas.getContext('2d');

var lives = 3;
var nextBlock = null;
var block = null;
var tetrisDelay = 20;
var currentDelay = 0;

var gridX = [];
var gridY = [];
var allBlocks = [];

var width = 20;
var height = 30;
var grid = 20;

var paddle = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 20,
    width: 40,
    height: 4,
    moveLeft: false,
    moveRight: false,
    speed: 2.5
}

function createBall() {
    var b = {
        x: paddle.x,
        y: paddle.y - (paddle.height + 1),
        speed: 3,
        radius: 5,
        dx: -1,
        dy: 1
    }
    return b
}
var ball = createBall();

var healthBar = {
    width: nextCanvas.width/3,
    height: 20,
    color: '#c60909',
    x: 0,
    y: 0
}

var tetrisBlocks = {
    startX: canvas.width / 2,
  //  startX: Math.floor(Math.random()*20)*grid,
    startY: 0,
    currentX: this.startX,
    currentY: this.startY,
    currentCells: [],
    speed: 1,
    types: ['square', 'line', 'L', 'J', 'Z', 'S', 'T']
}

/*TEST
var board = document.getElementsByClassName('tetris-board')[0];
board.innerHTML = '';
var counter = 0;
for (var y = 0; y < height; y++) {
    var row = document.createElement('div');
    row.className = 'row';
    row.dataset.row = y;

    for (var x = 0; x < width; x++) {
        var block = document.createElement('div');
        block.className = 'block';
        block.dataset.x = x;
        block.dataset.y = y;
        block.dataset.index = counter;
        block.dataset.state = 0;
        block.innerHTML = '0 : ' + counter;
        row.appendChild(block);
        counter++;
    }
    board.appendChild(row);
}

END OF TEST*/

currentBlock = createPiece();
//block = nextBlock;
//nextBlock = createPiece();
function pickPiece() {
    var num = Math.floor(Math.random() * tetrisBlocks.types.length);
    console.log(tetrisBlocks.types[num]);
    return tetrisBlocks.types[num];
}

function createPiece() {
    var thisPiece = pickPiece();
    var tiles = {
        /*ax: tetrisBlocks.startX,
        ay: tetrisBlocks.startY,
        bx: 0,
        by: 0,
        cx: 0,
        cy: 0,
        dx: 0,
        dy: 0,*/
        shape: [],
        color: '#ffffff',
        location: [Math.floor(Math.random() * 20) * grid, 0],
        //indexes: getBlock
    }
    switch (thisPiece) {
        case 'square':
            /*tiles.bx = tetrisBlocks.startX + grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;*/
            tiles.shape = [[0, 0], [0, grid], [grid, 0], [grid, grid]];
            tiles.color = '#0859db';
            break;
        case 'line':
            /*tiles.bx = tetrisBlocks.startX;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + (grid * 2);
            tiles.dx = tetrisBlocks.startX;
            tiles.dy = tetrisBlocks.startY + (grid * 3);*/
            tiles.shape = [[0, 0], [0, grid], [0, grid * 2], [0, grid * 3]];
            tiles.color = '#b56f07';
            break;
        case 'L':
            /* tiles.bx = tetrisBlocks.startX;
             tiles.by = tetrisBlocks.startY + grid;
             tiles.cx = tetrisBlocks.startX;
             tiles.cy = tetrisBlocks.startY + (grid * 2);
             tiles.dx = tetrisBlocks.startX + grid;
             tiles.dy = tetrisBlocks.startY + (grid * 2);*/
            tiles.shape = [[0, 0], [0, grid], [0, grid * 2], [grid, grid * 2]];
            tiles.color = '#a308db';
            break;
        case 'J':
            /*tiles.bx = tetrisBlocks.startX;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + (grid * 2);
            tiles.dx = tetrisBlocks.startX - grid;
            tiles.dy = tetrisBlocks.startY + (grid * 2);*/
            tiles.shape = [[0, 0], [0, grid], [0, grid * 2], [-grid, grid * 2]];
            tiles.color = '#03aaad';
            break;
        case 'S':
            /*tiles.bx = tetrisBlocks.startX - grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;*/
            tiles.shape = [[0, 0], [0, grid], [grid, 0], [-grid, grid]];
            tiles.color = '#dd9d9d';
            break;
        case 'Z':
            /*tiles.bx = tetrisBlocks.startX + grid;
            tiles.by = tetrisBlocks.startY;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX - grid;
            tiles.dy = tetrisBlocks.startY + grid;*/
            tiles.shape = [[0, 0], [-grid, 0], [0, grid], [grid, grid]];
            tiles.color = '#ada703';
            break;
        case 'T':
            /*tiles.bx = tetrisBlocks.startX - grid;
            tiles.by = tetrisBlocks.startY + grid;
            tiles.cx = tetrisBlocks.startX;
            tiles.cy = tetrisBlocks.startY + grid;
            tiles.dx = tetrisBlocks.startX + grid;
            tiles.dy = tetrisBlocks.startY + grid;*/
            tiles.shape = [[0, 0], [0, grid], [-grid, 0], [grid, 0]];
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
            /*block.ax -= grid;
            block.bx -= grid;
            block.cx -= grid;
            block.dx -= grid;*/
            /*if (currentBlock.shape === 'line' || currentBlock.shape === 'square' || currentBlock.shape==='L') {
                if (currentBlock.location[0] > 0) {
                    currentBlock.location[0] -= grid;
                }
            }
            else {
                if (currentBlock.location[0] > 20) {
                    currentBlock.location[0] -= grid;
                }
            }*/
            for (var i = 0; i < currentBlock.shape.length; i++) {
                console.log(currentBlock.shape[i][0] + (currentBlock.location[0]))
                if (currentBlock.shape[i][0] + (currentBlock.location[0]) === 0) {
                    return
                }
                else {
                    if (i === currentBlock.shape.length - 1) {
                        currentBlock.location[0] -= grid;
                    }
                }

            }

            break;
        case 87:
            //w
            //rotate tetris block

            break;
        case 68:
            //d
            //tetris right
            /*block.ax += grid;
            block.bx += grid;
            block.cx += grid;
            block.dx += grid;*/
            for (var i = 0; i < currentBlock.shape.length; i++) {
                console.log(currentBlock.shape[i][0] + (currentBlock.location[0]))
                if (currentBlock.shape[i][0] + (currentBlock.location[0]) === canvas.width - grid) {
                    return
                }
                else {
                    if (i === currentBlock.shape.length - 1) {
                        currentBlock.location[0] += grid;
                    }
                }

            }
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

function drawShape() {
    var shape = currentBlock.shape;
    var location = currentBlock.location;

    for (var i = 0; i < shape.length; i++) {
        var x = shape[i][0] + location[0];
        var y = shape[i][1] + location[1];
        //console.log(x);
        //console.log(y);
        //var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
        //console.log(block);
        //block.classList.add('filled');
        //block.style.backgroundColor = shape.color;
        context.beginPath();
        context.fillStyle = currentBlock.color;
        context.fillRect(x, y, grid, grid);
        context.closePath();
    }
    /*for (var a = 0; a < allBlocks.length; a++) {
        for (var b = 0; b < allBlocks[a].shape.length;b++) {
            var x = allBlocks[a].shape[a][0] + location[0];
            var y = allBlocks[a].shape[a][1] + location[1];
            //console.log(x);
            //console.log(y);
            //var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
            //console.log(block);
            //block.classList.add('filled');
            //block.style.backgroundColor = shape.color;
            context.beginPath();
            context.fillStyle = allBlocks[a].color;
            context.fillRect(x, y, grid, grid);
        }
    }*/
    if (tetrisDelay >= currentDelay) {
        currentDelay++;
        return
    }
    currentDelay = 0;
    for (var i = 0; i < currentBlock.shape.length; i++) {
        console.log(currentBlock.shape[i][1] + (currentBlock.location[1]))
        if (currentBlock.shape[i][1] + (currentBlock.location[1]) === canvas.height - grid) {
            allBlocks.push(currentBlock);
            currentBlock = createPiece();
            console.log(currentBlock);
            return
        }
        else {
            if (i === currentBlock.shape.length - 1) {
                currentBlock.location[1] += grid;
            }
        }

    }

    // console.log(currentBlock.shape);
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
    nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
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
        checkCollide();
        for (i = 0; i < currentBlock.shape.length; i++) {
            if (currentBlock.shape[i][0] + currentBlock.location[0] < 0) {
                currentBlock.location[0] += grid;
            }
            if (currentBlock.shape[i][0] + currentBlock.location[0] > canvas.width) {
                currentBlock.location[0] -= grid;
            }
        }
        //Draw red box
        context.beginPath();
        context.rect(0, paddle.y + 10, canvas.width, canvas.height);
        context.fillStyle = '#ff2222';
        context.closePath();
        context.fill();

        //Draw health
        nextContext.beginPath();
        nextContext.rect(healthBar.x, healthBar.y, healthBar.width * lives, healthBar.height);
        nextContext.fillStyle = healthBar.color;
        nextContext.closePath();
        nextContext.fill();

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
        drawShape();
        /*context.fillStyle = block.color;
        context.fillRect(block.ax, block.ay, grid, grid);
        context.fillRect(block.bx, block.by, grid, grid);
        context.fillRect(block.cx, block.cy, grid, grid);
        context.fillRect(block.dx, block.dy, grid, grid);*/

        requestAnimationFrame(draw);
    }
}
function checkCollide() {
    for (i = 0; i < currentBlock.shape.length; i++) {
        if ((currentBlock.shape[i][0]+currentBlock.location[0]>paddle.x&&currentBlock.shape[i][0]+currentBlock.location[0]<(paddle.x+width))&&currentBlock.shape[i][1]+currentBlock.location[1]>=paddle.y&&currentBlock.shape[i][1]+currentBlock.location[1]<=paddle.y) {
            loseLife();
            currentBlock = createPiece();
        }
    }
}
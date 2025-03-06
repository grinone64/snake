let score = 0;
const scoreElement = document.getElementById('score');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = { x: 0, y: 0 };

const flags = ['🇵🇱', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇯🇵', '🇨🇳', '🇧🇷', '🇦🇷', '🇦🇺', '🇨🇦', '🇮🇳', '🇲🇽'];

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    updateSnakePosition();
    checkCollision();
    clearCanvas();
    drawSnake();
    drawFood();
    
    // Check if snake ate food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10; // Increase score by 10 points
        scoreElement.textContent = `Score: ${score}`; // Update score display
        // Generate new food position and don't remove tail
        food = generateFood();
    } else {
        // Remove tail segment if food wasn't eaten
        snake.pop();
    }
    
    setTimeout(gameLoop, 100);
}

function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
}

function checkCollision() {
    // Check for collision with walls or self
    if (snake[0].x < 0 || snake[0].x >= canvas.width / gridSize || snake[0].y < 0 || snake[0].y >= canvas.height / gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            resetGame();
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'yellow'; // Change snake color to yellow
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.font = `${gridSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
        food.flag,
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2
    );
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -1;
    const goingDown = direction.y === 1;
    const goingRight = direction.x === 1;
    const goingLeft = direction.x === -1;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -1, y: 0 };
    } else if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -1 };
    } else if (keyPressed === 39 && !goingLeft) {
        direction = { x: 1, y: 0 };
    } else if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: 1 };
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize));
    const y = Math.floor(Math.random() * (canvas.height / gridSize));
    const flag = flags[Math.floor(Math.random() * flags.length)];
    return { x, y, flag };
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = { x: 0, y: 0 };
    score = 0; // Reset score
    scoreElement.textContent = 'Score: 0'; // Reset score display
    gameLoop();
}

resetGame();

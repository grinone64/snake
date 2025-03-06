let collectedFlags = [];
const scoreElement = document.getElementById('score');
const flags = ['🇵🇱', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇯🇵', '🇨🇳', '🇧🇷', '🇦🇷', '🇦🇺', '🇨🇦', '🇮🇳', '🇲🇽'];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = { x: 1, y: 0 }; // Initial direction: right

// Game loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100); // Adjust speed here
}

// Update game state
function update() {
    moveSnake();
    checkCollision();
    checkFood();
}

// Draw game elements
function draw() {
    clearCanvas();
    drawSnake();
    drawFood();
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add new head
    snake.pop(); // Remove tail
}

// Check for collisions
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Check if food was eaten
function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({}); // Add segment to snake
        food = generateFood(); // Generate new food
    }
}

// Generate food at a random position
function generateFood() {
    let food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
    return food;
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    food = generateFood();
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start the game
gameLoop();

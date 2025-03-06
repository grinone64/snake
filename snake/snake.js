const headImage = new Image();
headImage.src = 'head.png'; // Update with the correct path to head.png

let showDejText = false;
let dejTextTimeout;
let gameOver = false; // Add a variable to track game state

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

function drawSnake() {
    // Draw the snake's head with the image
    context.drawImage(headImage, snake[0].x, snake[0].y, box, box);
    
    // Draw the rest of the snake body
    for(let i = 1; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    drawSnake();
    
    // Draw DEJ if needed
    if (showDejText) {
        context.fillStyle = "green";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("DEJ!", canvas.width/2, 100);
    }
    
    // Update score
    scoreElement.textContent = "Score: " + score;
    
    // Display game over message if game is over
    if (gameOver) {
        gameOverElement.style.display = 'block';
    }
}

// Function to call when the snake scores a point
function onScorePoint() {
    showDejText = true;
    clearTimeout(dejTextTimeout);
    dejTextTimeout = setTimeout(() => {
        showDejText = false;
    }, 1000);
}

// Function to call when the game is over
function onGameOver() {
    gameOver = true;
    clearInterval(gameInterval); // Stop the game loop
}

// Call the onScorePoint function when the snake eats
function checkCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        onScorePoint(); // Add this line to show "DEJ" text
        // ...existing code...
    }
    
    // Check for collision with walls or itself
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        onGameOver(); // Game over if snake hits the wall
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            onGameOver(); // Game over if snake collides with itself
        }
    }
}

// Start the game loop
const gameInterval = setInterval(draw, 100);

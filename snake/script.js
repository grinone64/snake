import { displayMessage } from './message.js';

// ...existing code...

function drawSnake() {
    const snakeHead = document.getElementById('snakeHead');
    ctx.drawImage(snakeHead, snake[0].x * tileCount, snake[0].y * tileCount, tileSize, tileSize);
    
    // Draw rest of the snake body
    for(let i = 1; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x * tileCount, snake[i].y * tileCount, tileSize, tileSize);
    }
}

// ...existing code...

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        let img = new Image();
        if (i === 0) {
            // Snake head
            img.src = "img/head.png";
        } else {
            // Snake body - random flag
            let flagNumber = Math.floor(Math.random() * 6) + 1; // Assuming you have flag1.png to flag6.png
            img.src = `img/flag${flagNumber}.png`;
        }
        ctx.drawImage(img, snake[i].x, snake[i].y, box, box);
    }
    
    // Draw food
    // ...existing code...
}

// ...existing code...

function updateGame() {
    // ...existing code...
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
        };
        displayMessage(ctx, snakeX + box/2, snakeY, 'DEJ!');
    } else {
        snake.pop();
    }
    // ...existing code...
}

// ...existing code...

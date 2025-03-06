export function displayMessage(ctx, x, y, message) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(message, x, y);
    ctx.restore();
}

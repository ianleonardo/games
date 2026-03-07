export class Hammer {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 24;
        this.active = true; // Waiting to be picked up
    }

    draw(ctx) {
        if (!this.active) return;
        ctx.fillStyle = '#ffaa00'; // Handle
        ctx.fillRect(this.x + 6, this.y + 8, 4, 16);
        ctx.fillStyle = '#888888'; // Head
        ctx.fillRect(this.x, this.y, 16, 8);
    }
}

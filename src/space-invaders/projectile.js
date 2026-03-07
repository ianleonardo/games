export class Projectile {
    constructor(x, y, speed, isAlien) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 16;
        this.speed = speed;
        this.isAlien = isAlien;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        // Simple pixel per frame or time-based
        // Usually space invaders is fixed speed
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.isAlien ? '#ff3333' : '#00ff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

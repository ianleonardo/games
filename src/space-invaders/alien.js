import { Projectile } from './projectile.js';

export class Alien {
    constructor(game, x, y, type) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type; // 1: Octopus, 2: Crab, 3: Squid
        this.width = 30;
        this.height = 20;
        this.markedForDeletion = false;

        switch (type) {
            case 3: // Squid (top)
                this.score = 30;
                this.color = '#ff00ea';
                break;
            case 2: // Crab (middle)
                this.score = 20;
                this.color = '#00d2ff';
                break;
            default: // Octopus (bottom)
                this.score = 10;
                this.color = '#ffffff';
                break;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        // Simple pixel art approximations
        if (this.type === 3) { // Squid
            ctx.fillRect(this.x + 10, this.y, 10, 5);
            ctx.fillRect(this.x + 5, this.y + 5, 20, 5);
            ctx.fillRect(this.x, this.y + 10, 30, 5);
            // tentacles
            ctx.fillRect(this.x + 5, this.y + 15, 5, 5);
            ctx.fillRect(this.x + 20, this.y + 15, 5, 5);
        } else if (this.type === 2) { // Crab
            ctx.fillRect(this.x + 5, this.y, 20, 5);
            ctx.fillRect(this.x, this.y + 5, 30, 5);
            ctx.fillRect(this.x + 5, this.y + 10, 20, 5);
            ctx.fillRect(this.x, this.y + 15, 5, 5);
            ctx.fillRect(this.x + 25, this.y + 15, 5, 5);
        } else { // Octopus
            ctx.fillRect(this.x + 5, this.y, 20, 5);
            ctx.fillRect(this.x, this.y + 5, 30, 10);
            ctx.fillRect(this.x + 5, this.y + 15, 5, 5);
            ctx.fillRect(this.x + 20, this.y + 15, 5, 5);
        }
    }
}

export class MysteryShip {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 20;
        this.y = 50;
        this.speed = 100;
        this.markedForDeletion = false;

        // Randomly start left or right
        if (Math.random() < 0.5) {
            this.x = -this.width;
            this.direction = 1;
        } else {
            this.x = this.game.width;
            this.direction = -1;
        }

        this.score = Math.floor(Math.random() * 4 + 1) * 50; // 50, 100, 150, 200
    }

    update(deltaTime) {
        this.x += (this.speed * this.direction * deltaTime) / 1000;

        if (this.direction === 1 && this.x > this.game.width) this.markedForDeletion = true;
        if (this.direction === -1 && this.x < -this.width) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 10, this.y, 20, 5);
        ctx.fillRect(this.x + 5, this.y + 5, 30, 5);
        ctx.fillRect(this.x, this.y + 10, 40, 5);
        ctx.fillRect(this.x + 10, this.y + 15, 5, 5);
        ctx.fillRect(this.x + 25, this.y + 15, 5, 5);
    }
}

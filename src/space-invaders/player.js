import { Projectile } from './projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 20;
        // Start center bottom
        this.x = (this.game.width - this.width) / 2;
        this.y = this.game.height - this.height - 10;
        this.speed = 300; // pixels per second

        // Cooldown
        this.cooldown = 0;
        this.cooldownMax = 400; // ms between shots
    }

    update(deltaTime, input) {
        // Movement
        if (input.isLeft()) {
            this.x -= (this.speed * deltaTime) / 1000;
        } else if (input.isRight()) {
            this.x += (this.speed * deltaTime) / 1000;
        }

        // Constraints
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;

        // Shooting cooldown
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
        }

        // Shooting
        // In classic Space Invaders, you can only have 1 active shot at a time.
        // We can either enforce 1 shot or a cooldown. Cooldown + 1 shot rule:
        if (input.isShoot() && this.cooldown <= 0) {
            const playerProjectiles = this.game.projectiles.filter(p => !p.isAlien);
            if (playerProjectiles.length < 1) { // Maximum 1 shot on screen
                this.shoot();
            }
        }
    }

    shoot() {
        this.cooldown = this.cooldownMax;
        // Shoot upwards (negative speed)
        const proj = new Projectile(this.x + this.width / 2 - 2, this.y - 10, -8, false);
        this.game.projectiles.push(proj);
    }

    draw(ctx) {
        ctx.fillStyle = '#00ff00';

        // Simple cannon shape
        ctx.fillRect(this.x, this.y + 10, this.width, 10); // Base
        ctx.fillRect(this.x + 15, this.y, 10, 10); // Turret
    }
}

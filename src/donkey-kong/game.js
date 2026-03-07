import { Player } from './player.js';
import { Level } from './level.js';
import { DonkeyKong, Barrel } from './entities.js';
import { Hammer } from './hammer.js';

export class Game {
    constructor(width, height, ui, input) {
        this.width = width;
        this.height = height;
        this.ui = ui;
        this.input = input;

        // Game State
        this.state = 'START'; // START, ACTIVE, PAUSED, OVER, LEVEL_TRANSITION

        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('donkeyKongHighScore')) || 0;
        this.lives = 3;
        this.loop = 1; // 1, 2, 3...
        this.currentLevelType = '25m'; // We'll loop: 25m, 50m, 75m, 100m

        // Bonus timer logic
        this.bonusTimer = 5000;
        this.bonusDecreaseTimer = 0;

        // Entities
        this.player = new Player(this);
        this.level = null;
        this.dk = null;
        this.barrels = [];
        this.hammers = [];
        this.particles = [];

        this.levelTimer = 0;

        this.ui.showStartScreen(this.highScore);
    }

    start() {
        this.score = 0;
        this.lives = 3;
        this.loop = 1;
        this.currentLevelType = '25m';
        this.startLevelTransition();
    }

    startLevelTransition() {
        this.state = 'LEVEL_TRANSITION';
        this.levelTimer = 0;
        this.ui.showLevelScreen(this.currentLevelType);

        // Setup new level entities in background
        this.level = new Level(this, this.currentLevelType);
        this.dk = new DonkeyKong(this);
        this.player.reset();
        this.barrels = [];
        this.hammers = [];

        // Spawn standard hammers for 25m
        if (this.currentLevelType === '25m') {
            this.hammers.push(new Hammer(this, 100, 410)); // Near tier 3
            this.hammers.push(new Hammer(this, 450, 610)); // Near tier 1
        }

        this.particles = [];

        // Level specific bonus
        this.bonusTimer = 5000 + (this.loop - 1) * 1000;
    }

    resetAfterDeath() {
        this.player.reset();
        this.barrels = [];
        this.dk = new DonkeyKong(this);
        this.state = 'ACTIVE';
        this.ui.hideAllScreens();
    }

    pause() {
        if (this.state === 'ACTIVE') {
            this.state = 'PAUSED';
            this.ui.showPauseScreen();
        }
    }

    resume() {
        if (this.state === 'PAUSED') {
            this.state = 'ACTIVE';
            this.ui.hideAllScreens();
        }
    }

    togglePause() {
        if (this.state === 'ACTIVE') this.pause();
        else if (this.state === 'PAUSED') this.resume();
    }

    gameOver() {
        this.state = 'OVER';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('donkeyKongHighScore', this.highScore);
        }
        this.ui.showGameOverScreen(this.score, this.highScore);
    }

    levelComplete() {
        this.state = 'LEVEL_TRANSITION';

        // Add bonus to score
        this.addScore(this.bonusTimer);

        // Next level logic (Cycle 25, 50, 75, 100)
        // For MVP, if we only have 25m built right now, we can just loop 25m
        // but normally:
        if (this.currentLevelType === '25m') this.currentLevelType = '50m';
        else if (this.currentLevelType === '50m') this.currentLevelType = '75m';
        else if (this.currentLevelType === '75m') this.currentLevelType = '100m';
        else {
            this.currentLevelType = '25m';
            this.loop++;
        }

        this.startLevelTransition();
    }

    addScore(points) {
        this.score += points;
        this.ui.updateDisplays();
    }

    update(deltaTime) {
        if (this.state === 'LEVEL_TRANSITION') {
            this.levelTimer += deltaTime;
            if (this.levelTimer > 2000) {
                this.state = 'ACTIVE';
                this.ui.hideAllScreens();
                this.ui.updateDisplays();
            }
            return;
        }

        if (this.state !== 'ACTIVE') return;

        // Decrease bonus timer
        this.bonusDecreaseTimer += deltaTime;
        if (this.bonusDecreaseTimer >= 2000) { // Every 2ish seconds
            this.bonusDecreaseTimer = 0;
            this.bonusTimer = Math.max(0, this.bonusTimer - 100);
            this.ui.updateDisplays();
        }

        // Death logic timeout
        if (this.player.state === 'dead') {
            this.levelTimer += deltaTime;
            if (this.levelTimer > 3000) {
                if (this.lives > 0) {
                    this.resetAfterDeath();
                } else {
                    this.gameOver();
                }
            }
            // particles
            this.particles.forEach(p => p.update(deltaTime));
            this.particles = this.particles.filter(p => p.life > 0);
            return;
        }

        // Entities update
        this.player.update(deltaTime, this.input);

        if (this.dk) {
            this.dk.throwInterval = Math.max(1000, 3000 - (this.loop * 200)); // faster over time
            this.dk.update(deltaTime);
        }

        // Win condition check
        // If Mario reaches the top platform area (Pauline's platform)
        // Pauline is at x: 250, y: 50. Her girder is at y: 100.
        // If Mario's feet are above or on that girder and he is in the middle section:
        if (this.player.y + this.player.height <= 115 &&
            this.player.x > 200 && this.player.x < 400) {
            this.levelComplete();
            return;
        }

        for (let i = this.barrels.length - 1; i >= 0; i--) {
            const b = this.barrels[i];
            b.update(deltaTime);

            // Collision with Mario
            if (this.player.x < b.x + b.width &&
                this.player.x + this.player.width > b.x &&
                this.player.y < b.y + b.height &&
                this.player.y + this.player.height > b.y) {

                // Hit!
                this.player.state = 'dead';
                this.lives--;
                this.levelTimer = 0;
                this.createDeathExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
                this.ui.updateDisplays();
                break;
            }
        }

        this.barrels = this.barrels.filter(b => !b.markedForDeletion);
        this.particles.forEach(p => p.update(deltaTime));
        this.particles = this.particles.filter(p => p.life > 0);
    }

    createDeathExplosion(x, y) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 300,
                vy: (Math.random() - 0.5) * 300 - 100, // biased upward
                life: 500 + Math.random() * 1000,
                radius: Math.random() * 4 + 2,
                color: Math.random() > 0.5 ? '#ff0000' : '#ffff00',
                update: function (dt) {
                    this.x += this.vx * dt / 1000;
                    this.y += this.vy * dt / 1000;
                    this.vy += 600 * dt / 1000; // gravity
                    this.life -= dt;
                }
            });
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);

        if (this.state === 'START' || this.state === 'OVER' || !this.level) return;

        // Draw Level Structures
        this.level.draw(ctx);

        // Draw Pauline (Placeholder)
        ctx.fillStyle = '#ff69b4'; // Pink
        ctx.fillRect(this.level.paulinePos.x, this.level.paulinePos.y, 24, 32);

        // Draw Entities
        if (this.dk) this.dk.draw(ctx);

        this.barrels.forEach(b => b.draw(ctx));

        if (this.player.state !== 'dead') {
            this.player.draw(ctx);
        }

        // Draw Particles
        this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 1500;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }
}

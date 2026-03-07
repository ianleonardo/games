import { Player } from './player.js';
import { Alien, MysteryShip } from './alien.js';
import { Shield } from './shield.js';
import { Projectile } from './projectile.js';

export class Game {
    constructor(width, height, ui, input) {
        this.width = width;
        this.height = height;
        this.ui = ui;
        this.input = input;

        // Game State
        this.state = 'START'; // START, ACTIVE, PAUSED, OVER, LEVEL_TRANSITION

        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('spaceInvadersHighScore')) || 0;
        this.lives = 3;
        this.level = 1;

        // Entities
        this.player = new Player(this);
        this.aliens = [];
        this.projectiles = [];
        this.shields = [];
        this.mysteryShip = null;

        // Alien movement logic
        this.alienDirection = 1; // 1 = right, -1 = left
        this.alienMoveTimer = 0;
        this.alienMoveInterval = 1000; // ms per step
        this.alienStepDown = false;

        // Timers
        this.mysteryShipTimer = 0;
        this.mysteryShipInterval = Math.random() * 10000 + 10000; // 10-20s
        this.alienShootTimer = 0;
        this.alienShootInterval = 2000;

        this.particles = [];
        this.levelTimer = 0;

        this.ui.showStartScreen(this.highScore);
    }

    start() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.resetLevel();
        this.initShields();
        this.ui.hideAllScreens();
        this.ui.updateDisplays();
        this.state = 'ACTIVE';
    }

    resetLevel() {
        this.player.x = (this.width - this.player.width) / 2;
        this.projectiles = [];
        this.particles = [];
        this.mysteryShip = null;
        this.alienDirection = 1;

        // Calculate speed based on level
        this.alienMoveInterval = Math.max(100, 1000 - (this.level - 1) * 100);
        this.alienShootInterval = Math.max(500, 2000 - (this.level - 1) * 200);

        this.initAliens();
    }

    initShields() {
        this.shields = [];
        const numShields = 4;
        const spacing = this.width / (numShields + 1);
        for (let i = 0; i < numShields; i++) {
            this.shields.push(new Shield(spacing * (i + 1) - 30, this.height - 120));
        }
    }

    initAliens() {
        this.aliens = [];
        const rows = 5;
        const cols = 11;
        const startX = 50;
        const startY = 100;
        const paddingX = 40;
        const paddingY = 35;

        for (let r = 0; r < rows; r++) {
            let type = 1; // Octopus
            if (r === 0) type = 3; // Squid
            else if (r < 3) type = 2; // Crab

            for (let c = 0; c < cols; c++) {
                this.aliens.push(new Alien(this, startX + c * paddingX, startY + r * paddingY, type));
            }
        }
    }

    pause() {
        this.state = 'PAUSED';
        this.ui.showPauseScreen();
    }

    resume() {
        this.state = 'ACTIVE';
        this.ui.hideAllScreens();
    }

    togglePause() {
        if (this.state === 'ACTIVE') this.pause();
        else if (this.state === 'PAUSED') this.resume();
    }

    gameOver() {
        this.state = 'OVER';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('spaceInvadersHighScore', this.highScore);
        }
        this.ui.showGameOverScreen(this.score, this.highScore);
    }

    levelComplete() {
        this.state = 'LEVEL_TRANSITION';
        this.level++;
        this.ui.showLevelScreen(this.level);
        this.levelTimer = 0;
    }

    update(deltaTime) {
        if (this.state === 'LEVEL_TRANSITION') {
            this.levelTimer += deltaTime;
            if (this.levelTimer > 2000) {
                this.resetLevel();
                this.state = 'ACTIVE';
                this.ui.hideAllScreens();
            }
            return;
        }

        if (this.state !== 'ACTIVE') return;

        this.player.update(deltaTime, this.input);

        // Alien movement logic
        this.alienMoveTimer += deltaTime;

        // Speed up as aliens die
        const currentInterval = this.alienMoveInterval * (Math.max(0.1, this.aliens.length / 55));

        if (this.alienMoveTimer > currentInterval) {
            this.alienMoveTimer = 0;

            if (this.alienStepDown) {
                // Move all down
                for (let a of this.aliens) {
                    a.y += 20;
                    if (a.y + a.height > this.player.y) {
                        this.gameOver();
                        return;
                    }
                }
                this.alienStepDown = false;
            } else {
                // Move sideways
                let hitEdge = false;
                for (let a of this.aliens) {
                    a.x += 10 * this.alienDirection;
                    if (a.x <= 10 || a.x + a.width >= this.width - 10) {
                        hitEdge = true;
                    }
                }

                if (hitEdge) {
                    this.alienDirection *= -1;
                    this.alienStepDown = true;
                }
            }
        }

        // Alien shooting
        this.alienShootTimer += deltaTime;
        if (this.alienShootTimer > this.alienShootInterval && this.aliens.length > 0) {
            this.alienShootTimer = 0;
            // Pick random alien to shoot
            const shooter = this.aliens[Math.floor(Math.random() * this.aliens.length)];
            const projSpeed = 4 * (1 + this.level * 0.1);
            this.projectiles.push(new Projectile(shooter.x + shooter.width / 2 - 2, shooter.y + shooter.height, projSpeed, true));
        }

        // Mystery Ship
        if (!this.mysteryShip) {
            this.mysteryShipTimer += deltaTime;
            if (this.mysteryShipTimer > this.mysteryShipInterval) {
                this.mysteryShipTimer = 0;
                this.mysteryShipInterval = Math.random() * 10000 + 10000;
                this.mysteryShip = new MysteryShip(this);
            }
        } else {
            this.mysteryShip.update(deltaTime);
            if (this.mysteryShip.markedForDeletion) {
                this.mysteryShip = null;
            }
        }

        // Projectiles update & collisions
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.update(deltaTime);

            // Remove if out of bounds
            if (p.y < 0 || p.y > this.height) {
                p.markedForDeletion = true;
            }

            // Check shield collisions
            for (let s of this.shields) {
                if (s.collideWith(p)) {
                    p.markedForDeletion = true;
                    break;
                }
            }

            if (p.markedForDeletion) continue;

            if (!p.isAlien) {
                // Player shot hits alien
                for (let a of this.aliens) {
                    if (p.x < a.x + a.width && p.x + p.width > a.x &&
                        p.y < a.y + a.height && p.y + p.height > a.y) {
                        a.markedForDeletion = true;
                        p.markedForDeletion = true;
                        this.score += a.score;
                        this.createExplosion(a.x + a.width / 2, a.y + a.height / 2, a.color);
                        break; // Only hit one alien
                    }
                }

                // Player shot hits mystery ship
                if (this.mysteryShip && !p.markedForDeletion) {
                    if (p.x < this.mysteryShip.x + this.mysteryShip.width && p.x + p.width > this.mysteryShip.x &&
                        p.y < this.mysteryShip.y + this.mysteryShip.height && p.y + p.height > this.mysteryShip.y) {
                        this.score += this.mysteryShip.score;
                        p.markedForDeletion = true;
                        this.createExplosion(this.mysteryShip.x + this.mysteryShip.width / 2, this.mysteryShip.y + this.mysteryShip.height / 2, '#ff0000');
                        this.mysteryShip = null;
                    }
                }
            } else {
                // Alien shot hits player
                if (p.x < this.player.x + this.player.width && p.x + p.width > this.player.x &&
                    p.y < this.player.y + this.player.height && p.y + p.height > this.player.y) {
                    p.markedForDeletion = true;
                    this.lives--;
                    this.createExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, '#00ff00');
                    if (this.lives <= 0) {
                        this.gameOver();
                    } else {
                        // briefly pause or just reset player pos
                        this.player.x = (this.width - this.player.width) / 2;
                        // clear alien projectiles on death
                        this.projectiles = this.projectiles.filter(proj => !proj.isAlien);
                    }
                }
            }
        }

        // Clean up deleted entities
        this.aliens = this.aliens.filter(a => !a.markedForDeletion);
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);

        if (this.aliens.length === 0) {
            this.levelComplete();
        }

        // Particles
        this.particles.forEach(p => p.update(deltaTime));
        this.particles = this.particles.filter(p => p.life > 0);

        this.ui.updateDisplays();
    }

    createExplosion(x, y, color) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 200,
                vy: (Math.random() - 0.5) * 200,
                life: 500 + Math.random() * 500,
                color: color,
                update: function (dt) {
                    this.x += this.vx * dt / 1000;
                    this.y += this.vy * dt / 1000;
                    this.life -= dt;
                }
            });
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);

        // Draw entities
        this.shields.forEach(s => s.draw(ctx));
        this.projectiles.forEach(p => p.draw(ctx));
        this.aliens.forEach(a => a.draw(ctx));
        if (this.mysteryShip) this.mysteryShip.draw(ctx);
        if (this.state !== 'OVER') {
            this.player.draw(ctx);
        }

        // Draw Particles
        this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 1000;
            ctx.fillRect(p.x, p.y, 3, 3);
            ctx.globalAlpha = 1;
        });
    }
}

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 24;
        this.height = 32;

        this.reset();

        this.speedX = 150; // px/s
        this.jumpForce = -250;
        this.gravity = 700;

        // Physics state
        this.vx = 0;
        this.vy = 0;
        this.state = 'idle'; // idle, walk, jump, climb, dead
        this.direction = 1; // 1 right, -1 left

        this.currentLadder = null;
    }

    reset() {
        if (!this.game.level) return;
        this.x = this.game.level.marioStart.x;
        // Start slightly above the lowest girder
        this.y = this.game.level.marioStart.y - this.height;
        this.vx = 0;
        this.vy = 0;
        this.state = 'idle';
        this.currentLadder = null;
        this.hammerTime = 0;
    }

    update(deltaTime, input) {
        if (this.state === 'dead') return;

        const dt = deltaTime / 1000;

        // --- Input & State Machine ---

        if (this.state === 'climb') {
            this.vx = 0;
            this.vy = 0;
            if (input.isUp()) {
                this.y -= 100 * dt;
            } else if (input.isDown()) {
                this.y += 100 * dt;
            }

            // Snap to ladder X
            if (this.currentLadder) {
                this.x = this.currentLadder.x - this.width / 2;
            }

            // Check if reached top/bottom of ladder
            let onLadder = this.checkLadders();
            if (!onLadder) {
                this.state = 'idle';
                this.currentLadder = null;
            }
        } else {
            // Left/Right
            if (input.isLeft()) {
                this.vx = -this.speedX;
                this.direction = -1;
                if (this.state !== 'jump') this.state = 'walk';
            } else if (input.isRight()) {
                this.vx = this.speedX;
                this.direction = 1;
                if (this.state !== 'jump') this.state = 'walk';
            } else {
                this.vx = 0;
                if (this.state !== 'jump') this.state = 'idle';
            }

            // Jump
            if (input.isJump() && this.state !== 'jump') {
                this.vy = this.jumpForce;
                this.state = 'jump';

                // Classic DK jump arc is fixed distance. 
                // We'll rely on vx/vy but standard DK doesn't let you change mid-air.
                // We'll allow slight air control for modern feel, or restrict it for authentic feel.
                // For simplicity, lock VX during jump based on current input.
                this.vx = this.direction * (input.isLeft() || input.isRight() ? this.speedX : 0);
            }

            // Climb initiation
            if ((input.isUp() || input.isDown()) && this.state !== 'jump') {
                const ladder = this.checkLadders();
                if (ladder) {
                    // Only climb full ladders (not broken)
                    if (!ladder.broken) {
                        this.state = 'climb';
                        this.currentLadder = ladder;
                        this.x = ladder.x - this.width / 2; // Snap X
                    }
                }
            }
        }

        // --- Physics Application ---

        if (this.state !== 'climb') {
            this.x += this.vx * dt;
            this.y += this.vy * dt;

            // Gravity
            this.vy += this.gravity * dt;

            // Girder Collision (Ground)
            if (this.vy > 0) {
                const floorY = this.checkGirders();
                if (floorY !== null) {
                    // Snap to floor
                    this.y = floorY - this.height;
                    this.vy = 0;
                    if (this.state === 'jump') {
                        this.state = this.vx !== 0 ? 'walk' : 'idle';
                    }
                }
            }
        }

        // Screen bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;
    }

    checkGirders() {
        const footX = this.x + this.width / 2;
        const footY = this.y + this.height;

        let highestFloor = null;

        for (let g of this.game.level.girders) {
            if (footX >= g.x1 && footX <= g.x2) {
                const girderY = this.game.level.getGirderY(g, footX);
                // If feet are slightly above or crossing the girder line moving down
                // Top of girder is girderY - half line width (approx 7px)
                const collisionY = girderY - 7;

                if (footY <= collisionY + 15 && footY >= collisionY - 15) {
                    if (highestFloor === null || collisionY < highestFloor) {
                        highestFloor = collisionY;
                    }
                }
            }
        }
        return highestFloor;
    }

    checkLadders() {
        const cx = this.x + this.width / 2;
        const footY = this.y + this.height;

        for (let l of this.game.level.ladders) {
            // X proximity
            if (Math.abs(cx - l.x) < 15) {
                // Y proximity: Mario's feet must be between top and bottom of ladder
                // Adding a bit of buffer
                if (footY >= l.topY - 5 && footY <= l.bottomY + 5) {
                    return l;
                }
            }
        }
        return null;
    }

    draw(ctx) {
        // Temp placeholder for Mario
        ctx.fillStyle = this.state === 'dead' ? '#ffff00' : '#ff0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Face direction
        ctx.fillStyle = '#ffcccc'; // face color
        if (this.direction === 1) {
            ctx.fillRect(this.x + this.width - 10, this.y + 4, 10, 10);
        } else {
            ctx.fillRect(this.x, this.y + 4, 10, 10);
        }

        // Hat
        ctx.fillStyle = '#ff0000';
        if (this.direction === 1) {
            ctx.fillRect(this.x + 8, this.y, 16, 4);
        } else {
            ctx.fillRect(this.x, this.y, 16, 4);
        }

        // Hammer
        if (this.hammerTime > 0) {
            ctx.fillStyle = '#ffaa00';
            const hx = this.direction === 1 ? this.x + 20 : this.x - 10;
            const hy = this.y + 10;
            // Handle
            ctx.fillRect(hx + 6, hy + 8, 4, 16);
            ctx.fillStyle = '#888888';
            ctx.fillRect(hx, hy, 16, 8);
        }
    }
}

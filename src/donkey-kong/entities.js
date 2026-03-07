export class Barrel {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 20;
        this.vx = 100; // roll speed
        this.vy = 0;
        this.gravity = 600;
        this.state = 'roll'; // roll, fall
        this.direction = 1;
        this.markedForDeletion = false;
        this.rotation = 0;

        // Was this barrel already scored for jumping?
        this.scored = false;
    }

    update(deltaTime) {
        const dt = deltaTime / 1000;

        if (this.state === 'roll') {
            this.x += this.vx * this.direction * dt;

            // Check girder support
            const floorY = this.checkGirders();
            if (floorY !== null) {
                // Stick to slant
                this.y = floorY - this.height;
                // Animate rolling
                this.rotation += 5 * this.direction * dt;
            } else {
                // Off the edge
                this.state = 'fall';
                this.vx = 0; // standard DK barrels fall straight down or reverse depending on edge
                // Actually DK barrels reverse direction when hitting an edge/wall and drop
                this.direction *= -1;
            }

            // Bounds check
            if (this.x < 10) {
                this.x = 10;
                this.state = 'fall';
                this.direction = 1;
            } else if (this.x + this.width > this.game.width - 10) {
                this.x = this.game.width - this.width - 10;
                this.state = 'fall';
                this.direction = -1;
            }

            // Chance to drop down ladders
            if (Math.random() < 0.05) { // 5% chance per frame when over ladder... needs refinement
                const ladder = this.checkLadders();
                if (ladder && !ladder.broken) {
                    this.state = 'fall';
                    this.x = ladder.x - this.width / 2; // snap to ladder
                }
            }

        } else if (this.state === 'fall') {
            this.vy += this.gravity * dt;
            this.y += this.vy * dt;

            // check if hit floor
            const floorY = this.checkGirders();
            if (floorY !== null && this.vy > 0) {
                this.y = floorY - this.height;
                this.vy = 0;
                this.state = 'roll';
                // Roll speed assumes the new direction
                this.vx = 100;
            }

            // Kill if falls off bottom
            if (this.y > this.game.height) {
                this.markedForDeletion = true;
            }
        }

        // Check "jumped over" scoring
        const p = this.game.player;
        if (!this.scored && p.state === 'jump') {
            // If barrel is under Mario
            if (this.x + this.width > p.x && this.x < p.x + p.width) {
                if (p.y + p.height < this.y) {
                    this.scored = true;
                    this.game.addScore(100);
                    // Add floaty text?
                }
            }
        }
    }

    checkGirders() {
        const footX = this.x + this.width / 2;
        const footY = this.y + this.height;
        let highestFloor = null;
        for (let g of this.game.level.girders) {
            if (footX >= g.x1 && footX <= g.x2) {
                const girderY = this.game.level.getGirderY(g, footX);
                const collisionY = girderY - 7;
                // strict check for barrels so they fall through gaps
                if (footY <= collisionY + 20 && footY >= collisionY - 5) {
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
        for (let l of this.game.level.ladders) {
            if (Math.abs(cx - l.x) < 5) { // Needs to be tight over ladder
                return l;
            }
        }
        return null;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);

        // Barrel color
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Lines
        ctx.strokeStyle = '#884400';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, 0);
        ctx.lineTo(this.width / 2, 0);
        ctx.stroke();

        ctx.restore();
    }
}

export class DonkeyKong {
    constructor(game) {
        this.game = game;
        this.x = 80;
        this.y = 100;
        this.width = 60;
        this.height = 50;

        this.throwTimer = 0;
        this.throwInterval = 3000; // every 3 secs
    }

    update(deltaTime) {
        this.throwTimer += deltaTime;
        if (this.throwTimer >= this.throwInterval) {
            this.throwTimer = 0;
            this.throwBarrel();
        }
    }

    throwBarrel() {
        // Spawn slightly in front and below DK
        const barrel = new Barrel(this.game, this.x + this.width, this.y + 40);
        this.game.barrels.push(barrel);
    }

    draw(ctx) {
        // Simple DK rep
        ctx.fillStyle = '#8B4513'; // Saddle brown
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Face
        ctx.fillStyle = '#F4A460'; // Sandy brown
        ctx.fillRect(this.x + 10, this.y + 10, 40, 20);

        // Eyes
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 20, this.y + 15, 5, 5);
        ctx.fillRect(this.x + 35, this.y + 15, 5, 5);

        // Pile of barrels next to him
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(this.x - 10, this.y + 40, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x - 25, this.y + 40, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x - 15, this.y + 25, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

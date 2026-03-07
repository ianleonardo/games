import { TILE_SIZE, MAZE_WIDTH } from './Maze.js';

export class PacMan {
    constructor(maze, input) {
        this.maze = maze;
        this.input = input;
        this.reset();
    }

    reset() {
        this.x = 14 * TILE_SIZE - TILE_SIZE / 2; // Starts between tile 13 and 14
        this.y = 21 * TILE_SIZE + TILE_SIZE / 2; // Row 21
        this.gridX = 13;
        this.gridY = 21;
        this.dir = { x: -1, y: 0 };
        this.nextDir = { x: -1, y: 0 };
        this.speed = 2; // Needs to evenly divide TILE_SIZE/2 (8)
        this.mouthOpen = 0;
        this.mouthDir = 1;
    }

    update() {
        // Animation
        this.mouthOpen += 0.2 * this.mouthDir;
        if (this.mouthOpen >= Math.PI / 4) {
            this.mouthDir = -1;
        } else if (this.mouthOpen <= 0) {
            this.mouthDir = 1;
        }

        // Input buffering
        if (this.input.dir.x !== 0 || this.input.dir.y !== 0) {
            this.nextDir = { ...this.input.dir };
        }

        this.alignX = this.x % TILE_SIZE === TILE_SIZE / 2;
        this.alignY = this.y % TILE_SIZE === TILE_SIZE / 2;

        if (this.alignX && this.alignY) {
            this.gridX = Math.floor(this.x / TILE_SIZE);
            this.gridY = Math.floor(this.y / TILE_SIZE);

            // Attempt to turn
            if (this.nextDir.x !== this.dir.x || this.nextDir.y !== this.dir.y) {
                if (!this.maze.isWall(this.gridX + this.nextDir.x, this.gridY + this.nextDir.y)) {
                    this.dir = { ...this.nextDir };
                }
            }

            // Move forward if no wall
            if (!this.maze.isWall(this.gridX + this.dir.x, this.gridY + this.dir.y)) {
                this.x += this.dir.x * this.speed;
                this.y += this.dir.y * this.speed;
            }
        } else {
            // Can do 180 turn instantly
            if (this.nextDir.x === -this.dir.x && this.nextDir.x !== 0) {
                this.dir = { ...this.nextDir };
            }
            if (this.nextDir.y === -this.dir.y && this.nextDir.y !== 0) {
                this.dir = { ...this.nextDir };
            }
            this.x += this.dir.x * this.speed;
            this.y += this.dir.y * this.speed;
        }

        // Tunnel wrapping
        if (this.x < -TILE_SIZE / 2) this.x = MAZE_WIDTH * TILE_SIZE + TILE_SIZE / 2;
        if (this.x > MAZE_WIDTH * TILE_SIZE + TILE_SIZE / 2) this.x = -TILE_SIZE / 2;

        // Eat pellet
        const currGridX = Math.floor(this.x / TILE_SIZE);
        const currGridY = Math.floor(this.y / TILE_SIZE);
        return this.maze.eatPellet(currGridX, currGridY);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        let angle = 0;
        if (this.dir.x === 1) angle = 0;
        if (this.dir.x === -1) angle = Math.PI;
        if (this.dir.y === 1) angle = Math.PI / 2;
        if (this.dir.y === -1) angle = -Math.PI / 2;

        ctx.rotate(angle);

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        // If stopped against a wall, keep mouth open
        let m = this.mouthOpen;
        if (this.alignX && this.alignY && this.maze.isWall(this.gridX + this.dir.x, this.gridY + this.dir.y)) m = Math.PI / 6;

        ctx.arc(0, 0, TILE_SIZE / 2 - 2, m, Math.PI * 2 - m);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.restore();
    }
}

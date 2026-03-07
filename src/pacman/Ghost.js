import { TILE_SIZE, MAZE_WIDTH, MAZE_HEIGHT } from './Maze.js';

const GHOST_COLORS = {
    blinky: '#ff0000',
    pinky: '#ffb8ff',
    inky: '#00ffff',
    clyde: '#ffb852'
};

export class Ghost {
    constructor(maze, type, startX, startY, scatterTarget) {
        this.maze = maze;
        this.type = type;
        this.startX = startX;
        this.startY = startY;
        this.scatterTarget = scatterTarget;
        this.reset();
    }

    reset() {
        this.x = this.startX * TILE_SIZE + TILE_SIZE / 2;
        this.y = this.startY * TILE_SIZE + TILE_SIZE / 2;
        this.gridX = this.startX;
        this.gridY = this.startY;
        this.dir = { x: 0, y: 0 };
        this.speed = 1; // Needs to evenly divide TILE_SIZE/2 (8)
        this.mode = 'scatter';

        // Initial launch direction depending on type
        if (this.type === 'blinky') this.dir = { x: -1, y: 0 };
        else if (this.type === 'pinky') this.dir = { x: 0, y: -1 };
        else if (this.type === 'inky') this.dir = { x: 0, y: -1 };
        else if (this.type === 'clyde') this.dir = { x: 0, y: -1 };
    }

    setMode(mode) {
        if (this.mode === 'eaten' && mode !== 'scatter' && mode !== 'chase') return; // Cannot override eaten until home
        if (this.mode !== mode) {
            // Reverse direction when switching between chase/scatter/frightened
            if ((this.mode === 'chase' || this.mode === 'scatter') && mode === 'frightened') {
                this.dir = { x: -this.dir.x, y: -this.dir.y };
            }
            this.mode = mode;
        }
    }

    update(pacman) {
        let currentSpeed = this.speed;
        if (this.mode === 'frightened') currentSpeed = 0.5;
        if (this.mode === 'eaten') currentSpeed = 2; // Double speed to go home

        const alignX = this.x % TILE_SIZE === TILE_SIZE / 2;
        const alignY = this.y % TILE_SIZE === TILE_SIZE / 2;

        if (alignX && alignY) {
            this.gridX = Math.floor(this.x / TILE_SIZE);
            this.gridY = Math.floor(this.y / TILE_SIZE);

            // If eaten and back home, revive
            if (this.mode === 'eaten' && this.gridX === 13 && this.gridY === 14) {
                this.mode = 'chase'; // Pop out again
                this.dir = { x: 0, y: -1 };
            }

            // Decide next direction at intersection
            const possibleDirs = [
                { x: 0, y: -1 }, // Up
                { x: -1, y: 0 }, // Left
                { x: 0, y: 1 },  // Down
                { x: 1, y: 0 }   // Right
            ].filter(d => {
                // Ghosts cannot reverse direction unless forced by mode switch
                if (d.x === -this.dir.x && d.y === -this.dir.y && (this.dir.x !== 0 || this.dir.y !== 0)) return false;
                return !this.maze.isGhostWall(this.gridX + d.x, this.gridY + d.y, this.mode === 'eaten');
            });

            if (possibleDirs.length > 0) {
                if (this.mode === 'frightened') {
                    // Choose randomly
                    this.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
                } else {
                    // Target tile logic
                    let target = { x: 0, y: 0 };
                    if (this.mode === 'eaten') {
                        target = { x: 13, y: 14 }; // Ghost house
                    } else if (this.mode === 'scatter') {
                        target = this.scatterTarget;
                    } else if (this.mode === 'chase') {
                        if (this.type === 'blinky') target = { x: pacman.gridX, y: pacman.gridY };
                        else if (this.type === 'pinky') target = { x: pacman.gridX + pacman.dir.x * 4, y: pacman.gridY + pacman.dir.y * 4 };
                        else if (this.type === 'inky') target = { x: pacman.gridX, y: pacman.gridY }; // Simplified for MVP
                        else if (this.type === 'clyde') {
                            const dist = Math.hypot(this.gridX - pacman.gridX, this.gridY - pacman.gridY);
                            target = dist > 8 ? { x: pacman.gridX, y: pacman.gridY } : this.scatterTarget;
                        }
                    }

                    // Choose dir minimizing distance to target
                    let bestDir = possibleDirs[0];
                    let minD = Infinity;
                    possibleDirs.forEach(d => {
                        const nx = this.gridX + d.x;
                        const ny = this.gridY + d.y;
                        const dist = Math.pow(nx - target.x, 2) + Math.pow(ny - target.y, 2);
                        if (dist < minD) {
                            minD = dist;
                            bestDir = d;
                        }
                    });
                    this.dir = bestDir;
                }
            }
        }

        this.x += this.dir.x * currentSpeed;
        this.y += this.dir.y * currentSpeed;

        // Tunnel wrapping
        if (this.x < -TILE_SIZE / 2) this.x = MAZE_WIDTH * TILE_SIZE + TILE_SIZE / 2;
        if (this.x > MAZE_WIDTH * TILE_SIZE + TILE_SIZE / 2) this.x = -TILE_SIZE / 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.mode === 'eaten') {
            // Draw eyes
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(-3, -2, 2, 0, Math.PI * 2);
            ctx.arc(3, -2, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(-3 + this.dir.x, -2 + this.dir.y, 1, 0, Math.PI * 2);
            ctx.arc(3 + this.dir.x, -2 + this.dir.y, 1, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw body
            ctx.fillStyle = this.mode === 'frightened' ? '#2121de' : GHOST_COLORS[this.type];
            if (this.mode === 'frightened' && Math.floor(Date.now() / 200) % 2 === 0 && this.frightenedWarning) {
                ctx.fillStyle = 'white'; // Flash white when frightened mode is ending
            }

            ctx.beginPath();
            ctx.arc(0, 0, TILE_SIZE / 2 - 1, Math.PI, 0);
            ctx.lineTo(TILE_SIZE / 2 - 1, TILE_SIZE / 2 - 1);
            // Wavy bottom
            ctx.lineTo(TILE_SIZE / 4, TILE_SIZE / 2 - 3);
            ctx.lineTo(0, TILE_SIZE / 2 - 1);
            ctx.lineTo(-TILE_SIZE / 4, TILE_SIZE / 2 - 3);
            ctx.lineTo(-TILE_SIZE / 2 + 1, TILE_SIZE / 2 - 1);
            ctx.fill();

            // Draw eyes inside body
            if (this.mode !== 'frightened') {
                ctx.fillStyle = 'white';
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(-2.5, -2, 2.5, 0, Math.PI * 2);
                ctx.arc(2.5, -2, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(-2.5 + this.dir.x, -2 + this.dir.y, 1, 0, Math.PI * 2);
                ctx.arc(2.5 + this.dir.x, -2 + this.dir.y, 1, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = '#ffb8ae'; // scared mouth
                ctx.fillRect(-3, 2, 6, 2);
            }
        }
        ctx.restore();
    }
}

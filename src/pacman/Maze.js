export const TILE_SIZE = 16;
export const MAZE_WIDTH = 28;
export const MAZE_HEIGHT = 31;

export const MAP_DATA = [
    // 1: Wall, 0: Empty/Eaten, 2: Pellet, 3: Power Pellet, 4: Ghost Gate
    // Top half
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], // Middle row (tunnel 14)
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 3, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 3, 1],
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export class Maze {
    constructor() {
        this.reset();
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    reset() {
        this.grid = MAP_DATA.map(row => [...row]);
        this.pelletsTotal = 0;
        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell === 2 || cell === 3) this.pelletsTotal++;
            })
        });
        this.pelletsEaten = 0;
    }

    isWall(x, y) {
        if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) return false; // allow tunnel
        return this.grid[y][x] === 1 || this.grid[y][x] === 4; // Gate acts as wall for PacMan
    }

    isGhostWall(x, y, isEaten) {
        if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) return false;
        if (this.grid[y][x] === 1) return true;
        if (this.grid[y][x] === 4 && !isEaten) return true; // ghosts can only enter home if eaten
        return false;
    }

    isIntersection(x, y) {
        let ways = 0;
        if (!this.isWall(x, y - 1)) ways++;
        if (!this.isWall(x, y + 1)) ways++;
        if (!this.isWall(x - 1, y)) ways++;
        if (!this.isWall(x + 1, y)) ways++;
        return ways > 2;
    }

    eatPellet(x, y) {
        if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) return 0;
        const cell = this.grid[y][x];
        if (cell === 2) {
            this.grid[y][x] = 0;
            this.pelletsEaten++;
            return 10;
        } else if (cell === 3) {
            this.grid[y][x] = 0;
            this.pelletsEaten++;
            return 50;
        }
        return 0;
    }

    isComplete() {
        return this.pelletsEaten >= this.pelletsTotal;
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < MAZE_HEIGHT; y++) {
            for (let x = 0; x < MAZE_WIDTH; x++) {
                const cell = this.grid[y][x];
                const px = x * TILE_SIZE;
                const py = y * TILE_SIZE;

                if (cell === 1) {
                    this.ctx.fillStyle = '#2121de'; // wall-blue
                    this.ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    // Drawing hollow walls for aesthetics
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                } else if (cell === 2) {
                    this.ctx.fillStyle = '#ffb8ae'; // pellet color
                    this.ctx.fillRect(px + TILE_SIZE / 2 - 2, py + TILE_SIZE / 2 - 2, 4, 4);
                } else if (cell === 3) {
                    this.ctx.fillStyle = '#ffb8ae';
                    // Blink power pellet
                    if (Math.floor(Date.now() / 200) % 2 === 0) {
                        this.ctx.beginPath();
                        this.ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 6, 0, Math.PI * 2);
                        this.ctx.fill();
                    }
                } else if (cell === 4) {
                    this.ctx.fillStyle = '#ffb8ff'; // pink ghost gate
                    this.ctx.fillRect(px, py + TILE_SIZE / 2 - 2, TILE_SIZE, 4);
                }
            }
        }
    }
}

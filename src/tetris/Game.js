import { SHAPES } from './Tetromino.js';

export const COLS = 10;
export const ROWS = 20;

export class Game {
    constructor() {
        this.reset();
    }

    reset() {
        this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        this.score = 0;
        this.lines = 0;
        this.level = 1;

        this.isGameOver = false;
        this.isPaused = false;

        this.activePiece = null;
        this.nextPiece = this.getRandomPiece();
        this.holdPieceData = null; // Stores just the piece template, not position
        this.canHold = true;

        this.spanwPiece();
    }

    getRandomPiece() {
        const keys = Object.keys(SHAPES);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return JSON.parse(JSON.stringify(SHAPES[randomKey]));
    }

    spanwPiece() {
        this.activePiece = this.nextPiece;
        this.activePiece.x = Math.floor(COLS / 2) - Math.floor(this.activePiece.matrix[0].length / 2);
        this.activePiece.y = 0;

        this.nextPiece = this.getRandomPiece();
        this.canHold = true;

        if (this.hasCollision(this.activePiece.x, this.activePiece.y, this.activePiece.matrix)) {
            this.isGameOver = true;
        }
    }

    hasCollision(x, y, matrix) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] !== 0) {
                    const boardX = x + col;
                    const boardY = y + row;

                    // Walls
                    if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
                        return true;
                    }
                    // Locked blocks
                    if (boardY >= 0 && this.board[boardY][boardX] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lockPiece() {
        for (let row = 0; row < this.activePiece.matrix.length; row++) {
            for (let col = 0; col < this.activePiece.matrix[row].length; col++) {
                if (this.activePiece.matrix[row][col] !== 0) {
                    const boardY = this.activePiece.y + row;
                    const boardX = this.activePiece.x + col;
                    // Game over check if locked above board
                    if (boardY < 0) {
                        this.isGameOver = true;
                        return;
                    }
                    this.board[boardY][boardX] = this.activePiece.code;
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;

        for (let row = ROWS - 1; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                this.board.splice(row, 1);
                this.board.unshift(Array(COLS).fill(0));
                linesCleared++;
                row++; // Check same row index again as lines shifted down
            }
        }

        if (linesCleared > 0) {
            this.updateScore(linesCleared);
        }
        return linesCleared;
    }

    updateScore(linesCleared) {
        const linePoints = [0, 100, 300, 500, 800];
        this.score += linePoints[linesCleared] * this.level;
        this.lines += linesCleared;
        this.level = Math.floor(this.lines / 10) + 1;
    }

    move(dirX, dirY) {
        if (this.isGameOver || this.isPaused) return false;

        if (!this.hasCollision(this.activePiece.x + dirX, this.activePiece.y + dirY, this.activePiece.matrix)) {
            this.activePiece.x += dirX;
            this.activePiece.y += dirY;
            return true;
        } else if (dirY > 0) {
            // Drop collision
            this.lockPiece();
            this.clearLines();
            this.spanwPiece();
        }
        return false;
    }

    rotate() {
        if (this.isGameOver || this.isPaused) return;

        const matrix = this.activePiece.matrix;
        const N = matrix.length;
        const rotated = Array.from({ length: N }, () => Array(N).fill(0));

        // Transpose and reverse rows for 90deg clockwise
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
                rotated[x][N - 1 - y] = matrix[y][x];
            }
        }

        // Basic wall kick: just try to apply it, no standard SRS wall kicks for MVP as per PRD
        if (!this.hasCollision(this.activePiece.x, this.activePiece.y, rotated)) {
            this.activePiece.matrix = rotated;
        } else {
            // Simple bump left/right if against wall
            if (!this.hasCollision(this.activePiece.x - 1, this.activePiece.y, rotated)) {
                this.activePiece.x -= 1;
                this.activePiece.matrix = rotated;
            } else if (!this.hasCollision(this.activePiece.x + 1, this.activePiece.y, rotated)) {
                this.activePiece.x += 1;
                this.activePiece.matrix = rotated;
            }
        }
    }

    hardDrop() {
        if (this.isGameOver || this.isPaused) return;
        while (!this.hasCollision(this.activePiece.x, this.activePiece.y + 1, this.activePiece.matrix)) {
            this.activePiece.y++;
        }
        this.lockPiece();
        this.clearLines();
        this.spanwPiece();
    }

    hold() {
        if (this.isGameOver || this.isPaused || !this.canHold) return;

        // Strip position specific data to only store template
        const tpl = {
            matrix: this.activePiece.matrix,
            code: this.activePiece.code,
            color: this.activePiece.color
        };

        if (this.holdPieceData) {
            this.activePiece = JSON.parse(JSON.stringify(this.holdPieceData));
            this.activePiece.x = Math.floor(COLS / 2) - Math.floor(this.activePiece.matrix[0].length / 2);
            this.activePiece.y = 0;
            this.holdPieceData = tpl;
        } else {
            this.holdPieceData = tpl;
            this.spanwPiece();
        }
        this.canHold = false;
    }

    getGhostPiece() {
        if (!this.activePiece) return null;
        let ghostY = this.activePiece.y;
        while (!this.hasCollision(this.activePiece.x, ghostY + 1, this.activePiece.matrix)) {
            ghostY++;
        }
        return {
            ...this.activePiece,
            y: ghostY
        };
    }
}

import { COLORS } from './Tetromino.js';

export class Renderer {
    constructor(ctx, nextCtx, holdCtx) {
        this.ctx = ctx;
        this.nextCtx = nextCtx;
        this.holdCtx = holdCtx;

        this.blockSize = 30; // Will be scaled later

        // Internal sizes 300x600 for main, 120x120 for panels, scaled automatically by CSS object-fit/width 100%
        this.gridColor = 'rgba(255, 255, 255, 0.05)';
    }

    draw(game) {
        this.clear(this.ctx);
        this.drawGrid();
        this.drawBoard(game.board);

        if (game.activePiece && !game.isGameOver) {
            const ghost = game.getGhostPiece();
            if (ghost) {
                this.drawPiece(this.ctx, ghost.matrix, ghost.x, ghost.y, 8, true); // 8 is ghost color index or handled directly
            }
            this.drawPiece(this.ctx, game.activePiece.matrix, game.activePiece.x, game.activePiece.y, game.activePiece.code);
        }

        // Draw Next
        this.clear(this.nextCtx);
        if (game.nextPiece) {
            this.drawPreviewPiece(this.nextCtx, game.nextPiece);
        }

        // Draw Hold
        this.clear(this.holdCtx);
        if (game.holdPieceData) {
            this.drawPreviewPiece(this.holdCtx, game.holdPieceData);
        }
    }

    clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    drawGrid() {
        this.ctx.strokeStyle = this.gridColor;
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.blockSize, 0);
            this.ctx.lineTo(i * this.blockSize, 20 * this.blockSize);
            this.ctx.stroke();
        }

        for (let i = 0; i <= 20; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.blockSize);
            this.ctx.lineTo(10 * this.blockSize, i * this.blockSize);
            this.ctx.stroke();
        }
    }

    drawBoard(board) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] !== 0) {
                    this.drawBlock(this.ctx, col, row, board[row][col]);
                }
            }
        }
    }

    drawPiece(ctx, matrix, ox, oy, code, isGhost = false) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] !== 0) {
                    this.drawBlock(ctx, ox + col, oy + row, isGhost ? 8 : code);
                }
            }
        }
    }

    drawPreviewPiece(ctx, piece) {
        // Center piece in 120x120 canvas (4x4 blocks -> scale to fit)
        const bs = 25; // slightly smaller blocks for preview
        const pWidth = piece.matrix[0].length * bs;
        const pHeight = piece.matrix.length * bs;

        const originX = (ctx.canvas.width - pWidth) / 2;
        const originY = (ctx.canvas.height - pHeight) / 2;

        for (let row = 0; row < piece.matrix.length; row++) {
            for (let col = 0; col < piece.matrix[row].length; col++) {
                if (piece.matrix[row][col] !== 0) {
                    ctx.fillStyle = COLORS[piece.code];

                    // Box
                    const x = originX + col * bs;
                    const y = originY + row * bs;
                    ctx.fillRect(x, y, bs, bs);

                    // Highlight for 3D effect
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.fillRect(x, y, bs, 4);
                    ctx.fillRect(x, y, 4, bs);

                    // Shadow
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                    ctx.fillRect(x, y + bs - 4, bs, 4);
                    ctx.fillRect(x + bs - 4, y, 4, bs);

                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, bs, bs);
                }
            }
        }
    }

    drawBlock(ctx, x, y, code) {
        const color = COLORS[code];
        ctx.fillStyle = color;
        const px = x * this.blockSize;
        const py = y * this.blockSize;

        ctx.fillRect(px, py, this.blockSize, this.blockSize);

        if (code !== 8) { // no 3d bevel on ghost
            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(px, py, this.blockSize, 4);
            ctx.fillRect(px, py, 4, this.blockSize);

            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(px, py + this.blockSize - 4, this.blockSize, 4);
            ctx.fillRect(px + this.blockSize - 4, py, 4, this.blockSize);
        }

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, this.blockSize, this.blockSize);
    }
}

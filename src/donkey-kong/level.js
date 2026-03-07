export class Level {
    constructor(game, type) {
        this.game = game;
        this.type = type; // '25m', '50m', '75m', '100m'

        this.girders = [];
        this.ladders = [];
        this.rivets = [];

        this.dkPos = { x: 50, y: 150 };
        this.paulinePos = { x: 250, y: 50 };
        this.marioStart = { x: 50, y: 750 };

        this.buildLevel();
    }

    buildLevel() {
        const w = this.game.width;
        // Basic definitions for 25m
        if (this.type === '25m') {
            // Screen is 600x800

            // Bottom girder (slight slant up to right)
            this.girders.push({ x1: 0, y1: 760, x2: 600, y2: 740, type: 'solid' }); // Ground

            // Tier 1 (slant up to left)
            this.girders.push({ x1: 50, y1: 640, x2: 600, y2: 660, type: 'solid' });

            // Tier 2 (slant up to right)
            this.girders.push({ x1: 0, y1: 560, x2: 550, y2: 540, type: 'solid' });

            // Tier 3 (slant up to left)
            this.girders.push({ x1: 50, y1: 440, x2: 600, y2: 460, type: 'solid' });

            // Tier 4 (slant up to right)
            this.girders.push({ x1: 0, y1: 360, x2: 550, y2: 340, type: 'solid' });

            // Tier 5 (flat top, slightly slanted)
            this.girders.push({ x1: 50, y1: 240, x2: 600, y2: 260, type: 'solid' });

            // DK platform
            this.girders.push({ x1: 50, y1: 150, x2: 200, y2: 150, type: 'solid' });

            // Pauline platform
            this.girders.push({ x1: 250, y1: 100, x2: 350, y2: 100, type: 'solid' });

            // Ladders (connect tiers)
            // format: x, topY, bottomY
            this.ladders.push({ x: 500, topY: 656, bottomY: 745 }); // Bottom to T1
            this.ladders.push({ x: 100, topY: 556, bottomY: 644 }); // T1 to T2
            this.ladders.push({ x: 500, topY: 456, bottomY: 542 }); // T2 to T3
            this.ladders.push({ x: 100, topY: 356, bottomY: 444 }); // T3 to T4
            this.ladders.push({ x: 500, topY: 256, bottomY: 342 }); // T4 to T5

            // Ladder to Pauline
            this.ladders.push({ x: 300, topY: 100, bottomY: 250 });

            // Broken ladders (barrels don't roll down, Mario can't climb full)
            this.ladders.push({ x: 250, topY: 649, bottomY: 700, broken: true });
        }

        // TODO: Other levels
    }

    // Helper to get Y coordinate on a girder given an X coordinate
    getGirderY(girder, x) {
        if (x < girder.x1 || x > girder.x2) return null;
        // Linear interpolation
        const t = (x - girder.x1) / (girder.x2 - girder.x1);
        return girder.y1 + t * (girder.y2 - girder.y1);
    }

    draw(ctx) {
        // Draw Girders
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 15;
        ctx.lineCap = 'butt';

        this.girders.forEach(g => {
            ctx.beginPath();
            ctx.moveTo(g.x1, g.y1);
            ctx.lineTo(g.x2, g.y2);
            ctx.stroke();

            // Crossbeams
            ctx.strokeStyle = '#aa0033';
            ctx.lineWidth = 2;
            for (let x = g.x1 + 10; x < g.x2; x += 20) {
                const y = this.getGirderY(g, x);
                ctx.beginPath();
                ctx.moveTo(x, y - 7);
                ctx.lineTo(x + 10, y + 7);
                ctx.stroke();
            }
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 15;
        });

        // Draw Ladders
        ctx.strokeStyle = '#00d2ff';
        ctx.lineWidth = 4;
        this.ladders.forEach(l => {
            if (l.broken) {
                // Draw broken ladder
                ctx.beginPath();
                ctx.moveTo(l.x - 10, l.topY);
                ctx.lineTo(l.x - 10, l.topY + 20);
                ctx.moveTo(l.x + 10, l.topY);
                ctx.lineTo(l.x + 10, l.topY + 20);
                // Rung
                ctx.moveTo(l.x - 10, l.topY + 10);
                ctx.lineTo(l.x + 10, l.topY + 10);

                ctx.moveTo(l.x - 10, l.bottomY - 20);
                ctx.lineTo(l.x - 10, l.bottomY);
                ctx.moveTo(l.x + 10, l.bottomY - 20);
                ctx.lineTo(l.x + 10, l.bottomY);
                // Rung
                ctx.moveTo(l.x - 10, l.bottomY - 10);
                ctx.lineTo(l.x + 10, l.bottomY - 10);

                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(l.x - 10, l.topY);
                ctx.lineTo(l.x - 10, l.bottomY);
                ctx.moveTo(l.x + 10, l.topY);
                ctx.lineTo(l.x + 10, l.bottomY);
                ctx.stroke();

                // Rungs
                ctx.beginPath();
                for (let y = l.topY + 10; y < l.bottomY; y += 15) {
                    ctx.moveTo(l.x - 10, y);
                    ctx.lineTo(l.x + 10, y);
                }
                ctx.stroke();
            }
        });
    }
}

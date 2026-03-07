export class Shield {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 40;

        this.pixels = [];
        this.pixelSize = 5; // Size of each block chunk

        this.createPixels();
    }

    createPixels() {
        const cols = this.width / this.pixelSize;
        const rows = this.height / this.pixelSize;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Create an arch shape
                if ((r === 0 && (c < 2 || c > cols - 3)) ||
                    (r === 1 && (c < 1 || c > cols - 2)) ||
                    (r > rows - 3 && c > 2 && c < cols - 3)) {
                    continue; // Skip these to form shape
                }

                this.pixels.push({
                    x: this.x + c * this.pixelSize,
                    y: this.y + r * this.pixelSize,
                    width: this.pixelSize,
                    height: this.pixelSize,
                    active: true
                });
            }
        }
    }

    collideWith(projectile) {
        // Broad phase
        if (projectile.x < this.x + this.width &&
            projectile.x + projectile.width > this.x &&
            projectile.y < this.y + this.height &&
            projectile.y + projectile.height > this.y) {

            // Narrow phase
            for (let i = 0; i < this.pixels.length; i++) {
                const p = this.pixels[i];
                if (p.active) {
                    if (projectile.x < p.x + p.width &&
                        projectile.x + projectile.width > p.x &&
                        projectile.y < p.y + p.height &&
                        projectile.y + projectile.height > p.y) {

                        // Hit a pixel!
                        p.active = false;

                        // Destroy neighboring pixels for slightly larger crater
                        this.destroyNeighbors(p.x, p.y);

                        return true; // Collision occurred
                    }
                }
            }
        }
        return false;
    }

    destroyNeighbors(x, y) {
        // Simple radius destruction
        const radius = this.pixelSize * 1.5;
        this.pixels.forEach(p => {
            if (p.active) {
                const dx = p.x - x;
                const dy = p.y - y;
                if (Math.sqrt(dx * dx + dy * dy) <= radius) {
                    // Small chance to survive for jagged edges
                    if (Math.random() > 0.2) p.active = false;
                }
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = '#00d2ff';
        this.pixels.forEach(p => {
            if (p.active) {
                ctx.fillRect(p.x, p.y, p.width, p.height);
            }
        });
    }
}

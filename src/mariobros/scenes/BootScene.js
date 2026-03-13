export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load generated assets
        this.load.image('mario', 'assets/mario.png');
        this.load.image('goomba', 'assets/goomba.png');
        this.load.image('tiles', 'assets/tiles.png');
        
        // Generate simple textures for coins, mushrooms, and blocks if images are tricky to use
        let graphics = this.make.graphics({x: 0, y: 0, add: false});
        
        // Coin
        graphics.fillStyle(0xffff00);
        graphics.fillCircle(8, 8, 8);
        graphics.generateTexture('coin', 16, 16);
        graphics.clear();
        
        // Mushroom
        graphics.fillStyle(0xff0000);
        graphics.fillRect(0, 8, 16, 8);
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(8, 6, 8);
        graphics.fillStyle(0xff0000);
        graphics.fillCircle(4, 4, 3);
        graphics.fillCircle(12, 4, 3);
        graphics.generateTexture('mushroom', 16, 16);
        graphics.clear();

        // Brick
        graphics.fillStyle(0xcc4400);
        graphics.fillRect(0, 0, 32, 32);
        graphics.lineStyle(2, 0x550000);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.beginPath();
        graphics.moveTo(0, 16);
        graphics.lineTo(32, 16);
        graphics.moveTo(16, 0);
        graphics.lineTo(16, 16);
        graphics.moveTo(8, 16);
        graphics.lineTo(8, 32);
        graphics.moveTo(24, 16);
        graphics.lineTo(24, 32);
        graphics.strokePath();
        graphics.generateTexture('brick', 32, 32);
        graphics.clear();

        // Question Block
        graphics.fillStyle(0xffaa00);
        graphics.fillRect(0, 0, 32, 32);
        graphics.lineStyle(2, 0x000000);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.fillStyle(0x000000);
        // Draw crude question mark if fillText is tricky
        graphics.fillRect(12, 8, 8, 4);
        graphics.fillRect(20, 12, 4, 8);
        graphics.fillRect(16, 20, 8, 4);
        graphics.fillRect(16, 26, 4, 4);
        graphics.generateTexture('question', 32, 32);
        graphics.clear();
        
        // Ground
        graphics.fillStyle(0xaa5500);
        graphics.fillRect(0, 0, 32, 32);
        graphics.fillStyle(0x00aa00);
        graphics.fillRect(0, 0, 32, 4);
        graphics.generateTexture('ground', 32, 32);
        graphics.clear();

        // Pipe
        graphics.fillStyle(0x00aa00);
        graphics.fillRect(0, 0, 64, 64);
        graphics.fillStyle(0x000000);
        graphics.fillRect(8, 0, 48, 64);
        graphics.fillStyle(0x00ff00);
        graphics.fillRect(12, 0, 40, 64);
        graphics.fillStyle(0x00aa00);
        graphics.fillRect(-4, 0, 72, 16);
        graphics.fillStyle(0x222222);
        graphics.fillRect(12, -10, 40, 10);
        graphics.generateTexture('pipe', 64, 64);
        graphics.clear();
    }

    create() {
        // Start Menu Scene
        this.scene.start('MenuScene');
    }
}

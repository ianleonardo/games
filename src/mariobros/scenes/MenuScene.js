export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 2 - 50, 'MARIO BROS', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            color: '#fff',
            shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 0, fill: true }
        }).setOrigin(0.5);

        const playText = this.add.text(width / 2, height / 2 + 50, 'CLICK OR TAP TO START', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffea00',
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 0, fill: true }
        }).setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: playText,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });

        // Start game on interact
        this.input.once('pointerdown', () => {
            try {
                // Basic check if touch, display controls
                if (this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.input.touch) {
                    const controls = document.getElementById('controls-layer');
                    if (controls) controls.style.display = 'flex';
                }
                this.scene.start('PlayScene');
            } catch (err) {
                document.body.innerHTML += `<div style="position:absolute;z-index:9999;background:red;color:white;top:250px;left:0;">MENU ERROR: ${err.message}<br>${err.stack}</div>`;
            }
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('PlayScene');
        });
    }
}

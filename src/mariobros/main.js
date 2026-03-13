import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import PlayScene from './scenes/PlayScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#5c94fc', // Sky blue
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, MenuScene, PlayScene]
};

const game = new Phaser.Game(config);

// Expose game to window if needed
window.game = game;

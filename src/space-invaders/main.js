import { Game } from './game.js';
import { InputHandler } from './input.js';
import { UI } from './ui.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Scale canvas properly for retina displays if necessary, 
    // or just use CSS scaling. 600x600 logical resolution.
    
    const ui = new UI();
    const input = new InputHandler();
    const game = new Game(canvas.width, canvas.height, ui, input);
    
    let lastTime = 0;
    
    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Cap deltaTime to prevent huge jumps (e.g., when tab is backgrounded)
        if (deltaTime > 0 && deltaTime < 100) {
            game.update(deltaTime);
            game.draw(ctx);
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    ui.setGame(game);
    
    // Start game loop (initially shows start screen)
    requestAnimationFrame((ts) => {
        lastTime = ts;
        gameLoop(ts);
    });
});

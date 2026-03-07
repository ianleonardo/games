import { Game } from './Game.js';
import { Maze, TILE_SIZE, MAZE_WIDTH, MAZE_HEIGHT } from './Maze.js';
import { Input } from './Input.js';
import { PacMan } from './PacMan.js';
import { Ghost } from './Ghost.js';
import { Storage } from './Storage.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('scoreDisplay');
const highScoreEl = document.getElementById('highScoreDisplay');
const levelEl = document.getElementById('levelDisplay');
const livesEl = document.getElementById('livesDisplay');

const screens = {
    start: document.getElementById('startScreen'),
    pause: document.getElementById('pauseScreen'),
    gameOver: document.getElementById('gameOverScreen')
};

const game = new Game();
const input = new Input();
let maze = new Maze();
let pacman = new PacMan(maze, input);
let ghosts = [];

// Timers
let modeTimer = 0;
let frightenedTimer = 0;

let lastTime = 0;

function createGhosts() {
    ghosts = [
        new Ghost(maze, 'blinky', 13, 11, { x: 25, y: -2 }), // Top right
        new Ghost(maze, 'pinky', 13, 14, { x: 2, y: -2 }),   // Top left
        new Ghost(maze, 'inky', 11, 14, { x: 27, y: 31 }),   // Bottom right
        new Ghost(maze, 'clyde', 15, 14, { x: 0, y: 31 })    // Bottom left
    ];
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screenName && screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

function updateUI() {
    scoreEl.innerText = game.score;
    highScoreEl.innerText = game.highScore;
    levelEl.innerText = game.level;

    // Draw lives (simple pacman arc icons)
    livesEl.innerHTML = '';
    for (let i = 0; i < game.lives; i++) {
        const div = document.createElement('div');
        div.className = 'life-icon';
        livesEl.appendChild(div);
    }
}

function resetPositions() {
    pacman.reset();
    createGhosts();
    // Default mode rotation resets
    modeTimer = performance.now();
    ghosts.forEach(g => g.setMode('scatter'));
}

function startLevel() {
    maze.reset();
    resetPositions();
    updateUI();
}

function startGame() {
    game.reset();
    startLevel();
    showScreen(null);
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function checkCollisions() {
    for (const ghost of ghosts) {
        // Simple distance-based collision
        const dist = Math.hypot(pacman.x - ghost.x, pacman.y - ghost.y);
        if (dist < TILE_SIZE * 0.8) {
            if (ghost.mode === 'frightened') {
                ghost.setMode('eaten');
                game.eatGhost();
                updateUI();
            } else if (ghost.mode === 'scatter' || ghost.mode === 'chase') {
                // Pacman dies
                game.loseLife();
                if (game.isGameOver) {
                    showScreen('gameOver');
                    document.getElementById('gameOverScore').innerText = game.score;
                } else {
                    resetPositions();
                }
                updateUI();
                return; // halt multiple collisions
            }
        }
    }
}

function updateModes(time) {
    // Frightened takes precedence
    if (frightenedTimer > 0) {
        frightenedTimer -= (time - lastTime);
        if (frightenedTimer <= 0) {
            // Restore previous mode based on generic timeline
            frightenedTimer = 0;
            const t = (time - modeTimer) % 27000;
            const newMode = t < 7000 ? 'scatter' : 'chase';
            ghosts.forEach(g => {
                if (g.mode !== 'eaten') g.setMode(newMode);
                g.frightenedWarning = false;
            });
        } else if (frightenedTimer < 2000) {
            ghosts.forEach(g => {
                if (g.mode === 'frightened') g.frightenedWarning = true;
            });
        }
    } else {
        // Scatter for 7s, chase for 20s
        const t = (time - modeTimer) % 27000;
        const newMode = t < 7000 ? 'scatter' : 'chase';
        ghosts.forEach(g => {
            if (g.mode !== 'eaten' && g.mode !== 'frightened') g.setMode(newMode);
        });
    }
}

function gameLoop(time) {
    if (game.isPaused || game.isGameOver || screens.start.classList.contains('active')) {
        lastTime = time;
        return;
    }

    const deltaTime = time - lastTime;

    // Updates
    const points = pacman.update();
    if (points > 0) {
        game.addScore(points);
        if (points === 50) {
            // Power pellet
            game.resetGhostMultiplier();
            frightenedTimer = 8000; // 8 seconds of fear, reduced later by level
            ghosts.forEach(g => {
                if (g.mode !== 'eaten') g.setMode('frightened');
                g.frightenedWarning = false;
            });
        }
        updateUI();

        if (maze.isComplete()) {
            game.nextLevel();
            startLevel();
            lastTime = time;
            requestAnimationFrame(gameLoop);
            return;
        }
    }

    checkCollisions(); // Post-pacman move

    // If game ended or pacman bumped, exit frame
    if (game.isGameOver || (pacman.x === 14 * TILE_SIZE - TILE_SIZE / 2 && pacman.y === 21 * TILE_SIZE + TILE_SIZE / 2 && game.lives < 3 && pacman.dir.x === -1)) {
        // This is a dirty trick for checking if resetPositions was just called during checkCollisions.
    } else {
        updateModes(time);
        ghosts.forEach(g => g.update(pacman));
        checkCollisions(); // Post-ghosts move
    }

    // Drawing
    maze.draw();
    pacman.draw(ctx);
    ghosts.forEach(g => g.draw(ctx));

    lastTime = time;
    requestAnimationFrame(gameLoop);
}

// Init logic
input.onPause = () => {
    if (!game.isGameOver && !screens.start.classList.contains('active')) {
        game.isPaused = !game.isPaused;
        if (game.isPaused) {
            showScreen('pause');
        } else {
            showScreen(null);
            lastTime = performance.now();
            requestAnimationFrame(gameLoop);
        }
    }
};

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('restartBtnPause').addEventListener('click', startGame);
document.getElementById('resumeBtn').addEventListener('click', () => {
    game.isPaused = false;
    showScreen(null);
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
});

// Allow swipe outside canvas to start
window.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
        if (screens.start.classList.contains('active')) startGame();
    }
});

highScoreEl.innerText = game.highScore;
maze.draw(); // initial render

import { Game } from './Game.js';
import { Renderer } from './Renderer.js';
import { Input } from './Input.js';
import { Storage } from './Storage.js';

// DOM Elements
const canvas = document.getElementById('gameCanvas');
const nextCanvas = document.getElementById('nextCanvas');
const holdCanvas = document.getElementById('holdCanvas');

const scoreEl = document.getElementById('scoreDisplay');
const linesEl = document.getElementById('linesDisplay');
const levelEl = document.getElementById('levelDisplay');

const screens = {
    start: document.getElementById('startScreen'),
    pause: document.getElementById('pauseScreen'),
    gameOver: document.getElementById('gameOverScreen')
};

const startBtn = document.getElementById('startBtn');
const resumeBtn = document.getElementById('resumeBtn');
const restartBtn = document.getElementById('restartBtn');
const restartBtnPause = document.getElementById('restartBtnPause');

const startHighScoreEl = document.getElementById('startHighScore');
const gameOverScoreEl = document.getElementById('gameOverScore');
const gameOverHighScoreEl = document.getElementById('gameOverHighScore');

// Contexts
const ctx = canvas.getContext('2d');
const nextCtx = nextCanvas.getContext('2d');
const holdCtx = holdCanvas.getContext('2d');

// Engine instances
const game = new Game();
const renderer = new Renderer(ctx, nextCtx, holdCtx);
const input = new Input();

// Game Loop Variables
let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000; // ms

// DAS (Delayed Auto Shift) variables for smooth left/right movement
let dasCounter = 0;
let defaultDasDelay = 150; // ms before repeating
let dasRepeatInterval = 50; // ms per repeat
let lastDirX = 0;

function updateGravity() {
    // Basic curve: speeds up as level increases
    dropInterval = Math.max(100, 1000 - (game.level - 1) * 100);
}

function updateUI() {
    scoreEl.innerText = game.score;
    linesEl.innerText = game.lines;
    levelEl.innerText = game.level;
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screenName && screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

function init() {
    // Initial draw to populate start screen background
    renderer.draw(game);
    startHighScoreEl.innerText = Storage.getHighScore();
    showScreen('start');

    // Button listeners
    startBtn.addEventListener('click', startGame);

    resumeBtn.addEventListener('click', () => {
        game.isPaused = false;
        showScreen(null);
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    });

    restartBtn.addEventListener('click', startGame);
    restartBtnPause.addEventListener('click', startGame);

    // Bind Input Actions
    input.onRotate = () => {
        if (!game.isGameOver && !game.isPaused && !screens.start.classList.contains('active')) {
            game.rotate();
            renderer.draw(game);
        }
    };

    input.onHardDrop = () => {
        if (!game.isGameOver && !game.isPaused && !screens.start.classList.contains('active')) {
            game.hardDrop();
            dropCounter = 0;
            checkPostMoveState();
        }
    };

    input.onHold = () => {
        if (!game.isGameOver && !game.isPaused && !screens.start.classList.contains('active')) {
            game.hold();
            dropCounter = 0;
            renderer.draw(game);
        }
    };

    input.onPause = () => {
        // Toggle pause if game is running
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

    // Global space/enter to start
    window.addEventListener('keydown', (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && screens.start.classList.contains('active')) {
            startGame();
        }
    });
}

function startGame() {
    game.reset();
    updateGravity();
    updateUI();
    showScreen(null);
    lastTime = performance.now();
    dropCounter = 0;
    requestAnimationFrame(gameLoop);
}

function handleInputContinuous(deltaTime) {
    if (game.isGameOver || game.isPaused) return;

    // Determine intended horizontal direction
    let dirX = 0;
    if (input.keys.left) dirX = -1;
    if (input.keys.right) dirX = 1;

    // Reset DAS if direction changes or keys released
    if (dirX === 0 || dirX !== lastDirX) {
        dasCounter = 0;
    }

    if (dirX !== 0) {
        if (dasCounter === 0) {
            // Initial press
            game.move(dirX, 0);
            dasCounter += deltaTime;
        } else {
            dasCounter += deltaTime;
            if (dasCounter >= defaultDasDelay) {
                game.move(dirX, 0);
                dasCounter -= dasRepeatInterval; // keep interval tight
            }
        }
    }
    lastDirX = dirX;

    // Fast soft drop continuous
    if (input.keys.down) {
        dropCounter += deltaTime * 10; // 10x speed multiplier for soft drop
    }
}

function checkPostMoveState() {
    updateUI();
    updateGravity();
    renderer.draw(game);

    if (game.isGameOver) {
        Storage.setHighScore(game.score);
        gameOverScoreEl.innerText = game.score;
        gameOverHighScoreEl.innerText = Storage.getHighScore();
        showScreen('gameOver');
    }
}

function gameLoop(time) {
    if (game.isPaused || game.isGameOver) {
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;

    handleInputContinuous(deltaTime);

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        game.move(0, 1);
        dropCounter -= dropInterval;
        checkPostMoveState();
    } else {
        // Just render if we haven't checked post-move state via drop
        renderer.draw(game);
    }

    requestAnimationFrame(gameLoop);
}

// Start
init();

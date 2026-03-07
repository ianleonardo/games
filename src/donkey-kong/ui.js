export class UI {
    constructor() {
        this.game = null;

        // Screens
        this.startScreen = document.getElementById('startScreen');
        this.pauseScreen = document.getElementById('pauseScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.levelScreen = document.getElementById('levelScreen');

        // Displays
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.bonusDisplay = document.getElementById('bonusDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.livesDisplay = document.getElementById('livesDisplay');
        this.startHighScore = document.getElementById('startHighScore');
        this.gameOverScore = document.getElementById('gameOverScore');
        this.gameOverHighScore = document.getElementById('gameOverHighScore');
        this.levelSub = document.getElementById('levelSub');

        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.resumeBtn = document.getElementById('resumeBtn');
        this.restartBtnPause = document.getElementById('restartBtnPause');
        this.restartBtn = document.getElementById('restartBtn');
        this.btnPause = document.getElementById('btnPause');

        this.setupEventListeners();
    }

    setGame(game) {
        this.game = game;
        this.updateDisplays();
    }

    setupEventListeners() {
        if (this.startBtn) this.startBtn.addEventListener('click', () => this.game.start());
        if (this.resumeBtn) this.resumeBtn.addEventListener('click', () => this.game.resume());
        if (this.restartBtnPause) this.restartBtnPause.addEventListener('click', () => this.game.start());
        if (this.restartBtn) this.restartBtn.addEventListener('click', () => this.game.start());
        if (this.btnPause) this.btnPause.addEventListener('click', () => this.game.togglePause());

        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyP' || e.code === 'Escape') {
                if (this.game && this.game.state === 'ACTIVE') {
                    this.game.pause();
                } else if (this.game && this.game.state === 'PAUSED') {
                    this.game.resume();
                }
            }
        });
    }

    hideAllScreens() {
        if (this.startScreen) this.startScreen.classList.remove('active');
        if (this.pauseScreen) this.pauseScreen.classList.remove('active');
        if (this.gameOverScreen) this.gameOverScreen.classList.remove('active');
        if (this.levelScreen) this.levelScreen.classList.remove('active');
    }

    showStartScreen(highScore) {
        this.hideAllScreens();
        if (this.startHighScore) this.startHighScore.textContent = String(highScore).padStart(6, '0');
        if (this.startScreen) this.startScreen.classList.add('active');
    }

    showPauseScreen() {
        this.hideAllScreens();
        if (this.pauseScreen) this.pauseScreen.classList.add('active');
    }

    showGameOverScreen(score, highScore) {
        this.hideAllScreens();
        if (this.gameOverScore) this.gameOverScore.textContent = String(score).padStart(6, '0');
        if (this.gameOverHighScore) this.gameOverHighScore.textContent = String(highScore).padStart(6, '0');
        if (this.gameOverScreen) this.gameOverScreen.classList.add('active');
    }

    showLevelScreen(levelName) {
        this.hideAllScreens();
        if (this.levelSub) this.levelSub.textContent = levelName;
        if (this.levelScreen) this.levelScreen.classList.add('active');
    }

    updateDisplays() {
        if (!this.game) return;
        if (this.scoreDisplay) this.scoreDisplay.textContent = String(this.game.score).padStart(6, '0');
        if (this.bonusDisplay) this.bonusDisplay.textContent = String(this.game.bonusTimer).padStart(4, '0');
        if (this.levelDisplay) this.levelDisplay.textContent = this.game.loop;

        if (this.livesDisplay) {
            this.livesDisplay.innerHTML = '';
            for (let i = 0; i < this.game.lives; i++) {
                const icon = document.createElement('span');
                icon.className = 'mario-icon';
                this.livesDisplay.appendChild(icon);
            }
        }
    }
}

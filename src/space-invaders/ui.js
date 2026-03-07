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
        this.levelDisplay = document.getElementById('levelDisplay');
        this.livesDisplay = document.getElementById('livesDisplay');
        this.startHighScore = document.getElementById('startHighScore');
        this.gameOverScore = document.getElementById('gameOverScore');
        this.gameOverHighScore = document.getElementById('gameOverHighScore');
        this.levelTitle = document.getElementById('levelTitle');

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
        if (this.startHighScore) this.startHighScore.textContent = highScore;
        if (this.startScreen) this.startScreen.classList.add('active');
    }

    showPauseScreen() {
        this.hideAllScreens();
        if (this.pauseScreen) this.pauseScreen.classList.add('active');
    }

    showGameOverScreen(score, highScore) {
        this.hideAllScreens();
        if (this.gameOverScore) this.gameOverScore.textContent = score;
        if (this.gameOverHighScore) this.gameOverHighScore.textContent = highScore;
        if (this.gameOverScreen) this.gameOverScreen.classList.add('active');
    }

    showLevelScreen(level) {
        this.hideAllScreens();
        if (this.levelTitle) this.levelTitle.textContent = `WAVE ${level}`;
        if (this.levelScreen) this.levelScreen.classList.add('active');
    }

    updateDisplays() {
        if (!this.game) return;
        if (this.scoreDisplay) this.scoreDisplay.textContent = this.game.score;
        if (this.levelDisplay) this.levelDisplay.textContent = this.game.level;
        if (this.livesDisplay) this.livesDisplay.textContent = this.game.lives;
    }
}

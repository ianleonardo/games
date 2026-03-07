import { Storage } from './Storage.js';

export class Game {
    constructor() {
        this.score = 0;
        this.highScore = Storage.getHighScore();
        this.lives = 3;
        this.level = 1;

        this.isGameOver = false;
        this.isPaused = false;

        this.ghostEatenScore = 200; // Doubles each time a ghost is eaten in one power pellet phase
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.isGameOver = false;
    }

    addScore(points) {
        this.score += points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    resetGhostMultiplier() {
        this.ghostEatenScore = 200;
    }

    eatGhost() {
        const pts = this.ghostEatenScore;
        this.addScore(pts);
        this.ghostEatenScore *= 2;
        return pts;
    }

    loseLife() {
        this.lives--;
        if (this.lives <= 0) {
            this.isGameOver = true;
            Storage.setHighScore(this.score);
        }
    }

    nextLevel() {
        this.level++;
    }
}

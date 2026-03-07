const HighScoreKey = 'tetris_highscore';

export class Storage {
    static getHighScore() {
        try {
            const score = localStorage.getItem(HighScoreKey);
            return score ? parseInt(score, 10) : 0;
        } catch (e) {
            console.warn('LocalStorage not available', e);
            return 0;
        }
    }

    static setHighScore(score) {
        const current = this.getHighScore();
        if (score > current) {
            try {
                localStorage.setItem(HighScoreKey, score.toString());
                return true;
            } catch (e) {
                console.warn('LocalStorage not available', e);
            }
        }
        return false;
    }
}

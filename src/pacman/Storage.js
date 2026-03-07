export const Storage = {
    getHighScore: () => {
        return parseInt(localStorage.getItem('pacmanHighScore')) || 0;
    },
    setHighScore: (score) => {
        const best = Storage.getHighScore();
        if (score > best) {
            localStorage.setItem('pacmanHighScore', score);
        }
    }
};

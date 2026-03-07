export class Input {
    constructor() {
        this.keys = { up: false, down: false, left: false, right: false };
        this.dir = { x: 0, y: 0 };
        this.onPause = null;

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));

        // Mobile touch controls
        this.bindTouch('btnUp', { x: 0, y: -1 });
        this.bindTouch('btnDown', { x: 0, y: 1 });
        this.bindTouch('btnLeft', { x: -1, y: 0 });
        this.bindTouch('btnRight', { x: 1, y: 0 });

        const btnPause = document.getElementById('btnPause');
        if (btnPause) {
            btnPause.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (this.onPause) this.onPause();
            });
            btnPause.addEventListener('click', () => {
                if (this.onPause) this.onPause();
            });
        }

        // Swipe controls on canvas
        const canvas = document.getElementById('gameCanvas');
        let touchStartX = 0;
        let touchStartY = 0;
        if (canvas) {
            canvas.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: false });

            canvas.addEventListener('touchmove', e => {
                e.preventDefault(); // prevent scroll
            }, { passive: false });

            canvas.addEventListener('touchend', e => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const dx = touchEndX - touchStartX;
                const dy = touchEndY - touchStartY;

                if (Math.abs(dx) > Math.abs(dy)) {
                    // horizontal
                    if (Math.abs(dx) > 30) {
                        this.dir = { x: dx > 0 ? 1 : -1, y: 0 };
                    }
                } else {
                    // vertical
                    if (Math.abs(dy) > 30) {
                        this.dir = { x: 0, y: dy > 0 ? 1 : -1 };
                    }
                }
            });
        }
    }

    bindTouch(id, direction) {
        const btn = document.getElementById(id);
        if (!btn) return;

        const setDir = (e) => {
            e.preventDefault();
            this.dir = direction;
        };
        btn.addEventListener('touchstart', setDir);
        btn.addEventListener('mousedown', setDir); // for desktop testing of mobile UI
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.keys.up = true;
                this.dir = { x: 0, y: -1 };
                e.preventDefault();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.keys.down = true;
                this.dir = { x: 0, y: 1 };
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.keys.left = true;
                this.dir = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.keys.right = true;
                this.dir = { x: 1, y: 0 };
                break;
            case 'p':
            case 'P':
            case 'Escape':
                if (this.onPause) this.onPause();
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.keys.up = false;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.keys.down = false;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.keys.right = false;
                break;
        }
    }
}

export class Input {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            down: false,
            rotate: false,
            hardDrop: false,
            hold: false,
            pause: false
        };

        this.keyMap = {
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'ArrowDown': 'down',
            'ArrowUp': 'rotate',
            ' ': 'hardDrop', // Spacebar
            'c': 'hold',
            'C': 'hold',
            'Shift': 'hold',
            'p': 'pause',
            'P': 'pause',
            'Escape': 'pause'
        };

        // Callbacks for distinct actions that shouldn't repeat wildly or need exact timing
        this.onRotate = null;
        this.onHardDrop = null;
        this.onHold = null;
        this.onPause = null;

        this.initKeyboard();
        this.initTouch();
    }

    initKeyboard() {
        window.addEventListener('keydown', (e) => {
            const action = this.keyMap[e.key];
            if (action) {
                // Prevent scrolling with arrows/space
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                    e.preventDefault();
                }

                if (!this.keys[action]) {
                    this.keys[action] = true;
                    // Fire callbacks for single-press actions
                    if (action === 'rotate' && this.onRotate) this.onRotate();
                    if (action === 'hardDrop' && this.onHardDrop) this.onHardDrop();
                    if (action === 'hold' && this.onHold) this.onHold();
                    if (action === 'pause' && this.onPause) this.onPause();
                }
            }
        }, { passive: false });

        window.addEventListener('keyup', (e) => {
            const action = this.keyMap[e.key];
            if (action) {
                this.keys[action] = false;
            }
        });
    }

    initTouch() {
        const bindBtn = (id, actionDown, actionUp) => {
            const el = document.getElementById(id);
            if (!el) return;

            const handleStart = (e) => {
                e.preventDefault(); // Prevent double firing from mouse/touch and scroll
                if (actionDown) actionDown();
            };

            const handleEnd = (e) => {
                e.preventDefault();
                if (actionUp) actionUp();
            };

            el.addEventListener('touchstart', handleStart, { passive: false });
            el.addEventListener('touchend', handleEnd, { passive: false });
            el.addEventListener('mousedown', handleStart);
            el.addEventListener('mouseup', handleEnd);
            el.addEventListener('mouseleave', handleEnd);
        };

        // Continuous movement keys
        bindBtn('btnLeft', () => { this.keys.left = true; }, () => { this.keys.left = false; });
        bindBtn('btnRight', () => { this.keys.right = true; }, () => { this.keys.right = false; });
        bindBtn('btnDown', () => { this.keys.down = true; }, () => { this.keys.down = false; });

        // Trigger keys
        bindBtn('btnRotate', () => { if (this.onRotate) this.onRotate(); });
        bindBtn('btnHardDrop', () => { if (this.onHardDrop) this.onHardDrop(); });
        bindBtn('btnHold', () => { if (this.onHold) this.onHold(); });
        bindBtn('btnPause', () => { if (this.onPause) this.onPause(); });

        // Basic Swipe implementation
        let touchStartX = 0;
        let touchStartY = 0;
        const gameArea = document.querySelector('.game-wrapper');

        gameArea.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        gameArea.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal
                if (Math.abs(dx) > 30) {
                    if (dx > 0) {
                        // Right swipe -> Move right
                        // Emulate a quick tap right (since continuous is hard with swipe)
                        this.keys.right = true;
                        setTimeout(() => this.keys.right = false, 50);
                    } else {
                        // Left swipe
                        this.keys.left = true;
                        setTimeout(() => this.keys.left = false, 50);
                    }
                }
            } else {
                // Vertical
                if (Math.abs(dy) > 30) {
                    if (dy > 0) {
                        // Down swipe -> Hard drop
                        if (this.onHardDrop) this.onHardDrop();
                    } else {
                        // Up swipe -> Rotate
                        if (this.onRotate) this.onRotate();
                    }
                } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                    // Tap -> Rotate
                    if (this.onRotate) this.onRotate();
                }
            }
        }, { passive: true });
    }
}

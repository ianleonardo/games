export class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false
        };

        this.touchKeys = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false
        };

        // Keyboard events
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = true;
            if (e.code === 'ArrowRight') this.keys.right = true;
            if (e.code === 'ArrowUp') { this.keys.up = true; e.preventDefault(); }
            if (e.code === 'ArrowDown') { this.keys.down = true; e.preventDefault(); }
            if (e.code === 'Space') {
                this.keys.jump = true;
                e.preventDefault(); // Prevent page scrolling
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = false;
            if (e.code === 'ArrowRight') this.keys.right = false;
            if (e.code === 'ArrowUp') this.keys.up = false;
            if (e.code === 'ArrowDown') this.keys.down = false;
            if (e.code === 'Space') this.keys.jump = false;
        });

        // Touch events setup
        this.setupTouchControls();
    }

    setupTouchControls() {
        const touchMappings = [
            { id: 'btnLeft', key: 'left' },
            { id: 'btnRight', key: 'right' },
            { id: 'btnUp', key: 'up' },
            { id: 'btnDown', key: 'down' },
            { id: 'btnJump', key: 'jump' }
        ];

        touchMappings.forEach(mapping => {
            const el = document.getElementById(mapping.id);
            if (el) {
                el.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.touchKeys[mapping.key] = true;
                    el.classList.add('pressed');
                });
                el.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.touchKeys[mapping.key] = false;
                    el.classList.remove('pressed');
                });
            }
        });
    }

    isLeft() { return this.keys.left || this.touchKeys.left; }
    isRight() { return this.keys.right || this.touchKeys.right; }
    isUp() { return this.keys.up || this.touchKeys.up; }
    isDown() { return this.keys.down || this.touchKeys.down; }
    isJump() { return this.keys.jump || this.touchKeys.jump; }
}

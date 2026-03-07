export class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            shoot: false
        };

        this.touchKeys = {
            left: false,
            right: false,
            shoot: false
        };

        // Keyboard events
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = true;
            if (e.code === 'ArrowRight') this.keys.right = true;
            if (e.code === 'Space') {
                this.keys.shoot = true;
                e.preventDefault(); // Prevent page scrolling
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = false;
            if (e.code === 'ArrowRight') this.keys.right = false;
            if (e.code === 'Space') this.keys.shoot = false;
        });

        // Touch events setup
        this.setupTouchControls();
    }

    setupTouchControls() {
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');
        const btnShoot = document.getElementById('btnShoot');

        if (!btnLeft || !btnRight || !btnShoot) return;

        // Left Button
        btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchKeys.left = true; btnLeft.classList.add('pressed'); });
        btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); this.touchKeys.left = false; btnLeft.classList.remove('pressed'); });

        // Right Button
        btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchKeys.right = true; btnRight.classList.add('pressed'); });
        btnRight.addEventListener('touchend', (e) => { e.preventDefault(); this.touchKeys.right = false; btnRight.classList.remove('pressed'); });

        // Shoot Button
        btnShoot.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchKeys.shoot = true; btnShoot.classList.add('pressed'); });
        btnShoot.addEventListener('touchend', (e) => { e.preventDefault(); this.touchKeys.shoot = false; btnShoot.classList.remove('pressed'); });
    }

    isLeft() {
        return this.keys.left || this.touchKeys.left;
    }

    isRight() {
        return this.keys.right || this.touchKeys.right;
    }

    isShoot() {
        return this.keys.shoot || this.touchKeys.shoot;
    }
}

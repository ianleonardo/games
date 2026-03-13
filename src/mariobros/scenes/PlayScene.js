export default class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        this.score = 0;
        this.coins = 0;
        
        // Physics Groups
        this.platforms = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.powerups = this.physics.add.group();

        this.createLevel();

        // Player Setup
        this.player = this.physics.add.sprite(100, 400, 'mario');
        this.player.setCollideWorldBounds(true);
        // Safely scale 640x640 images down to roughly 32x32 to avoid NaN/Infinity
        this.player.setScale(0.05);
        this.player.body.setSize(640 * 0.5, 640 * 0.8);
        this.player.body.setOffset(640 * 0.25, 640 * 0.2);
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.powerups, this.platforms);

        // Camera matches world bounds
        this.physics.world.setBounds(0, 0, 6400, 600);
        this.cameras.main.setBounds(0, 0, 6400, 600);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.setupMobileControls();
        this.updateHUD();
    }

    createLevel() {
        // Ground - repeat for wide level
        for (let x = 0; x < 200; x++) {
            this.platforms.create(x * 32 + 16, 584, 'ground');
        }

        // Test Structures
        this.platforms.create(300, 450, 'brick');
        this.platforms.create(332, 450, 'question');
        this.platforms.create(364, 450, 'brick');
        this.platforms.create(396, 450, 'question');
        this.platforms.create(428, 450, 'brick');

        this.platforms.create(600, 520, 'pipe').setOrigin(0.5, 1);
        this.platforms.refresh(); // Refresh static bodies after creation

        // Add a test Goomba
        const goomba = this.enemies.create(500, 450, 'goomba');
        goomba.setScale(0.05);
        goomba.body.setSize(640 * 0.5, 640 * 0.8);
        goomba.body.setOffset(640 * 0.25, 640 * 0.2);
        goomba.setVelocityX(-50);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    }

    setupMobileControls() {
        this.leftDown = false;
        this.rightDown = false;
        this.jumpDown = false;

        const bindTouch = (id, prop) => {
            const el = document.getElementById(id);
            if (!el) return;
            // Prevent default touch behaviors
            el.addEventListener('touchstart', (e) => { e.preventDefault(); this[prop] = true; }, { passive: false });
            el.addEventListener('touchend', (e) => { e.preventDefault(); this[prop] = false; }, { passive: false });
            el.addEventListener('mousedown', (e) => { e.preventDefault(); this[prop] = true; });
            el.addEventListener('mouseup', (e) => { e.preventDefault(); this[prop] = false; });
            el.addEventListener('mouseleave', (e) => { e.preventDefault(); this[prop] = false; });
        };

        bindTouch('btn-left', 'leftDown');
        bindTouch('btn-right', 'rightDown');
        bindTouch('btn-jump', 'jumpDown');
    }

    updateHUD() {
        document.getElementById('score').innerText = String(this.score).padStart(6, '0');
        document.getElementById('coins').innerText = String(this.coins).padStart(2, '0');
    }

    update() {
        const speed = 250;
        
        if (this.cursors.left.isDown || this.leftDown) {
            this.player.setVelocityX(-speed);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown || this.rightDown) {
            this.player.setVelocityX(speed);
            this.player.flipX = false; // Original image facing right
        } else {
            this.player.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown || this.jumpDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-600);
            this.jumpDown = false; // Prevent auto-bunny hop on hold
        }

        // Simple kill plane
        if (this.player.y > 600) {
            this.scene.restart();
        }
    }

    hitEnemy(player, enemy) {
        if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
            // Player stomped on enemy
            enemy.destroy();
            player.setVelocityY(-400); // Bounce off enemy
            this.score += 100;
            this.updateHUD();
        } else {
            // Player got hit
            this.scene.restart();
        }
    }
}

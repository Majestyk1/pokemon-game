import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load tilemap
        this.load.tilemapTiledJSON('map', '/assets/map.json');
        
        // Load tilesets
        this.load.image('Overworld', '/assets/Overworld.png');
        this.load.image('ov4', '/assets/ov4.png');
        
        // Load player spritesheet
        this.load.spritesheet('player', '/assets/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        // Create player animations
        this.createPlayerAnimations();
        
        // Start the main scene
        this.scene.start('MainScene');
    }

    createPlayerAnimations() {
        // Walking animations
        this.anims.create({
            key: 'player-walk-down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'player-walk-left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'player-walk-right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'player-walk-up',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        // Idle animations
        this.anims.create({
            key: 'player-idle-down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 8
        });

        this.anims.create({
            key: 'player-idle-left',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 8
        });

        this.anims.create({
            key: 'player-idle-right',
            frames: [{ key: 'player', frame: 6 }],
            frameRate: 8
        });

        this.anims.create({
            key: 'player-idle-up',
            frames: [{ key: 'player', frame: 9 }],
            frameRate: 8
        });
    }
}

export default BootScene; 
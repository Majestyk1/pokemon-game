import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
        this.lastDirection = 'down';
        this.battleTriggered = false;
    }

    create() {
        // Create the tilemap
        const map = this.make.tilemap({ key: 'map' });
        
        // Add tilesets
        const overworldTileset = map.addTilesetImage('Overworld', 'Overworld');
        const ov4Tileset = map.addTilesetImage('ov4', 'ov4');
        
           // Create layers with their specific tilesets
           map.createLayer('ground', overworldTileset); // Ground uses Overworld tileset
           const treesLayer = map.createLayer('trees', [overworldTileset, ov4Tileset]); // Trees layer needs both tilesets
       
           // Set collision on trees (walls)
        treesLayer.setCollisionByProperty({ collides: true });

        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        
        // Set up camera to follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        
        // Set up collision between player and trees
        this.physics.add.collider(this.player, treesLayer);
        
        // Set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Set initial animation
        this.player.anims.play('player-idle-down');

        // Add random battle trigger
        this.time.addEvent({
            delay: 10000, // Check every 10 seconds
            callback: this.checkForBattle,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // Reset player velocity
        this.player.setVelocity(0);
        
        // Handle player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('player-walk-left', true);
            this.lastDirection = 'left';
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('player-walk-right', true);
            this.lastDirection = 'right';
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('player-walk-up', true);
            this.lastDirection = 'up';
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('player-walk-down', true);
            this.lastDirection = 'down';
        } else {
            // Play idle animation when not moving
            this.player.anims.play(`player-idle-${this.lastDirection}`, true);
        }
    }

    checkForBattle() {
        // 20% chance of battle when moving
        if (!this.battleTriggered && 
            (this.cursors.left.isDown || 
             this.cursors.right.isDown || 
             this.cursors.up.isDown || 
             this.cursors.down.isDown)) {
            const battleChance = Phaser.Math.Between(1, 100);
            if (battleChance <= 20) {
                this.startBattle();
            }
        }
    }

    startBattle() {
        this.battleTriggered = true;
        this.scene.pause();
        this.scene.launch('BattleScene');
    }
}

export default MainScene; 
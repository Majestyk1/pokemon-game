import Phaser from 'phaser';

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
        this.playerPokemon = null;
        this.enemyPokemon = null;
        this.battleUI = null;
    }

    init(data) {
        // Data passed from MainScene when battle starts
        this.enemyPokemon = data.enemyPokemon || this.createRandomPokemon();
    }

    create() {
        // Create battle background
        this.add.rectangle(400, 300, 800, 600, 0x87ceeb);
        
        // Create battle UI container
        this.battleUI = this.add.container(0, 0);
        
        // Create player Pokemon
        this.playerPokemon = this.createPokemon('player', 200, 400);
        
        // Create enemy Pokemon
        this.enemyPokemon = this.createPokemon('enemy', 600, 200);
        
        // Create battle menu
        this.createBattleMenu();
        
        // Add keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createPokemon(type, x, y) {
        // Basic Pokemon data structure
        const pokemon = {
            name: type === 'player' ? 'Pikachu' : 'Charmander',
            level: 5,
            hp: 100,
            maxHp: 100,
            sprite: this.add.sprite(x, y, 'player'), // Using player sprite as placeholder
            attacks: [
                { name: 'Tackle', damage: 10 },
                { name: 'Growl', damage: 5 }
            ]
        };
        
        // Add health bar
        const healthBar = this.add.graphics();
        this.updateHealthBar(healthBar, pokemon);
        this.battleUI.add(healthBar);
        
        return pokemon;
    }

    createBattleMenu() {
        // Create menu background
        const menuBg = this.add.rectangle(400, 500, 600, 150, 0x000000, 0.7);
        this.battleUI.add(menuBg);
        
        // Create attack buttons
        const attack1 = this.add.text(200, 450, 'Tackle', { fontSize: '24px', fill: '#fff' });
        const attack2 = this.add.text(600, 450, 'Growl', { fontSize: '24px', fill: '#fff' });
        
        this.battleUI.add(attack1);
        this.battleUI.add(attack2);
        
        // Make buttons interactive
        attack1.setInteractive();
        attack2.setInteractive();
        
        attack1.on('pointerdown', () => this.useAttack(0));
        attack2.on('pointerdown', () => this.useAttack(1));
    }

    useAttack(attackIndex) {
        const attack = this.playerPokemon.attacks[attackIndex];
        this.enemyPokemon.hp -= attack.damage;
        
        // Update health bar
        this.updateHealthBar(this.battleUI.list[1], this.enemyPokemon);
        
        // Check if battle is over
        if (this.enemyPokemon.hp <= 0) {
            this.endBattle(true);
        } else {
            // Enemy's turn
            this.enemyTurn();
        }
    }

    enemyTurn() {
        // Simple AI: randomly choose an attack
        const randomAttack = Phaser.Math.Between(0, this.enemyPokemon.attacks.length - 1);
        const attack = this.enemyPokemon.attacks[randomAttack];
        
        this.playerPokemon.hp -= attack.damage;
        this.updateHealthBar(this.battleUI.list[0], this.playerPokemon);
        
        if (this.playerPokemon.hp <= 0) {
            this.endBattle(false);
        }
    }

    updateHealthBar(healthBar, pokemon) {
        healthBar.clear();
        healthBar.fillStyle(0x000000);
        healthBar.fillRect(pokemon.sprite.x - 50, pokemon.sprite.y - 40, 100, 10);
        healthBar.fillStyle(0x00ff00);
        healthBar.fillRect(pokemon.sprite.x - 50, pokemon.sprite.y - 40, (pokemon.hp / pokemon.maxHp) * 100, 10);
    }

    endBattle(playerWon) {
        // Show battle result
        const resultText = this.add.text(400, 300, playerWon ? 'You won!' : 'You lost!', 
            { fontSize: '32px', fill: '#fff' });
        resultText.setOrigin(0.5);
        
        // Return to main scene after 2 seconds
        this.time.delayedCall(2000, () => {
            this.scene.start('MainScene');
        });
    }

    createRandomPokemon() {
        const pokemonList = ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle'];
        const randomPokemon = pokemonList[Phaser.Math.Between(0, pokemonList.length - 1)];
        
        return {
            name: randomPokemon,
            level: Phaser.Math.Between(3, 7),
            hp: 100,
            maxHp: 100,
            attacks: [
                { name: 'Tackle', damage: 10 },
                { name: 'Growl', damage: 5 }
            ]
        };
    }
}

export default BattleScene; 
/*
* Asset from: https://kenney.nl/assets/pixel-platformer
*
*/
import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';
import Player from '../gameObjects/Player.js';
import PlayerBullet from '../gameObjects/PlayerBullet.js';
import AoeBullet from '../gameObjects/AoeBullet.js';
import EnemyFlying from '../gameObjects/EnemyFlying.js';
import EnemyBullet from '../gameObjects/EnemyBullet.js';
import Explosion from '../gameObjects/Explosion.js';

export class Game extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/road_bg.png');
    }

    constructor() {
        super('Game');
    }

    create() {
        this.initVariables();
        this.initGameUi();
        this.initAnimations();
        this.initPlayer();
        this.initInput();
        this.initPhysics();
        this.initMap();
    }

    update(time,delta) {
        this.updateMap();
        this.scale.lockOrientation('portrait');
        if (!this.gameStarted) {
            const cursor = this.input.activePointer;
            if (cursor.isDown) this.startGame();
            return;
        }

        this.player.update();
        if ( this.spawnEnemyCounter > 0) {
            this.spawnEnemyCounter -= (delta);
        } else{
            this.addFlyingGroup();
        }
    }

    initVariables() {
        this.score = 0;
        this.centreX = this.scale.width * 0.5;
        this.centreY = this.scale.height * 0.5;
        // list of tile ids in tiles.png
        // items nearer to the beginning of the array have a higher chance of being randomly chosen when using weighted()
        this.tiles = [50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 36, 48, 60, 72, 84];
        this.tileSize = 32; // width and height of a tile in pixels

        this.mapOffset = 10; // offset (in tiles) to move the map above the top of the screen
        this.mapTop = -this.mapOffset * this.tileSize; // offset (in pixels) to move the map above the top of the screen
        this.mapHeight = Math.ceil(this.scale.height / this.tileSize) + this.mapOffset + 1; // height of the tile map (in tiles)
        this.mapWidth = Math.ceil(this.scale.width / this.tileSize); // width of the tile map (in tiles)
        this.scrollSpeed = 1; // background scrolling speed (in pixels)
        this.scrollMovement = 0; // current scroll amount
        this.spawnEnemyCounterValue = 3 * 600;
        this.spawnEnemyCounter = this.spawnEnemyCounter;
        this.map; // rference to tile map
        this.groundLayer; // reference to ground layer of tile map
    }

    initGameUi() {
        // Create tutorial text
        this.tutorialText = this.add.text(this.centreX, this.centreY, 'Tap to shoot!', {
            fontFamily: 'Arial Black', fontSize: 42, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100);

        // Create score text
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        })
            .setDepth(100);

        // Create game over text
        this.gameOverText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);
    }

    initAnimations() {
        this.anims.create({
            key: ANIMATION.explosion.key,
            frames: this.anims.generateFrameNumbers(ANIMATION.explosion.texture, ANIMATION.explosion.config),
            frameRate: ANIMATION.explosion.frameRate,
            repeat: ANIMATION.explosion.repeat
        });
    }

    initPhysics() {
        this.enemyGroup = this.add.group();
        this.enemyBulletGroup = this.add.group();
        this.playerBulletGroup = this.add.group();

        this.physics.add.overlap(this.player, this.enemyBulletGroup, this.hitPlayer, null, this);
        this.physics.add.overlap(this.playerBulletGroup, this.enemyGroup, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.hitPlayer, null, this);
    }

    initPlayer() {
        this.player = new Player(this, this.centreX, this.scale.height - 100, 8);
    }

    initInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // create tile map data
    initMap() {

        this.background = this.add.tileSprite(320 / 2, 480 / 2, 320, 480, 'background');
    }

    // scroll the tile map
    updateMap() {
        this.background.tilePositionY -= 2;
    }

    startGame() {
        this.gameStarted = true;
        this.tutorialText.setVisible(false);
        this.addFlyingGroup();
        this.gameOverText.setVisible(false);
        this.player.revive();

    }

    fireBullet(x, y) {
        const bullet = new PlayerBullet(this, x, y);
        this.playerBulletGroup.add(bullet);
    }

    fireAoe(x,y){
        const aoe = new AoeBullet(this,x,y);
    }

    removeBullet(bullet) {
        this.playerBulletGroup.remove(bullet, true, true);
    }

    fireEnemyBullet(x, y, power) {
        const bullet = new EnemyBullet(this, x, y, power);
        this.enemyBulletGroup.add(bullet);
    }

    removeEnemyBullet(bullet) {
        this.playerBulletGroup.remove(bullet, true, true);
    }

    // add a group of flying enemies
    addFlyingGroup() {
        this.spawnEnemyCounter = this.spawnEnemyCounterValue;
        this.addEnemy(0,0,5);
        // this.spawnEnemy = false;
        // const spawnCounter = 5 * 600;//Phaser.Math.RND.between(8, 12) * 100; // delay between spawning of each enemy
    }

    addEnemy(x, y, nb) {
        const enemyWidth = 64;
        const nbRow = (nb / 5);

        for (let rounds = 0; rounds < nbRow; rounds++) {
            for (let i = 0; i < nb; i++) {
                const spawnX = (enemyWidth / 2) + x + (enemyWidth * i);
                const spawnY = (enemyWidth / 2) - (enemyWidth * rounds);
                const enemy = new EnemyFlying(this, spawnX, spawnY);
                this.enemyGroup.add(enemy);
            }
        }

    }

    removeEnemy(enemy) {
        this.enemyGroup.remove(enemy, true, true);
    }

    addExplosion(x, y) {
        new Explosion(this, x, y);
    }

    hitPlayer(player, obstacle) {
        this.addExplosion(player.x, player.y);
        player.hit(obstacle.getPower());
        obstacle.die();

        this.GameOver();
    }

    hitEnemy(bullet, enemy) {
        this.updateScore(10);
        bullet.remove();
        enemy.hit(bullet.getPower());
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }
}

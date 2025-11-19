/*
* Asset from: https://kenney.nl/assets/pixel-platformer
*
*/
import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';
import Player from '../gameObjects/Player.js';
import PlayerBullet from '../gameObjects/PlayerBullet.js';
import AoeBullet from '../gameObjects/AoeBullet.js';
import AoeExplosion from '../gameObjects/AoeExplosion.js';
import EnemyFlying from '../gameObjects/EnemyFlying.js';
import EnemyBullet from '../gameObjects/EnemyBullet.js';
import Explosion from '../gameObjects/Explosion.js';
import Presentateur from '../gameObjects/Presentateur.js';
import Score from '../gameObjects/Score.js';
import MainWeaponFireRateUpgrade from '../gameObjects/MainWeaponFireRateUpgrade.js'
import AoeTimerReset from '../gameObjects/AoeTimerReset.js'
import RoundReward from '../gameObjects/RoundReward.js'

export class Game extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/road_bg.png');
        this.load.image('aoe_frame', 'assets/aoe_frame.png');

    }


    constructor() {
        super('Game');
    }

    create() {
        this.initVariables();
        this.initAnimations();
        this.initGameUi();
        this.initPlayer();
        this.initInput();
        this.initPhysics();
        this.initMap();

        this.roundReward = new RoundReward(this, this.player);
    }

    update(time, delta) {
        this.updateMap();
        this.scale.lockOrientation('portrait');


        if (!this.gameStarted) {
            const cursor = this.input.activePointer;
            if (cursor.isDown) this.startGame();
            return;
        }

        if (this.inBetweenRounds === 2) {

            return;
        }

        this.aoe_frame.alpha = this.player.GetMolotovFireCounterPercentage();
        this.nb_aoe.text = `X${this.player.GetNBMolotov()}`;


        if (this.inBetweenRounds === 1) {
            this.spawnEnemyCounter = this.spawnEnemyCounterValue;
            return;
        }

        if (this.spawnEnemyCounter > 0) {
            this.spawnEnemyCounter -= (delta / 1000);
        } else {
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

        this.spawnEnemyCounterValue = (4);
        this.spawnEnemyCounter = (0);

        this.map; // rference to tile map
        this.groundLayer; // reference to ground layer of tile map

        this.presentateur;

        this.scoreUIObject;

        this.aoe_frame;

        this.nb_aoe;

        this.blackRectangle;

        this.inBetweenRounds = 0;


    }



    initGameUi() {
        // Create tutorial text
        this.tutorialText = this.add.text(this.centreX, this.centreY, 'TAP TO SHOOT !', {
            fontFamily: 'vintageWarehouse', fontSize: 42, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100);


        this.scoreUIObject = new Score(this);


        this.scoreUIObject.setNormalScoreLetters([
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 1.5, 0 + 16 * 2, ASSETS.image.aN.key).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 2.5, 0 + 16 * 2, ASSETS.image.cN.key).setOrigin(0.5).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 3.5, 0 + 16 * 2, ASSETS.image.aN.key).setOrigin(0.5).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 4.5, 0 + 16 * 2, ASSETS.image.bN.key).setOrigin(0.5).setDepth(100),
        ]);

        this.scoreUIObject.setLitUpScoreLetters([
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 1.5, 0 + 16 * 2, ASSETS.image.aL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 2.5, 0 + 16 * 2, ASSETS.image.cL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 3.5, 0 + 16 * 2, ASSETS.image.aL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 4.5, 0 + 16 * 2, ASSETS.image.bL.key).setDepth(100).setAlpha(0),
        ]);

        for (let i = 0; i < this.scoreUIObject.getNormalScoreLetters().length; i++) {
            this.add.existing(this.scoreUIObject.getNormalScoreLetters()[i]);
        }
        for (let i = 0; i < this.scoreUIObject.getLitUpScoreLetters().length; i++) {
            this.add.existing(this.scoreUIObject.getLitUpScoreLetters()[i]);
        }


        const presentateurBoard = this.add.rectangle(0, this.scale.height - 50, 320, 50, '#FFFFFF').setOrigin(0).setDepth(100);
        this.presentateur = new Presentateur(this, 320 - (96 / 2), 480 - (50 + (80 / 2)), presentateurBoard);


        this.presentateur.setNewTextToPrint("Salut les fachos");

        this.aoe_frame = this.add.image(25, this.scale.height - 65, 'aoe_frame', 1).setOrigin(0.5).setDepth(100);
        this.nb_aoe = this.add.text(this.aoe_frame.x+10, this.aoe_frame.y-15, "X1", {
            fontFamily: 'vintageWarehouse', fontSize: 6, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        })
            .setOrigin(0.5)
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
        this.anims.create({
            key: ANIMATION.aoeExplosion.key,
            frames: this.anims.generateFrameNumbers(ANIMATION.aoeExplosion.texture, ANIMATION.aoeExplosion.config),
            frameRate: ANIMATION.aoeExplosion.frameRate,
            repeat: ANIMATION.aoeExplosion.repeat
        });
        this.anims.create({
            key: ANIMATION.presentateurSheet.key,
            frames: this.anims.generateFrameNumbers(ANIMATION.presentateurSheet.texture, ANIMATION.presentateurSheet.config),
            frameRate: ANIMATION.presentateurSheet.frameRate,
            repeat: ANIMATION.presentateurSheet.repeat
        });
    }

    initPhysics() {
        this.enemyGroup = this.add.group();
        this.enemyBulletGroup = this.add.group();
        this.playerBulletGroup = this.add.group();
        this.playerAoeGroup = this.add.group();
        this.playerAoeExplosionGroup = this.add.group();

        this.upgradePickupGroup = this.add.group();

        this.physics.add.overlap(this.player, this.enemyBulletGroup, this.hitPlayer, null, this);
        this.physics.add.overlap(this.playerBulletGroup, this.enemyGroup, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.hitPlayer, null, this);
        this.physics.add.overlap(this.playerAoeGroup, this.enemyGroup, this.hitEnemyWithAoe, null, this);
        this.physics.add.overlap(this.playerAoeExplosionGroup, this.enemyGroup, this.hitEnemyWithAoeExplosion, null, this);

        this.physics.add.overlap(this.upgradePickupGroup, this.player, this.hitUpgradePickup, null, this);
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
        if (this.inBetweenRounds === 2)
            this.background.tilePositionY -= 2;
    }

    startGame() {
        this.gameStarted = true;
        this.tutorialText.setVisible(false);
        this.gameOverText.setVisible(false);
        this.player.revive();

    }

    fireBullet(x, y, power) {
        const bullet = new PlayerBullet(this, x, y, power);
        this.playerBulletGroup.add(bullet);
    }

    removeBullet(bullet) {
        this.playerBulletGroup.remove(bullet, true, true);
    }

    fireAoe(x, y, power) {
        const aoe = new AoeBullet(this, x, y, power);
        this.playerAoeGroup.add(aoe);
    }

    removeAoe(aoe) {
        this.playerAoeGroup.remove(aoe, true, true);
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
        this.addEnemy(0, 0, 5);
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

    removeEnemy(enemy, withScore) {
        if (withScore) {

            if (this.inBetweenRounds === 0) {
                this.updateScore(enemy.getScorePoints());
            }

            if (Phaser.Math.Between(0, 100) < enemy.getChanceToDropUpgrade()) {
                const upgradeToSpawn = Phaser.Math.Between(0, 100) > 50 ?
                    new AoeTimerReset(this, enemy.GetXY().x, enemy.GetXY().y, enemy.GetSpeed()) :
                    new MainWeaponFireRateUpgrade(this, enemy.GetXY().x, enemy.GetXY().y, enemy.GetSpeed());
                this.upgradePickupGroup.add(upgradeToSpawn);
            }

        }
        this.enemyGroup.remove(enemy, true, true);

        if (this.inBetweenRounds === 1 && this.enemyGroup.getLength() === 0) {
            this.inBetweenRounds = 2;
            this.showInRoundReward();
        }
    }


    addExplosion(x, y) {
        new Explosion(this, x, y);
    }


    addAoeExplosion(x, y, power) {
        const aoeExplosion = new AoeExplosion(this, x, y, power);
        this.playerAoeExplosionGroup.add(aoeExplosion);
    }

    removeAoeExplosion(aoeExplosion) {
        this.playerAoeExplosionGroup.remove(aoeExplosion, true, true);
    }


    removeUpgradePickup(upgradePickup) {
        this.upgradePickupGroup.remove(upgradePickup, true, true);
    }

    hitPlayer(player, obstacle) {
        this.addExplosion(player.x, player.y);
        player.hit(obstacle.getPower());
        obstacle.die();

        this.GameOver();
    }

    hitEnemy(bullet, enemy) {
        bullet.remove();
        enemy.hit(bullet.getPower());
    }

    hitEnemyWithAoe(aoe, enemy) {
        aoe.remove();
    }

    hitEnemyWithAoeExplosion(explosionAoe, enemy) {
        explosionAoe.remove();
        enemy.hit(explosionAoe.getPower());
    }

    hitUpgradePickup(upgradePickup, player) {
        player.upgrade(upgradePickup);
        upgradePickup.remove();
    }


    updateScore(points) {
        this.scoreUIObject.setScoreValue(this.scoreUIObject.getScoreValue() + points);
    }

    getInBetweenRound() {
        return this.inBetweenRounds;
    }


    setInBetweenRound(value) {
        this.inBetweenRounds = value;

    }


    showInRoundReward() {
        this.roundReward.showReward(this.scoreUIObject.getScoreMilestoneIndex());
    }

    launchNextRound() {
        this.scoreUIObject.setScoreMilestoneIndex(this.scoreUIObject.getScoreMilestoneIndex() + 1);
        this.inBetweenRounds = 0;
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }
}

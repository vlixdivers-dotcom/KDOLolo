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
import ShieldedEnemy from '../gameObjects/ShieldedEnemy.js';
import ShooterEnemy from '../gameObjects/ShooterEnemy.js';
import SmokeEnemy from '../gameObjects/SmokeEnemy.js';
import TankEnemy from '../gameObjects/TankEnemy.js';
import EnemyBullet from '../gameObjects/EnemyBullet.js';

import EnemySpawner from '../gameObjects/EnemySpawner.js'

import Explosion from '../gameObjects/Explosion.js';

import Presentateur from '../gameObjects/Presentateur.js';

import Score from '../gameObjects/Score.js';

import MainWeaponFireRateUpgrade from '../gameObjects/MainWeaponFireRateUpgrade.js'
import TempExplosiveShotUpgrade from '../gameObjects/TempExplosiveShotUpgrade.js'
import TempOneMoreShotUpgrade from '../gameObjects/TempOneMoreShotUpgrade.js'
import TempShieldUpgrade from '../gameObjects/TempShieldUpgrade.js'
import HealUpgrade from '../gameObjects/Heal.js'
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
        const cursor = this.input.activePointer;
        this.updateMap();

        this.scale.lockOrientation('portrait');


        if (this.inBetweenRounds === 4) {
            this.presentateur.startStoryText(this.scoreUIObject.getScoreMilestoneIndex(), cursor.isDown);
            return;
        }


        if (!this.gameStarted) {
            if (cursor.isDown) this.startGame();
            return;
        }

        if (this.inBetweenRounds === 2) {

            return;
        }


        for (let i = 0; i < this.tempUpgradeUI.length; i++) {
            if (this.tempUpgradeUI[i].object !== null) {
                this.tempUpgradeUI[i].object.setAlpha(this.tempUpgradeUI[i].refTimer);
            }
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

        this.spawnEnemyCounterValue = (6);
        this.spawnEnemyCounter = (0);

        this.map; // rference to tile map
        this.groundLayer; // reference to ground layer of tile map

        this.presentateur;

        this.scoreUIObject;

        this.aoe_frame;

        this.nb_aoe;

        this.blackRectangle;

        this.inBetweenRounds = 4;

        this.tempUpgradeUI = [
            {
                object: null,
                image: ASSETS.image.tempExplosiveShot.key,
                type: "explosiveShot",
                refTimer: 0,
            },
            {
                object: null,
                image: ASSETS.image.tempMultiShot.key,
                type: "multiShot",
                refTimer: 0,
            },
            {
                object: null,
                image: ASSETS.image.tempFireRate.key,
                type: "fireRate",
                refTimer: 0,
            },
            {
                object: null,
                image: ASSETS.image.tempShield.key,
                type: "shield",
                refTimer: 0,
            }
        ]

        this.maxRound = 4;

        this.enemySpawner = new EnemySpawner(this, 0, -180);

        this.healthPointUI = [];
        this.healthPointEmptyUI = [];
    }

    setHealthPointAlpha(index, litUp) {
        this.healthPointUI[index].setAlpha(litUp);
    }

    initGameUi() {
        // Create tutorial text
        this.tutorialText = this.add.text(this.centreX, this.centreY, '', {
            fontFamily: 'vintageWarehouse', fontSize: 42, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100);


        this.scoreUIObject = new Score(this);


        this.scoreUIObject.setNormalScoreLetters([
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 1, 0 + 16 * 2, ASSETS.image.aN.key).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 2, 0 + 16 * 2, ASSETS.image.cN.key).setOrigin(0.5).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 3, 0 + 16 * 2, ASSETS.image.aN.key).setOrigin(0.5).setDepth(100),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 4, 0 + 16 * 2, ASSETS.image.bN.key).setOrigin(0.5).setDepth(100),
        ]);

        this.scoreUIObject.setLitUpScoreLetters([
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 1, 0 + 16 * 2, ASSETS.image.aL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 2, 0 + 16 * 2, ASSETS.image.cL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 3, 0 + 16 * 2, ASSETS.image.aL.key).setDepth(100).setAlpha(0),
            new Phaser.GameObjects.Sprite(this, 0 + 16 * 4, 0 + 16 * 2, ASSETS.image.bL.key).setDepth(100).setAlpha(0),
        ]);



        for (let i = 0; i < this.scoreUIObject.getNormalScoreLetters().length; i++) {
            this.add.existing(this.scoreUIObject.getNormalScoreLetters()[i]);
        }
        for (let i = 0; i < this.scoreUIObject.getLitUpScoreLetters().length; i++) {
            this.add.existing(this.scoreUIObject.getLitUpScoreLetters()[i]);
        }


        for (let i = 0; i < 3; i++) {

            this.healthPointUI.push(this.add.image(12 + (24 * i), 75, ASSETS.image.healthFull.key).setOrigin(0.5).setDepth(100));
            this.healthPointEmptyUI.push(this.add.image(this.healthPointUI[i].x, 75, ASSETS.image.healthEmpty.key).setOrigin(0.5).setDepth(90));
        }

        const presentateurBoard = this.add.rectangle(0, this.scale.height - 50, 320, 50, '#FFFFFF').setOrigin(0).setDepth(100);
        this.presentateur = new Presentateur(this, 320 - (96 / 2), 480 - (50 + (80 / 2)), presentateurBoard);



        this.aoe_frame = this.add.image(25, this.scale.height - 65, 'aoe_frame', 1).setOrigin(0.5).setDepth(100);
        this.nb_aoe = this.add.text(this.aoe_frame.x + 10, this.aoe_frame.y - 15, "X1", {
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


        for (let i = 0; i < this.tempUpgradeUI.length; i++) {
            this.tempUpgradeUI[i].object = this.add.image(
                25 * 1,
                this.scale.height - 110 - (35 * i),
                this.tempUpgradeUI[i].image).setOrigin(0.5).setDepth(100).setAlpha(0);
        }

    }

    initAnimations() {
        this.anims.create({
            key: ANIMATION.explosion.key,
            frames: this.anims.generateFrameNumbers(ANIMATION.explosion.texture, ANIMATION.explosion.config),
            frameRate: ANIMATION.explosion.frameRate,
            repeat: ANIMATION.explosion.repeat
        });

        this.anims.create({
            key: ANIMATION.smokeScreen.key,
            frames: this.anims.generateFrameNumbers(ANIMATION.smokeScreen.texture, ANIMATION.smokeScreen.config),
            frameRate: ANIMATION.smokeScreen.frameRate,
            repeat: ANIMATION.smokeScreen.repeat
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


    setTempUpgradeUITimer(index, value) {
        this.tempUpgradeUI[index].refTimer = value;
    }

    initPlayer() {
        this.player = new Player(this, this.centreX, this.scale.height, 8);
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

    fireBullet(x, y, power, explosive, piercing) {
        console.log(explosive);

        const bullet = new PlayerBullet(this, x, y, power, explosive, piercing);

        this.playerBulletGroup.add(bullet);
    }

    removeBullet(bullet) {
        this.playerBulletGroup.remove(bullet, true, true);
    }

    removeBulletCollision(bullet) {
        this.playerBulletGroup.remove(bullet, false, true);
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

        this.enemySpawner.spawnEnemies(this.scoreUIObject.getScoreMilestoneIndex());
        // this.spawnEnemy = false;
        // const spawnCounter = 5 * 600;//Phaser.Math.RND.between(8, 12) * 100; // delay between spawning of each enemy
    }

    addEnemy(enemy) {
        this.enemyGroup.add(enemy);
    }

    removeEnemy(enemy, withScore) {
        if (withScore) {

            if (this.inBetweenRounds === 0) {
                this.updateScore(enemy.getScorePoints());
            }

            if (Phaser.Math.Between(0, 100) < enemy.getChanceToDropUpgrade() + ((this.scoreUIObject.getScoreMilestoneIndex() * 10) / 2)) {
                let upgrade = this.spawnUpgrade(5, enemy.GetXY().x, enemy.GetXY().y, enemy.GetSpeed());

                if (upgrade !== null)
                    this.upgradePickupGroup.add(upgrade);
            }

        }
        this.enemyGroup.remove(enemy, true, true);

        if (this.inBetweenRounds === 1 && this.enemyGroup.getLength() === 0) {
            this.inBetweenRounds = 2;
            this.showInRoundReward();
        }
    }

    spawnUpgrade(max, x, y, speed) {
        let upgrade = null;
        switch (Phaser.Math.Between(0, max - (this.maxRound - this.scoreUIObject.getScoreMilestoneIndex()))) {
            case 0:
                upgrade = this.upgradeChancesToDrop(2, 5, 15, 30, x, y, speed);
                break;
            case 1:
                upgrade = this.upgradeChancesToDrop(10, 15, 30, 45, x, y, speed);
                break;
            case 2:
                upgrade = this.upgradeChancesToDrop(10, 20, 35, 50, x, y, speed);
                break;
            case 3:
                upgrade = this.upgradeChancesToDrop(15, 25, 30, 50, x, y, speed);
                break;
            case 4:
                upgrade = this.upgradeChancesToDrop(15, 25, 30, 50, x, y, speed);
                break;
            case 5:
                upgrade = this.upgradeChancesToDrop(25, 50, 70, 90, x, y, speed);
                break;
        }

        return upgrade;
    }

    upgradeChancesToDrop(explosiveChances, moreShotsChances, shieldChances, aoeTimerResetChances, x, y, speed) {
        let upgrade = null;

        let mainUpgradeChances = Phaser.Math.Between(0, 100);

        if (mainUpgradeChances <= 60) {
            upgrade = new MainWeaponFireRateUpgrade(this, x, y, speed);
            return upgrade;
        }
        else if (mainUpgradeChances <= 70 + ((this.player.getMaxHealth() - this.player.getHealth()) * 10)) {
            upgrade = new HealUpgrade(this, x, y, speed);
            return upgrade;
        }


        let chances = Phaser.Math.Between(0, 100);
        if (chances <= explosiveChances) {
            upgrade = new TempExplosiveShotUpgrade(this, x, y, speed);
            return upgrade;
        }
        if (chances <= moreShotsChances) {
            upgrade = new TempOneMoreShotUpgrade(this, x, y, speed);
            return upgrade;
        }
        if (chances <= shieldChances) {
            upgrade = new TempShieldUpgrade(this, x, y, speed);
            return upgrade;
        }
        if (chances <= aoeTimerResetChances) {
            upgrade = new AoeTimerReset(this, x, y, speed);
            return upgrade;
        }

        return upgrade;
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
        player.hit(obstacle.getPower());

        if (obstacle.getData('enemyType') === 'smoke') {
            player.startSmokeEffect(obstacle.getTimeBeforeRemove());
            return;
        }

        this.addExplosion(player.x, player.y);

        if (obstacle.getData("enemyType") && obstacle.getHealth() > 10) return;

        obstacle.die();

    }

    hitEnemy(bullet, enemy) {
        if (enemy.getData('enemyType') === 'smoke') {
            return;
        }

        bullet.setEnemiesTouched(bullet.getEnemiesTouched() + 1)
        enemy.hit(bullet.getPower());

        if (bullet.getIsExplosive() && bullet.getEnemiesTouched() < 2) return;

        if (!bullet.getIsPiercing()) {
            bullet.remove();
        }



    }

    hitEnemyWithAoe(aoe, enemy) {
        if (enemy.getData('enemyType') === 'smoke') {
            return;
        }
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
        if (this.scoreUIObject.getScoreMilestoneIndex() >= this.maxRound - 1) {

            this.launchNextRound()
            return;
        }
        this.roundReward.showReward(this.scoreUIObject.getScoreMilestoneIndex());
    }

    launchNextRound() {

        this.scoreUIObject.setScoreMilestoneIndex(this.scoreUIObject.getScoreMilestoneIndex() + 1);
        this.inBetweenRounds = 4;
    }

    finishPresentateurDialog() {
        if (this.scoreUIObject.getScoreMilestoneIndex() >= this.maxRound ) {
            this.cameras.getCamera('').fadeOut(1500, 0, 0, 0, (camera, progress) => { }).on("camerafadeoutcomplete", () => this.scene.start('EndGame'));
            return;
        }
        this.inBetweenRounds = 0;
        this.spawnEnemyCounter = 0;
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }
}

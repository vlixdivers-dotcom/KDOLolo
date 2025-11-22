import ASSETS from '../assets.js';

export default class EnemyFlying extends Phaser.Physics.Arcade.Sprite {
    health = 1; // enemy health
    scorePoints = 1;
    fireCounterMin = 100; // minimum fire rate
    fireCounterMax = 300; // maximum fire rate
    fireCounter;
    power = 1; // enemy strength
    speed = 40;

    chanceToDropUpgrade = 3;


    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemy.key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(10);
        this.scene = scene;

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.y += this.speed * (delta / 1000);


        if (this.y > this.scene.scale.height + 64) {
            this.die(false);
        }
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }

    die(withScore = true) {
        if (withScore) {
            this.scene.addExplosion(this.x, this.y);
        }
            this.scene.removeEnemy(this, withScore);
    }

    fire() {
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
        this.scene.fireEnemyBullet(this.x, this.y, this.power);
    }

    initPath(pathId, speed) {
    }


    getHealth(){
        return this.health;
    }

    getPower() {
        return this.power;
    }

    remove() {
        this.scene.removeEnemy(this);
    }


    getChanceToDropUpgrade() {
        return this.chanceToDropUpgrade;
    }


    getScorePoints(){
        return this.scorePoints;
    }

    GetXY() {
        return { x: this.x, y: this.y }
    }

    GetSpeed() {
        return this.speed;
    }
}
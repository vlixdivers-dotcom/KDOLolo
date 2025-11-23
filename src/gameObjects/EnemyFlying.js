import ASSETS from '../assets.js';

export default class EnemyFlying extends Phaser.Physics.Arcade.Sprite {
    health = 1; // enemy health
    scorePoints = 1;
    fireCounterMin = 100; // minimum fire rate
    fireCounterMax = 300; // maximum fire rate
    fireCounter;
    power = 1; // enemy strength
    speed = 50;

    chanceToDropUpgrade = 30;

    baseImage;
    touchedImage;
    touchedImageShown = false;


    slideAimX = 0;
    slideNeg = false;
    isSliding = false;
    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemy.key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(10);
        this.scene = scene;

        this.baseImage = ASSETS.image.enemy.key;
        this.touchedImage = ASSETS.image.enemyTouched.key;

        this.setDataEnabled();
        this.setData('enemyType', 'crs');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.isSliding) {

            this.x += ((this.speed * 10) * (delta / 1000)) * this.slideNeg;

            if (this.slideNeg > 0 && this.x >= this.slideAimX) {
                this.isSliding = false;
            }
            else if (this.slideNeg < 0 && this.x <= this.slideAimX) {
                this.isSliding = false;

            }

            return;
        }

        this.y += this.speed * (delta / 1000);


        if (this.y > this.scene.scale.height + 64) {
            this.die(false);

            return;
        }

        if (this.touchedImageShown) {
            this.setTexture(this.baseImage)
            this.touchedImageShown = false;
        }





    }

    hit(damage) {

        this.setTexture(this.touchedImage);
        this.touchedImageShown = true;
        if (this.isSliding) return;
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

    getWidth() {
        return this.width;
    }

    getHealth() {
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


    getScorePoints() {
        return this.scorePoints;
    }

    GetXY() {
        return { x: this.x, y: this.y }
    }

    GetSpeed() {
        return this.speed;
    }


    startSlide(value) {
        this.slideAimX = this.x;
        this.x = value;
        this.slideNeg = this.x < this.slideAimX ? 1 : -1;
        console.log(value);

        this.isSliding = true;

    }
}
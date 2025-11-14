import ASSETS from '../assets.js';

export default class EnemyFlying extends Phaser.Physics.Arcade.Sprite {
    health = 1; // enemy health
    scorePoints = 1;
    fireCounterMin = 100; // minimum fire rate
    fireCounterMax = 300; // maximum fire rate
    fireCounter;
    power = 1; // enemy strength
    speed = 50;
    // path coordinates for enemy to follow
    paths = [
        [[200, -50], [1080, 160], [200, 340], [1080, 520], [200, 700], [1080, 780]],
        [[-50, 200], [1330, 200], [1330, 400], [-50, 400], [-50, 600], [1330, 600]],
        [[-50, 360], [640, 50], [1180, 360], [640, 670], [50, 360], [640, 50], [1180, 360], [640, 670], [-50, 360]],
        [[1330, 360], [640, 50], [50, 360], [640, 670], [1180, 360], [640, 50], [50, 360], [640, 670], [1330, 360]],
    ]

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
            this.scene.updateScore(this.scorePoints);
            this.scene.addExplosion(this.x, this.y);
            this.scene.removeEnemy(this);
        }
    }

    fire() {
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
        this.scene.fireEnemyBullet(this.x, this.y, this.power);
    }

    initPath(pathId, speed) {
    }

    getPower() {
        return this.power;
    }

    remove() {
        this.scene.removeEnemy(this);
    }


    GetXY(){
        return {x: this.x, y: this.y}
    }

    GetSpeed()
    {
        return this.speed;
    }
}
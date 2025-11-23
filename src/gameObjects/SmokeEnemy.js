import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class SmokeEnemy extends EnemyFlying {

    timeBeforeRemove = 2;
    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemy.key);

        this.power = 0;
        this.setTexture(ASSETS.spritesheet.smokeScreen.key, 1);
        this.anims.play(ANIMATION.smokeScreen.key);
        this.setOrigin(0.5,0)
        this.setSize(this.width,this.height/2);

        this.setDataEnabled();
        this.setData('enemyType', 'smoke');
    }

    getTimeBeforeRemove(){
        return this.timeBeforeRemove;
    }

}
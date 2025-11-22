import EnemyFlying from '../gameObjects/EnemyFlying.js';
import ShieldedEnemy from '../gameObjects/ShieldedEnemy.js';
import ShooterEnemy from '../gameObjects/ShooterEnemy.js';
import SmokeEnemy from '../gameObjects/SmokeEnemy.js';
import TankEnemy from '../gameObjects/TankEnemy.js';


export default class EnemySpawner extends Phaser.GameObjects.GameObject {

    enemiesSpawnPossibilities = [
        [
            [[0, 0, 0, 2, 0]], [[0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0]]
        ],
        [
            [1, 1, 0, 0, 1, 1], [0, 0, 2, 2, 0]
        ]
    ]

    y;
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.y = y;

        console.log(this.y)

    }

    spawnEnemies(round) {
        const possibility = Phaser.Math.Between(0, this.enemiesSpawnPossibilities[round].length - 1)
        for (let i = 0; i < this.enemiesSpawnPossibilities[round][possibility].length; i++) {
            let lastEnemy = null;
            for (let j = 0; j < this.enemiesSpawnPossibilities[round][possibility][i].length; j++) {
                const enemyValue = this.enemiesSpawnPossibilities[round][possibility][i][j];
                let enemy = null
                switch (enemyValue) {
                    case 0:
                        enemy = new EnemyFlying(this.scene, -100, -100);
                        break;
                    case 1:
                        enemy = new ShieldedEnemy(this.scene, -100, -100);
                        break;
                    case 2:
                        enemy = new SmokeEnemy(this.scene, -100, -100);
                        break;
                    case 3:
                        enemy = new ShooterEnemy(this.scene, -100, -100);
                        break;
                    case 4:
                        enemy = new TankEnemy(this.scene, -100, -100);
                        break;
                    default:
                        enemy = new EnemyFlying(this.scene, -100, -100);
                        break;

                }
                console.log(enemy.width);

                enemy.setX((lastEnemy === null ? enemy.width / 2 : lastEnemy.x + (lastEnemy.width / 2 + enemy.width / 2)));
                enemy.setY((this.y - 32) * i)

                console.log(lastEnemy === null ? 0 : lastEnemy.getWidth());
                this.scene.addEnemy(enemy);

                lastEnemy = enemy;
            }
        }

    }

}
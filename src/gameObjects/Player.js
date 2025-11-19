import ASSETS from '../assets.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityIncrement = 50;
    velocityMax = 500;
    drag = 1000;

    unchangedFireRate = 1.5;
    fireRate = 1.5;
    fireCounter = 0;

    minFireRate = 0.1;
    maxFireRate = 2.1;

    shotPower = 1;

    molotovFireRate = 20;
    molotovFireCounter = 0;
    nbMolotov = 1;
    maxNBMolotov = 1;


    molotovPower = 3;

    health = 1;

    clickCount = 0;
    clickCountTimerValue = 0.2;
    clickCountTimer = 0.2;
    inPointerEvent = false;


    chanceToFireMultiShot = { unchanged: 0, realValue: 100, unchangedNBShots: 1, realNBShots: 1, maxNBShots: 4 };
    chanceToFireExplosiveShot = { unchanged: 0, realValue: 0 };
    chanceToFirePiercingShot = { unchanged: 0, realValue: 0 };

    timedUpgradeManagerObjectArray = [];


    constructor(scene, x, y, shipId) {
        super(scene, x, y, ASSETS.spritesheet.ships.key, shipId);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(32, 32);
        this.setCollideWorldBounds(true); // prevent ship from leaving the screen
        this.setDepth(50); // make ship appear on top of other game objects
        this.scene = scene;
        this.setMaxVelocity(this.velocityMax); // limit maximum speed of ship
        this.setDrag(this.drag);



    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.scene.getInBetweenRound() === 2) return;

        if (this.fireCounter > 0) this.fireCounter -= delta / 1000;
        if (this.nbMolotov < this.maxNBMolotov) {
            this.molotovFireCounter -= delta / 1000;
            if (this.molotovFireCounter <= 0) {
                this.molotovFireCounter = this.molotovFireRate;
                this.nbMolotov++;
            }
        }
        if (this.timedUpgradeCounter > 0) this.timedUpgradeCounter -= delta / 1000;



        this.checkInput(delta / 1000);
        this.manageTimedUpgrade(delta / 1000);

    }


    manageTimedUpgrade(dt) {
        if (this.timedUpgradeManagerObjectArray.length > 0) {

            for (let i = 0; i < this.timedUpgradeManagerObjectArray.length; i++) {
                if (this.timedUpgradeManagerObjectArray[i].active) {
                    if (this.timedUpgradeManagerObjectArray[i].timer > 0) {
                        this.timedUpgradeManagerObjectArray[i].timer -= dt;
                    }
                    else {
                        switch (this.timedUpgradeManagerObjectArray[i].type) {
                            case 'mainWeaponFireRate':
                                this.fireRate = this.unchangedFireRate;
                                break;
                        }
                        this.timedUpgradeManagerObjectArray[i].active = false;
                    }

                }

            }

        }
    }

    create() {
        super.create();

    }

    checkInput(dt) {
        // const cursors = this.scene.cursors; // get cursors object from Game scene
        const pointer = this.scene.input.activePointer;

        if (this.clickCount >= 2) {
            this.clickCount = 0;
            this.clickCountTimer = this.clickCountTimerValue;
            this.launchAoe();
            this.fireCounter = this.fireRate;
            return;
        }


        //const moveDirection = { x: 0, y: 0 }; // default move direction
        if (pointer.isDown) {
            this.fire();
            this.x = pointer.x;

            if (!this.inPointerEvent) {
                this.clickCount++;
                this.clickCountTimer = this.clickCountTimerValue;
            }
            this.inPointerEvent = true;

        } else {
            this.inPointerEvent = false;

        }


        this.clickCountTimer -= dt;
        if (this.clickCountTimer <= 0) {
            this.clickCount = 0;
            this.clickCountTimer = this.clickCountTimerValue;
        }
    }

    fire() {
        if (this.fireCounter > 0) return;

        this.fireCounter = this.fireRate;

        if (Phaser.Math.Between(0, 100) < this.chanceToFireMultiShot.realValue) {

            let shotPatterns;
            const xGap = 20;
            const yGap = 20;

            switch (this.chanceToFireMultiShot.realNBShots) {
                case 2:
                    shotPatterns = [{ x: this.x - xGap, y: this.y }, { x: this.x + xGap, y: this.y }];
                    break;
                case 3:
                    shotPatterns = [{ x: this.x - xGap, y: this.y }, { x: this.x + xGap, y: this.y }, { x: this.x, y: this.y - yGap }];
                    break;
                case 4:
                    shotPatterns = [{ x: this.x - (xGap + 5), y: this.y }, { x: this.x + (xGap + 5), y: this.y }, { x: this.x - (xGap - 10), y: this.y - yGap }, { x: this.x + (xGap - 10), y: this.y - yGap }];
                    break;
                default:
                    shotPatterns = [{ x: this.x, y: this.y }];
                    break;
            }


            for (let i = 0; i < this.chanceToFireMultiShot.realNBShots; i++) {
                if (i < shotPatterns.length)
                    this.scene.fireBullet(shotPatterns[i].x, shotPatterns[i].y, this.shotPower);
            }

        }

    }

    launchAoe() {
        if (this.nbMolotov <= 0) return;
        this.nbMolotov--;
        this.molotovFireCounter = this.molotovFireRate;
        this.scene.fireAoe(this.x, this.y, this.molotovPower);
    }

    GetMolotovFireCounterPercentage() {
        return Phaser.Math.Clamp(1 - (this.molotovFireCounter / this.molotovFireRate), 0.2, 1);
    }

    GetNBMolotov() {
        return this.nbMolotov;
    }

    addAMolotov()
    {
        if (this.nbMolotov < this.maxNBMolotov){
            this.nbMolotov++;
        }
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }
    revive() {

        this.setVisible(true); // destroy sprite so it is no longer updated
    }
    die() {
        this.scene.addExplosion(this.x, this.y);
        this.setVisible(false); // destroy sprite so it is no longer updated
    }


    GetFireRate() {
        return this.fireRate;
    }


    setFireRate(value, permanentUpgrade = false) {
        let clampedValue = Phaser.Math.Clamp(value, this.minFireRate, this.maxFireRate)
        if (permanentUpgrade == true) {
            this.unchangedFireRate = clampedValue;
        }
        this.fireRate = clampedValue;
        this.fireCounter = this.fireRate;
    }


    setNbShots(nbShotsValue, permanentUpgrade = false) {
        let clampedNBValue = Phaser.Math.Clamp(nbShotsValue, 1, this.maxNBShots);
        if (permanentUpgrade == true) {
            this.chanceToFireMultiShot.unchangedNBShots = clampedNBValue;
        }
        this.chanceToFireMultiShot.realNBShots = clampedNBValue;
    }


    setChanceToMultiShots(chanceValue, permanentUpgrade = false) {
        if (permanentUpgrade == true) {
            this.chanceToFireMultiShot.unchanged = chanceValue;
        }
        this.chanceToFireMultiShot.realValue = chanceValue;
    }


    upgrade(upgradePickup) {
        upgradePickup.SetUpgradeEffect(this);
    }


    StartTimedUpgradeCounter(upgradePickup) {

        if (this.timedUpgradeManagerObjectArray.length > 0) {

            const index = this.timedUpgradeManagerObjectArray.findIndex((element) => element.type === upgradePickup.getData('timedType'));

            if (index >= 0) {
                this.timedUpgradeManagerObjectArray[index].timer = upgradePickup.getTimeBeforeRemove();
                this.timedUpgradeManagerObjectArray[index].active = true;
                return;
            }
        }

        const newObjectToPush = {
            type: upgradePickup.getData('timedType'),
            timer: upgradePickup.getTimeBeforeRemove(),
            active: true,
        }

        this.timedUpgradeManagerObjectArray.push(newObjectToPush);
    }


    haveLivreDeMerdellaUpgrade() {
        this.setFireRate(this.GetFireRate() - 0.5, true);
    }


    haveWheyUpgrade() {
        this.setChanceToMultiShots(30, true);
        this.setNbShots(2);

    }

    haveLarmeUpgrade() {
        this.chanceToFireExplosiveShot.unchanged = 30;
        this.chanceToFireExplosiveShot.realValue = 30;
    }

    haveTalcUpgrade() {
        this.setFireRate(this.GetFireRate() - 0.5, true);

    }

    haveSainteSolineUpgrade() {
        this.maxNBMolotov = 3;
        this.nbMolotov = this.maxNBMolotov;
    }

    haveSlipUpgrade() {
        this.setFireRate(this.GetFireRate() - 0.5, true);
        this.shotPower = 2;
    }

    haveLesFaitUpgrade() {
        this.chanceToFirePiercingShot.unchanged = 20;
        this.chanceToFirePiercingShot.realValue = 20;
    }

    haveTroisiemeOeilUpgrade() {
        this.setNbShots(3, true);
    }

}
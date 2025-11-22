export default {
    'audio': {
        introMusic: {
            key: 'introMusic',
            args: ['assets/Music/LInternationaleLoop.ogg']
        },
    },
    'image': {
        enemy: {
            key: 'crs',
            args: ['assets/enemies/Enemy.png', { frameWidth: 64, frameHeight: 64 }]
        },
        enemyLBD: {
            key: 'enemyLBD',
            args: ['assets/enemies/ShooterEnemy.png', { frameWidth: 32, frameHeight: 64 }]
        },
        enemyShielded: {
            key: 'enemyShielded',
            args: ['assets/enemies/ShieldedEnemy.png', { frameWidth: 32, frameHeight: 64 }]
        },
        enemyTank: {
            key: 'enemyTank',
            args: ['assets/enemies/TankEnemy.png', { frameWidth: 176, frameHeight: 128 }]
        },

        tempExplosiveShot: {
            key: 'tempExplosiveShot',
            args: ['assets/Upgrade/TempExplosiveRate.png', { frameWidth: 32, frameHeight: 32 }]
        },
        tempMultiShot: {
            key: 'tempMultiShot',
            args: ['assets/Upgrade/TempDoubleShot.png', { frameWidth: 32, frameHeight: 32 }]
        },
        tempShield: {
            key: 'tempShield',
            args: ['assets/Upgrade/TempShield.png', { frameWidth: 32, frameHeight: 32 }]
        },
        tempFireRate: {
            key: 'tempFireRate',
            args: ['assets/Upgrade/TempFireRate.png', { frameWidth: 32, frameHeight: 32 }]
        },
        molotovAdd: {
            key: 'molotovAdd',
            args: ['assets/Upgrade/MolotovAdd.png', { frameWidth: 32, frameHeight: 32 }]
        },
        heal: {
            key: 'heal',
            args: ['assets/Upgrade/Heal.png', { frameWidth: 32, frameHeight: 32 }]
        },
        shieldImage: {
            key: 'shieldImage',
            args: ['assets/Shield.png', { frameWidth: 64, frameHeight: 75 }]
        },
        livre: {
            key: 'livre',
            args: ['assets/PermUpgrade/Livre.png', { frameWidth: 94, frameHeight: 94 }]
        },
        whey: {
            key: 'whey',
            args: ['assets/PermUpgrade/Whey.png', { frameWidth: 94, frameHeight: 94 }]
        },
        larmes: {
            key: 'larmes',
            args: ['assets/PermUpgrade/Larmes.png', { frameWidth: 94, frameHeight: 94 }]
        },
        talc: {
            key: 'talc',
            args: ['assets/PermUpgrade/Talc.png', { frameWidth: 94, frameHeight: 94 }]
        },
        sainte_soline: {
            key: 'sainte_soline',
            args: ['assets/PermUpgrade/Sainte_Soline.png', { frameWidth: 94, frameHeight: 94 }]
        },
        slip: {
            key: 'slip',
            args: ['assets/PermUpgrade/Slip.png', { frameWidth: 94, frameHeight: 94 }]
        },
        aN: {
            key: 'aN',
            args: ['assets/ScoreLetter/aN.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        bN: {
            key: 'bN',
            args: ['assets/ScoreLetter/bN.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        cN: {
            key: 'cN',
            args: ['assets/ScoreLetter/cN.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        aL: {
            key: 'aL',
            args: ['assets/ScoreLetter/aL.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        bL: {
            key: 'bL',
            args: ['assets/ScoreLetter/bL.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        cL: {
            key: 'cL',
            args: ['assets/ScoreLetter/cL.png', {
                frameWidth: 16,
                frameHeight: 29,
            }]
        },
        healthFull: {
            key: 'healthFull',
            args: ['assets/HealthPointFull.png', {
                frameWidth: 24,
                frameHeight: 24,
            }]
        },
        healthEmpty: {
            key: 'healthEmpty',
            args: ['assets/HealthPointVide.png', {
                frameWidth: 24,
                frameHeight: 24,
            }]
        },
        startBackground: {
            key: 'startBackground',
            args: ['assets/TitleScreen/Background.png', {
                frameWidth: 320,
                frameHeight: 480,
            }]
        },
        acceuilScreen: {
            key: 'acceuilScreen',
            args: ['assets/Acceuil.png', {
                frameWidth: 320,
                frameHeight: 480,
            }]
        },
        startTitle: {
            key: 'startTitle',
            args: ['assets/TitleScreen/Title.png', {
                frameWidth: 151,
                frameHeight: 168,
            }]
        },
        tete1: {
            key: 'tete1',
            args: ['assets/TitleScreen/Tete1.png', {
                frameWidth: 69,
                frameHeight: 83,
            }]
        },
        tete2: {
            key: 'tete2',
            args: ['assets/TitleScreen/Tete2.png', {
                frameWidth: 79,
                frameHeight: 88,
            }]
        },
        tete3: {
            key: 'tete3',
            args: ['assets/TitleScreen/Tete3.png', {
                frameWidth: 53,
                frameHeight: 71,
            }]
        },
        tete4: {
            key: 'tete4',
            args: ['assets/TitleScreen/Tete4.png', {
                frameWidth: 55,
                frameHeight: 73,
            }]
        },
        tete5: {
            key: 'tete5',
            args: ['assets/TitleScreen/Tete5.png', {
                frameWidth: 49,
                frameHeight: 71,
            }]
        },
        tete6: {
            key: 'tete6',
            args: ['assets/TitleScreen/Tete6.png', {
                frameWidth: 66,
                frameHeight: 81,
            }]
        },
    },
    'spritesheet': {
        ships: {
            key: 'ships',
            args: ['assets/player.png', {
                frameWidth: 64,
                frameHeight: 75,
            }]
        },
        tiles: {
            key: 'tiles',
            args: ['assets/tiles.png', {
                frameWidth: 32,
                frameHeight: 32
            }]
        },
        bullets: {
            key: 'stone',
            args: ['assets/bullet.png', {
                frameWidth: 32,
                frameHeight: 32,
            }]
        },
        aoe: {
            key: 'aoe',
            args: ['assets/aoe.png', {
                frameWidth: 32,
                frameHeight: 32,
            }]
        },
        aoeExplosion: {
            key: 'aoeExplosion',
            args: ['assets/explosion_sheet.png', {
                frameWidth: 320,
                frameHeight: 160,
            }]
        },
        aoeFrame: {
            key: 'aoeFrame',
            args: ['assets/aoe_frame.png', {
                frameWidth: 24,
                frameHeight: 24,
            }]
        },
        presentateur: {
            key: 'presentateur',
            args: ['assets/Presentateur/presentateur_sheet.png', {
                frameWidth: 96,
                frameHeight: 80,
            }]
        },
        pickupPlaceHolder: {
            key: 'pickupPlaceHolder',
            args: ['assets/pickup/placeholder.png', {
                frameWidth: 32,
                frameHeight: 32,
            }]
        },
        smokeScreen: {
            key: 'smokeScreen',
            args: ['assets/enemies/Smoke15Frames.png', { frameWidth: 64, frameHeight: 64 }]
        },

    }

    // 'scoreUILitUp': {
    //     a: {
    //         key: 'a',
    //         args: ['assets/ScoreLetter/litUp/a.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    //     b: {
    //         key: 'b',
    //         args: ['assets/ScoreLetter/litUp/b.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    //     c: {
    //         key: 'c',
    //         args: ['assets/ScoreLetter/litUp/c.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    // }
};
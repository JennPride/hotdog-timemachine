import { Scene, GameObjects } from 'phaser';
import { Player } from '../../classes/player';
import { Goodie } from '../../classes/goodie';
import { Score, ScoreOperations } from '../../classes/score';

export class Level1 extends Scene {
    private player!: GameObjects.Sprite;
    private score!: Score
    private goodies!: Array<any>
    constructor() {
        super('level-1-scene');
        this.goodies = []
    }
    create(): void {
        let { width, height } = this.sys.game.canvas;
        this.player = new Player(this, width/2, height/2);
        this.score = new Score(this, 20, 20, 0);
        setInterval( _ => {
            this.spawnGoodies(width, height);
        }, 5000);
    }
    update(): void {
        this.player.update();
        const max_goodies = 7
        if (this.goodies.length > max_goodies) {
            const diff = this.goodies.length - max_goodies
            for (let i = 0; i < diff; i++) {
                this.goodies[i].destroy()
            }
            this.goodies.slice(diff)
        }
    }

    private spawnGoodies(width: number, height: number) {
        const goodieTypes = ['silentdisco']
        let yCoord = Phaser.Math.Between(0, height);
        let xCord = Phaser.Math.Between(0, width);
        let goodieType =  goodieTypes[Phaser.Math.Between(0, goodieTypes.length - 1)]
        let goodie = new Goodie(this, xCord, yCoord, goodieType)
        this.physics.add.collider(this.player, goodie, (player, goodie) => {
            goodie.destroy()
            if (goodieType === 'ice') {
                (player as Player).getDamage(2)
            } else if (goodieType === 'hotchocolate') {
                this.score.changeValue(ScoreOperations.INCREASE, 10)
            } else if (goodieType === 'silentdisco') {
                this.score.changeValue(ScoreOperations.INCREASE, 50)
            }
        });
        this.goodies.push(goodie)
    }
}
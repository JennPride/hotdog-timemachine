import { Scene, GameObjects } from 'phaser';
import { Player } from '../../classes/player';
import { Goodie } from '../../classes/goodie';
import { Karl } from '../../classes/karl';
import { EVENTS_NAME, SPEED_MAP } from '../../utils/consts'

export class Level1 extends Scene {
    private player!: GameObjects.Sprite;
    private goodies!: Array<GameObjects.Sprite>
    private karl!: GameObjects.Sprite
    private intervals!: Array<any>
    constructor() {
        super('level-1-scene');
        this.goodies = []
        this.intervals = []
    }
    create(): void {
        this.initListeners();
        let { width, height } = this.sys.game.canvas;
        this.player = new Player(this, width/2, height/2);
        this.intervals.push(setInterval(_ => {
            this.spawnGoodies(width, height);
        }, 5000));
        this.intervals.push(setInterval(_ => {
            if (this.karl) {
                this.karl.destroy()
            }
            this.spawnKarl(width, height);
        }, 10000));
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

    private spawnKarl(width: number, height: number) {
        const possibleDirections = ['left']
        let direction = possibleDirections[Phaser.Math.Between(0, possibleDirections.length - 1)]
        let yCoord = 0
        let xCoord = 0
        let destinationX = 0
        let destinationY = 0
        if (direction === 'left') {
            xCoord = -100
            yCoord = Phaser.Math.Between(0, height);
            destinationX = width + 30
            destinationY = Phaser.Math.Between(0, height);
        } else if (direction === 'right') {
            xCoord = width + 100
            yCoord = Phaser.Math.Between(0, height);
            destinationX = -100
            destinationY = Phaser.Math.Between(0, height);
        } 
        let karl = new Karl(this, xCoord, yCoord, 'karl', destinationX, destinationY)
        this.physics.add.collider(this.player, karl, (player, karl) => {
            (player as Player).getDamage(8)
        })
        
    }

    private spawnGoodies(width: number, height: number) {
        const goodieTypes = ['silentdisco', 'hotchocolate', 'ice', 'hotchocolate']
        let yCoord = Phaser.Math.Between(0, height);
        let xCord = Phaser.Math.Between(0, width);
        let goodieType =  goodieTypes[Phaser.Math.Between(0, goodieTypes.length - 1)]
        let goodie = new Goodie(this, xCord, yCoord, goodieType)
        const newSpeed = SPEED_MAP[goodieType]
        this.physics.add.collider(this.player, goodie, (player, goodie) => {
            goodie.destroy()
            if (goodieType === 'ice') {
                (player as Player).getDamage(2)
            } else if (goodieType === 'hotchocolate') {
                this.game.events.emit(EVENTS_NAME.smLoot)
            } else if (goodieType === 'silentdisco') {
                (player as Player).getHype()
                this.game.events.emit(EVENTS_NAME.lgLoot)
            }
            (player as Player).adjustSpeed(newSpeed)
        });
        this.goodies.push(goodie)
    }

    private stopAllIntervals() {
        for(let interval of this.intervals){
            clearInterval(interval);
       }
    }

    private initListeners(): void {
        this.game.events.once(EVENTS_NAME.gameEnd, this.stopAllIntervals, this);
      }

}
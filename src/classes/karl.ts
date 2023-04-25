import { Physics } from 'phaser';
export class Karl extends Physics.Arcade.Sprite {
    private targetX: number;
    private targetY: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, targetX: number, targetY: number, frame?: string | number) {
        super(scene, x, y, texture, frame);

        this.initAnimations()
        this.anims.play('attack', true);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setSize(230, 240);
        if (targetX < 0) {
            this.getBody().setOffset(270,60);
        } else {
            this.getBody().setOffset(40, 60);
        }
        this.targetX = targetX
        this.targetY = targetY
        const speed = Phaser.Math.Between(50,150)
        scene.physics.moveTo(this, this.targetX, this.targetY, speed, 3000)
        this.checkFlip()
    }
    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
    private initAnimations(): void {
        if (!this.anims.isPlaying) { 
            this.scene.anims.create({
                key: 'attack',
                frames: this.scene.anims.generateFrameNames('a-karl'),
                frameRate: 8,
                repeat: -1,
              });
          }
    }
    
    protected checkFlip(): void {
        if (this.getBody().velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
}
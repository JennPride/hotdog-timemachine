import { Physics } from 'phaser';
export class Actor extends Physics.Arcade.Sprite {
    protected hp: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.hp = 10
    }
    public getDamage(value: number): void {
        this.hp = this.hp - value;
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onComplete: () => {this.setAlpha(1);}
        });
    }
    public getHype(): void {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            onActive: () => {
                
            }
        });
    }
    public getHPValue(): number {
        return this.hp;
    }
    protected checkFlip(): void {
        if (this.getBody().velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}
import { Actor } from './actor';
import { Text } from './text'

export class Player extends Actor {
  private keyW?: Phaser.Input.Keyboard.Key;
  private keyA?: Phaser.Input.Keyboard.Key;
  private keyS?: Phaser.Input.Keyboard.Key;
  private keyD?: Phaser.Input.Keyboard.Key;
  private hpValue: Text;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hotdog');

    this.initAnimations()

    this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
    .setFontSize(12)
    .setOrigin(1.5, 0.5);
    // KEYS
    if (scene && scene.input.keyboard) {
        this.keyW = scene.input.keyboard.addKey('W');
        this.keyA = scene.input.keyboard.addKey('A');
        this.keyS = scene.input.keyboard.addKey('S');
        this.keyD = scene.input.keyboard.addKey('D');
    }
    // PHYSICS
    this.getBody().setSize(75, 150);
    this.getBody().setOffset(8, 0);
  }
  preload(): void {
    this.initAnimations()
  }
  update(): void {
    this.getBody().setVelocity(0)

    if (this.keyW?.isDown) {
      this.getBody().velocity.y = -110;
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyA?.isDown) {
      this.getBody().velocity.x = -110;
      this.checkFlip();
      this.getBody().setOffset(48, 15);
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyS?.isDown) {
      this.getBody().velocity.y = 110;
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyD?.isDown) {
      this.getBody().velocity.x = 110;
      this.checkFlip();
      this.getBody().setOffset(15, 15);
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    this.hpValue.setPosition(this.x, this.y - this.height * .6);
    this.hpValue.setOrigin(0.8, 0.5);
  }

  private initAnimations(): void {
    this.scene.anims.create({
        key: 'run',
        frames: this.scene.anims.generateFrameNames('a-hotdog'),
        frameRate: 8,
      });
      console.log(this.scene.anims)
  }

  public getDamage(value: number): void {
    super.getDamage(value);
    this.hpValue.setText(this.hp.toString());
  }
}
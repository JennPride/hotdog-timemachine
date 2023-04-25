import { Actor } from './actor';
import { Text } from './text'
import { GAME_STATUS, EVENTS_NAME,  SPEED_MAP } from '../utils/consts'

export class Player extends Actor {
  private keyW?: Phaser.Input.Keyboard.Key;
  private keyA?: Phaser.Input.Keyboard.Key;
  private keyS?: Phaser.Input.Keyboard.Key;
  private keyD?: Phaser.Input.Keyboard.Key;
  private hpValue: Text;
  private speedAdjustment: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hotdog');

    this.initAnimations()
    this.speedAdjustment = 1

    this.hpValue = new Text(this.scene, this.x, this.y - this.height, `HP: ${this.hp.toString()}`)
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
    this.getBody().setSize(90, 200)
    this.getBody().setOffset(0, 0);
  }
  update(): void {
    this.getBody().setVelocity(0)

    let speed = 110 * this.speedAdjustment

    if (this.keyW?.isDown) {
      this.getBody().velocity.y = speed * -1
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyA?.isDown) {
      this.getBody().velocity.x = speed * -1;
      this.checkFlip();
      if (this.speedAdjustment != SPEED_MAP['ice']) {
        this.getBody().setOffset(100,0);
      } else {
        this.getBody().setOffset(0,0);
      }
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyS?.isDown) {
      this.getBody().velocity.y = speed;
      !this.anims.isPlaying && this.anims.play('run', true);
    }
    if (this.keyD?.isDown) {
      this.getBody().velocity.x = speed;
      this.checkFlip();
      if (this.speedAdjustment != SPEED_MAP['ice']) {
        this.getBody().setOffset(0,0);
      } else {
        this.getBody().setOffset(100,0);
      }

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
  }

  public getDamage(value: number): void {
    if (this.speedAdjustment !== SPEED_MAP['silentdisco']) {
      super.getDamage(value);
      this.hpValue.setText(this.hp.toString());
      if (this.hp <= 0) {
        this.scene.game.events.emit(EVENTS_NAME.gameEnd, GAME_STATUS.LOSE);
      }
    }
  }

  protected checkFlip(): void { 
    if (this.getBody().velocity.x < 0) {
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }

  public adjustSpeed(value: number): void {
    this.speedAdjustment = value
  }
}
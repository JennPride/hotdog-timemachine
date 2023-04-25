import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME, GAME_STATUS } from '../../utils/consts'
import { Text } from '../../classes/text';
import { gameConfig } from '../../index'

export class Overlay extends Scene {
  private score!: Score;
  private lootHandler: (value: number) => void;
  private gameEndPhrase!: Text;
  private gameEndImage!: Phaser.Types.Physics.Arcade.ImageWithStaticBody
  private gameEndHandler: (status: GAME_STATUS) => void;

  constructor() {
    super('overlay');
    this.lootHandler = (value) => {
        this.score.changeValue(ScoreOperations.INCREASE, value);
        if (this.score.getValue() >= gameConfig.winScore) {
          this.game.events.emit(EVENTS_NAME.gameEnd, 'win');
        }
      }

    this.gameEndHandler = (status) => {
        this.cameras.main.setBackgroundColor('#ADD8E6');
        this.game.scene.pause('level-1-scene');
        let phrase = ''
        let image = ''
        let phrasePositionX
        let phrasePositionY
        let imagePositionX 
        let imagePositionY 
        let scale
        if (status === GAME_STATUS.LOSE) {
          phrase = `OH NO! Looks like you were a bit of a weenie. `
          image = 'hottub-lose'
          phrasePositionX = this.game.scale.width * 0.1
          phrasePositionY = this.game.scale.height * 0.3
          imagePositionX = this.game.scale.width * .7
          imagePositionY = this.game.scale.height * 0.5
          scale = 0.6
        } else {
          phrase = `YOU'RE A BRAUTSTAR! Way to win the party, hawt dog. `
          image = 'hottub-win'
          phrasePositionX = this.game.scale.width * 0.1
          phrasePositionY = this.game.scale.height * 0.3
          imagePositionX = this.game.scale.width * .7
          imagePositionY = this.game.scale.height * 0.5
          scale = 0.5
        }
        phrase += 'Click to restart!'
        this.gameEndPhrase = new Text(this, phrasePositionX, phrasePositionY, phrase)
        .setAlign('center').setWordWrapWidth(this.game.scale.width * 0.4)
        this.gameEndImage = this.physics.add.staticImage(imagePositionX, imagePositionY, image)
        this.gameEndImage.setScale((this.game.scale.width * scale)/ this.gameEndImage.width)
        this.input.on('pointerdown', () => {
          this.scene.get('level-1-scene').scene.restart();
          this.scene.restart();
        });
      };
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);
    this.initListeners();
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.smLoot, () => this.lootHandler(5), this);
    this.game.events.on(EVENTS_NAME.medLoot, () => this.lootHandler(10), this);
    this.game.events.on(EVENTS_NAME.lgLoot, () => this.lootHandler(25), this);
    this.game.events.on(EVENTS_NAME.xlgLoot, () => this.lootHandler(50), this);
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
  }
}
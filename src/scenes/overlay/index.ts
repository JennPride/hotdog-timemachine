import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME, GAME_STATUS } from '../../utils/consts'
import { Text } from '../../classes/text';
import { gameConfig } from '../../index'

export class Overlay extends Scene {
  private score!: Score;
  private lootHandler: (value: number) => void;
  private gameEndPhrase!: Text;
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
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
        this.game.scene.pause('level-1-scene');
        let phrase = status === GAME_STATUS.LOSE
        ? `OH NO! Looks like you were a bit of a weenie.`
        : `YOU'RE A BRAUTSTAR! Way to win the party, hawt dog. `
        phrase += 'Click to restart!'
        this.gameEndPhrase = new Text(this, this.game.scale.width / 2, this.game.scale.height * 0.4, phrase)
        .setAlign('center').setColor(status === GAME_STATUS.LOSE ? '#ff0000' : '#ffffff').setWordWrapWidth(this.game.scale.width / 2)
        this.gameEndPhrase.setPosition(
          this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
          this.game.scale.height * 0.4,
        );
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
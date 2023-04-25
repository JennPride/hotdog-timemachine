import { GameObjects, Scene } from 'phaser';
export class Text extends GameObjects.Text {
  constructor(scene: Scene, x: number, y: number, text: string, size?: string) {
    super(scene, x, y, text, {
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    });
    const fontSize = this.getFontSize(size || '')
    this.setFontSize(fontSize)
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }

  private getFontSize(sizeString: string): string {
    if (sizeString === 'lg') {
      return 'calc(100vw / 25)'
    } else if (sizeString === 'md') {
      return 'calc(100vw / 40)'
    } else if (sizeString === 'sm') {
      return 'calc(100vw / 60)'
    } else if (sizeString === 'xs') {
      return 'calc(100vw / 80)'
    }
    return 'calc(100vw / 25)'
  }
}
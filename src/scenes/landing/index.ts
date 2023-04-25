import { Scene } from 'phaser';
import { Text } from '../../classes/text'
import { GAME_STATUS, EVENTS_NAME} from '../../utils/consts';

export class Landing extends Scene {
    constructor() {
        super('landing');
    }
    create(): void {

        const wordWrapWidth = this.game.scale.width / 3
        const bannerY = this.game.scale.height * 0.2
        const bannerX = this.game.scale.width * 0.15

        const welcome = new Text(this, bannerX, bannerY, "Welcome to Weinerfest")
        .setAlign('center').setWordWrapWidth(wordWrapWidth)

        const poster = this.physics.add.staticImage(this.game.scale.width / 2 + welcome.width / 1.5, this.game.scale.height * 0.5, 'poster')
        poster.setScale((this.game.scale.height * 0.8)/ poster.height)

        const intro = new Text(this, bannerX, bannerY * 2, "Press Enter to Join the Party", "md")
        .setAlign('center').setWordWrapWidth(wordWrapWidth)

        const directionsMap: Record<string, string> = {
            'W': 'Up',
            'A': 'Left',
            'S': 'Down',
            'D': 'Right'
        }
        let directiveOffset = this.game.scale.height * 0.1
        let y = bannerY * 2 + directiveOffset
        for (let key in directionsMap) {
            y += this.game.scale.height * 0.04
            new Text(this, this.game.scale.width * 0.25, y, `${key} : ${directionsMap[key]}`, "sm")
        }
        y += this.game.scale.height * 0.05
        new Text(this, this.game.scale.width * 0.22, y, "Don't get iced", "sm")
        y+= this.game.scale.height * 0.1
        new Text(this, this.game.scale.width * 0.235, y, "Beware the Karl", "xs").setColor("#FF0000")

        this.input.keyboard?.on('keydown-ENTER', this.handleGameStart, this)
    }  

    private handleGameStart() {
        this.scene.start('level-1-scene')
        this.scene.start('overlay')
    }


}
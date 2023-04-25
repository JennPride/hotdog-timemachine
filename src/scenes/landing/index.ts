import { Scene, GameObjects } from 'phaser';
import { Text } from '../../classes/text'

export class Landing extends Scene {
    constructor() {
        super('landing');
    }
    create(): void {
        const welcome = new Text(this, 0, 0, "Welcome to Weinerfest")
        .setAlign('center').setColor('#ffffff').setWordWrapWidth(this.game.scale.width / 2)
        welcome.setPosition(this.game.scale.width / 4 - welcome.width / 2,
            this.game.scale.height * 0.2
        )
        const poster = this.physics.add.staticImage(this.game.scale.width / 2 + welcome.width / 1.5, this.game.scale.height * 0.5, 'poster')
        poster.setScale((this.game.scale.height * 0.8)/ poster.height)

        const wasd = this.physics.add.staticImage(this.game.scale.width / 2 + welcome.width / 1.5, this.game.scale.height * 0.7, 'wasd')
        
        const intro = new Text(this, 0, 0, "Press Enter to Join the Party", "md")
        .setAlign('center').setColor('#ffffff').setWordWrapWidth(this.game.scale.width / 4)

        intro.setPosition(this.game.scale.width / 4 - welcome.width / 2,
            this.game.scale.height * 0.4
        )

        this.input.on('pointerdown', () => {
            this.scene.start('level-1-scene')
            this.scene.start('overlay')
        })


    }   

}
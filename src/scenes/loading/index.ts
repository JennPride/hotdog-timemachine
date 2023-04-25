import { Scene } from 'phaser';
export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene');
    }
    preload(): void {
        this.load.baseURL = 'assets/';
        this.load.image('hotdog', 'sprites/hotdog.png');
        this.load.atlas('a-hotdog', 'spritesheets/hotdog_run.png', 'spritesheets/hotdog_run.json')
        this.load.image('ice', 'sprites/ice.png')
        this.load.image('hotchocolate', 'sprites/hotchocolate.png')
        this.load.image('silentdisco', 'sprites/silentdisco.png')
        this.load.image('karl', 'sprites/karl-0.png')
        this.load.atlas('a-karl', 'spritesheets/karl_attack.png', 'spritesheets/karl_attack.json')
        this.load.image('poster', 'images/poster.jpg')
    }
    create(): void {
        this.scene.start('landing')
        // this.scene.start('level-1-scene');
        // this.scene.start('overlay')
    }    
}
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
    }
    create(): void {
        this.scene.start('level-1-scene');
    }    
}
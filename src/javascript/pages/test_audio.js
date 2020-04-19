/**
 * Based off of:
 * https://phaser.io/examples/v3/view/audio/html5-audio/play-audio-file
 */
import 'phaser';

let music

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image('test-image', '/images/test/test-image.png')
        this.load.audio('song', '/audio/2020-04-15.mp3')
    }
    create() {
        this.add.image(960, 540, 'test-image')
        music = this.sound.add('song')
        music.volume = 0.8
        music.play()
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)
 
import 'phaser';

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image('test-image', '/images/test/test-image.png')
    }
    create() {
        this.add.image(960, 540, 'test-image')
        this.add.text(100, 100, 'Test 001', { 
            fill: '#ff0099',
            fontSize: '64px',
            strokeThickness: '4'
        })
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)
 
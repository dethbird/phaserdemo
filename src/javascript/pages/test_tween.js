import 'phaser'

let originalImage = {
    src: '/images/test/spaceman.png',
    key: 'image1',
    width: null, // gets set on load
    height: null, // gets set on load
    x: 400,
    y: 300
}
let image
let tween

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image(originalImage.key, originalImage.src);
    }
    create() {
        image = this.add.image(originalImage.x, originalImage.y, originalImage.key)

        originalImage.width = this.textures.get(originalImage.key).getSourceImage().width
        originalImage.height = this.textures.get(originalImage.key).getSourceImage().height

        tween = this.tweens.add({
            targets: { x: 0, y: 0 },
            x: 150,
            y: 100,
            ease: 'Bounce.easeInOut',
            duration: 3000,
            yoyo: true,
            repeat: -1
        })
    }
    update() {
        if (tween.isPlaying()) {
            image.x = originalImage.x + tween.getValue(0)
            image.y = originalImage.y + tween.getValue(1)
        }
    }
}

const gameConfig = {
    width: 800,
    height: 600,
    backgroundColor: '#0055ff',
    scene: Scene1
}

new Phaser.Game(gameConfig)

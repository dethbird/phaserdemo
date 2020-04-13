import 'phaser'

/**
 * Specs on the original image
 * @type object
 */
let originalImage = {
    src: '/images/test/spaceman.png',
    key: 'image1',
    width: null, // gets set on load
    height: null, // gets set on load
    x: 360,
    y: 300
}
/**
 * Only needed during debugging
 * @debug
 * @type Phaser.GameObjects.Image
 */
let image = {}
/**
 * The x,y translation tween
 * @type Phaser.Tweens.Tween
 */
let tween
/**
 * Contains the slice sprites made from the original image
 * @type array
 */
let imageSlices = []
/**
 * Slice height
 */
const sliceHeight = 4

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image(originalImage.key, originalImage.src);
    }
    create() {

        /**
         * @debug seeing the translation on this image
         */
        // image = this.add.image(originalImage.x, originalImage.y, originalImage.key)
        // image.setAlpha(0.4)

        // set original widths and heights from loaded asset
        originalImage.width = this.textures.get(originalImage.key).getSourceImage().width
        originalImage.height = this.textures.get(originalImage.key).getSourceImage().height

        tween = this.tweens.add({
            targets: { x: 0, y: 0 },
            x: 32,
            y: 0,
            ease: 'Bounce.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        })

        // create the wave slices
        for (let y = 0; y < Math.floor(originalImage.height / sliceHeight); y++) {
            
            let slice = this.add.sprite(originalImage.x, originalImage.y, originalImage.key)
            slice.setOrigin(0.5, 0.5)
            slice.cx = Phaser.Math.Wrap(y, 0, 32)
            slice.setCrop(new Phaser.Geom.Rectangle(0, y * sliceHeight, originalImage.width, sliceHeight));

            imageSlices.push(slice);
        }
    }
    update() {
        if (tween.isPlaying()) {
            /**
             * @debug view the translation on the test image
             */
            // image.x = originalImage.x + tween.getValue(0)
            // image.y = originalImage.y + tween.getValue(1)
            for (var i = 0, len = imageSlices.length; i < len; i++) {

                imageSlices[i].x = originalImage.x + Math.floor(tween.getValue(0) - imageSlices[i].cx)
                imageSlices[i].setAlpha(Math.random())
                
                imageSlices[i].cx++;
                if (imageSlices[i].cx > 16)
                {
                    imageSlices[i].cx = 0;
                }
            }
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

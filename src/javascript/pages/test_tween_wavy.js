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
        // console.log(image)

        // set original widths and heights from loaded asset
        originalImage.width = this.textures.get(originalImage.key).getSourceImage().width
        originalImage.height = this.textures.get(originalImage.key).getSourceImage().height

        // console.log(originalImage)
        tween = this.tweens.add({
            targets: { x: 0, y: 0 },
            x: 40,
            y: 0,
            ease: 'Bounce.easeInOut',
            duration: 2250,
            yoyo: true,
            repeat: -1
        })
        console.log(tween)

        // create the wave slices
        for (let y = 0; y < Math.floor(originalImage.height / sliceHeight); y++) {
            // console.log(y)
            let slice = this.add.sprite(originalImage.x, originalImage.y, originalImage.key);
            slice.setOrigin(0.5, 0.5)
            slice.cx = Phaser.Math.Wrap(y * 2, 0, originalImage.width + 1)

            slice.setCrop(new Phaser.Geom.Rectangle(0, y * sliceHeight, originalImage.width, sliceHeight));
            // console.log(slice)
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
                // imageSlices[i].x = originalImage.x + tween.getValue(0) + tween.getValue(0)
                imageSlices[i].x = originalImage.x + Math.floor(tween.getValue(0) + imageSlices[i].cx)
                console.log(imageSlices[i].x, imageSlices[i].cx)
                imageSlices[i].cx++;

                if (imageSlices[i].cx > originalImage.width + 1)
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


/*

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/jim_sachs_time_crystal.png');

}

var slices;
var waveform;

var xl;
var cx = 0;

function create() {

    game.stage.backgroundColor = '#0055ff';

    //  Generate our motion data
    var motion = { x: 0 };
    var tween = game.add.tween(motion).to( { x: 200 }, 3000, "Bounce.easeInOut", true, 0, -1, true);
    waveform = tween.generateData(60);

    xl = waveform.length - 1;

    slices = [];

    var picWidth = game.cache.getImage('pic').width;
    var picHeight = game.cache.getImage('pic').height;

    var ys = 4;

    for (var y = 0; y < Math.floor(picHeight/ys); y++)
    {
        var star = game.add.sprite(300, 100 + (y * ys), 'pic');

        star.crop(new Phaser.Rectangle(0, y * ys, picWidth, ys));

        star.ox = star.x;

        star.cx = game.math.wrap(y * 2, 0, xl);

        star.anchor.set(0.5);
        slices.push(star);
    }

}

function update() {

    for (var i = 0, len = slices.length; i < len; i++)
    {
        slices[i].x = slices[i].ox + waveform[slices[i].cx].x;

        slices[i].cx++;

        if (slices[i].cx > xl)
        {
            slices[i].cx = 0;
        }

    }

}

*/

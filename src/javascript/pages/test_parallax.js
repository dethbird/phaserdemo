/**
 * Based off of:
 * https://phaser.io/examples/v3/view/input/dragging/camera-move-and-rotate
 */
import 'phaser';

let controls
let shards

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.atlas('shards', '/atlas/test_parallax.png', '/atlas/test_parallax.json');
    }
    create() {
        shards = this.add.group();
        let frames = this.textures.get('shards').getFrameNames();
        for (let i = 0; i < 300; i++) {
            let x = Phaser.Math.Between(0, 1920 * 4);
            let y = Phaser.Math.Between(0, 1080 * 4);

            let image = this.add.image(x, y, 'shards', Phaser.Math.RND.pick(frames));

            image.setInteractive();

            image.setScale(Phaser.Math.FloatBetween(0.1, 0.6));

            image.setScrollFactor(image.scaleX);

            image.setDepth(image.scrollFactorX);

            // image.setTint('#CCC');
            const t = (Math.floor(image.scaleX * 100) * 3).toString(16)
            image.setTint(`0x${t}${t}${t}`)

            image.setAngle(Phaser.Math.Between(0, 359));

            this.input.setDraggable(image);

            shards.add(image);
        }
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        let cursors = this.input.keyboard.createCursorKeys();

        let controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        };

        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.cameras.main.setBounds(0, 0, 1920 * 4, 1080 * 4);
    }
    update(time, delta) {
        controls.update(delta);

        Phaser.Actions.Rotate(shards.getChildren(), 0.005);
    }
}

const gameConfig = {
    backgroundColor: '#000',
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)

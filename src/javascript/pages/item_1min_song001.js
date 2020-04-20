/**
 * Based off of:
 * https://phaser.io/examples/v3/view/input/dragging/camera-move-and-rotate
 */
import 'phaser';

/**
 * camera position controls
 */
let controls
/**
 * graphics manager for seeking
 */
let graphics
/**
 * graphics manager for seeking
 */
let graphicsScroll
/**
 * The song
 */
let music
/**
 * Current position of the track
 */
let seekPosition = 0
/**
 * The floating painted shards
 */
let shards
/**
 * Global configs
 */
const configs = {
    cameraWidth: 1920,
    cameraHeight: 1080,
    totalHeight: 1080 * 4,
    totalWidth: 1920 * 16
}
let inputs = {
    spacebar: null, // controls emitters
    keyP: null // music play / pause
}

export class Scene1 extends Phaser.Scene {
    
    preload() {
        this.load.atlas('shards', '/atlas/test_parallax.png', '/atlas/test_parallax.json')
        this.load.audio('song', '/audio/2020-04-15.mp3')
    }

    create() {
        /**
         * Camera controls
         */
        let cursors = this.input.keyboard.createCursorKeys()

        let controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        }

        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

        this.cameras.main.setBounds(0, 0, configs.totalWidth, configs.totalHeight)
        this.cameras.main.pan(0, configs.totalHeight - 1700, 0)

        /**
         * Inputs
         */
        inputs.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        inputs.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        /**
         * The song
         */
        music = this.sound.add('song')

        /**
         * Graphics managers
         */
        graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0099 } })
        graphicsScroll = this.add.graphics({ lineStyle: { width: 2, color: 0x0099ff } })

        /**
         * Shards
         */
        shards = this.add.group()
        let frames = this.textures.get('shards').getFrameNames()
        for (let i = 0; i < 1650; i++) {
            let x = Phaser.Math.Between(0, configs.totalWidth)
            let y = Phaser.Math.Between((configs.totalHeight / 4) + 50, (configs.totalHeight/4) + 250)

            let image = this.add.image(x, y, 'shards', Phaser.Math.RND.pick(frames))

            image.setScale(Phaser.Math.FloatBetween(0.1, 0.6))
            image.setScrollFactor(image.scaleX)
            image.setDepth(image.scrollFactorX)

            const t = (Math.floor(image.scaleX * 100) * 4).toString(16)
            image.setTint(`0x${t}${t}${t}`)

            image.setAngle(Phaser.Math.Between(0, 359))
            shards.add(image)
        }        
    }

    update(time, delta) {
        controls.update(delta)
        Phaser.Actions.Rotate(shards.getChildren(), 0.0005)
        if (Phaser.Input.Keyboard.JustDown(inputs.keyP)) {
            if (music.isPlaying) {
                music.pause()
            } else {
                if(music.isPaused) {
                    music.resume()
                } else {
                    music.play()
                }
            }
        }

        /**
         * Update music indicator
         */
        if (music.isPlaying) {
            seekPosition += delta
        }
        
        graphics.clear();
        graphics.lineBetween(
            this.cameras.main.scrollX,
            this.cameras.main.scrollY + configs.cameraHeight - 2,
            this.cameras.main.scrollX + configs.cameraWidth * ((seekPosition/1000) / music.totalDuration),
            this.cameras.main.scrollY + configs.cameraHeight - 2
        );
        graphicsScroll.clear();
        graphicsScroll.lineBetween(
            this.cameras.main.scrollX,
            this.cameras.main.scrollY + configs.cameraHeight - 4,
            this.cameras.main.scrollX + configs.cameraWidth * (this.cameras.main.scrollX / configs.totalWidth),
            this.cameras.main.scrollY + configs.cameraHeight - 4
        );
    }
}

const gameConfig = {
    backgroundColor: '#000',
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)

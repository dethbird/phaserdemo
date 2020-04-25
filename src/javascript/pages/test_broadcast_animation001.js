/**
 * Based off of:
 * https://phaser.io/examples/v3/view/game-objects/particle-emitter/create-emitter-from-config
 */
import 'phaser'
import ShakePositionPlugin from 'phaser3-rex-plugins/plugins/shakeposition-plugin.js'

let particles
let emitter1
let emitter2

let spacebar
let key1
let key2

let robot1_off
let robot1_on
let robot2_off
let robot2_on

export class Scene1 extends Phaser.Scene {
    preload() {
        // background image
        this.load.image('background', '/images/burping_robots/background.png')
        //robot 1 on
        this.load.image('robot1_off', '/images/burping_robots/robot1_off.png')
        this.load.image('robot1_on', '/images/burping_robots/robot1_on.png')
        this.load.image('robot2_off', '/images/burping_robots/robot2_off.png')
        this.load.image('robot2_on', '/images/burping_robots/robot2_on.png')
        this.load.atlas('sparks', '/atlas/colorsHD.png', '/atlas/colorsHD.json')
    }
    create() {
        this.add.sprite(960, 540, 'background')

        particles = this.add.particles('sparks');
        emitter1 = particles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            x: 365,
            y: 470,
            speed: { min: 550, max: 850 },
            lifespan: { min: 3500, max: 4200 },
            angle: { min: 5, max: -30 },
            gravityY: 440,
            scale: { start: 0.6, end: 0 },
            on: false,
            quantity: 10,
            blendMode: Phaser.BlendModes.ADD
        })
        emitter2 = particles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            x: 1600,
            y: 310,
            speed: { min: 550, max: 850 },
            lifespan: { min: 3500, max: 4200 },
            angle: { min: -160, max: -190 },
            gravityY: 440,
            scale: { start: 0.6, end: 0 },
            on: false,
            quantity: 10,
            blendMode: Phaser.BlendModes.ADD
        })

        

        robot1_off = this.add.sprite(320, 630, 'robot1_off')
        robot1_on = this.add.sprite(320, 630, 'robot1_on')
        robot1_on.setAlpha(0)
        robot1_on.shake = this.plugins.get('rexShakePosition').add(robot1_on, {
            duration: 2000,
            magnitudeMode: 1
        })

        robot2_off = this.add.sprite(1140, 580, 'robot2_off')
        robot2_on = this.add.sprite(1140, 580, 'robot2_on')
        robot2_on.setAlpha(0)
        robot2_on.shake = this.plugins.get('rexShakePosition').add(robot2_on, {
            duration: 2000,
            magnitudeMode: 1
        })

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    }
    update() {
        
        if (Phaser.Input.Keyboard.DownDuration(spacebar, 5000)) {
            this.cameras.main.shake(100, 0.01);
        }

        if (Phaser.Input.Keyboard.DownDuration(key1, 5000)) {
            robot1_off.setAlpha(0)
            robot1_on.setAlpha(1)
            robot1_on.shake.shake()
            emitter1.on = true

        }
        if (Phaser.Input.Keyboard.JustUp(key1)) {
            robot1_off.setAlpha(1)
            robot1_on.setAlpha(0)
            emitter1.on = false
        }

        if (Phaser.Input.Keyboard.DownDuration(key2, 5000)) {
            robot2_off.setAlpha(0)
            robot2_on.setAlpha(1)
            robot2_on.shake.shake()
            emitter2.on = true
        }
        if (Phaser.Input.Keyboard.JustUp(key2)) {
            robot2_off.setAlpha(1)
            robot2_on.setAlpha(0)
            emitter2.on = false
        }
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1,
    plugins: {
        global: [{
            key: 'rexShakePosition',
            plugin: ShakePositionPlugin,
            start: true
        }]
    }
}

new Phaser.Game(gameConfig)
 
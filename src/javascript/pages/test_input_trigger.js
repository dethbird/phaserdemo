/**
 * Based off of:
 * https://phaser.io/examples/v3/view/game-objects/particle-emitter/create-emitter-from-config
 */
import 'phaser';

let music
let particles
let emitter
let spacebar
export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.atlas('sparks', '/atlas/colorsHD.png', '/atlas/colorsHD.json')
    }
    create() {
        particles = this.add.particles('sparks');
        emitter = particles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            x: 960,
            y: 300,
            speed: { min: 50, max: 350 },
            lifespan: { min: 3500, max: 4200 },
            gravityY: 240,
            scale: { start: 0.6, end: 0 },
            on: false,
            quantity: 400,
            blendMode: Phaser.BlendModes.ADD
        })
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            emitter.explode()
        }
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)
 
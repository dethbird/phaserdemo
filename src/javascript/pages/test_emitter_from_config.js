/**
 * Based off of:
 * https://phaser.io/examples/v3/view/game-objects/particle-emitter/create-emitter-from-config
 */
import 'phaser';

let music

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.atlas('sparks', '/atlas/colorsHD.png', '/atlas/colorsHD.json');
    }
    create() {
        const particles = this.add.particles('sparks');
        const emitter = particles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            x: 960,
            y: 300,
            speed: 300,
            lifespan: 4200,
            angle: { min: -45, max: -135 },
            gravityY: 240,
            scale: { start: 0.6, end: 0 },
            blendMode: Phaser.BlendModes.ADD
        })
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1
}

new Phaser.Game(gameConfig)
 
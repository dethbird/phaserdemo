/**
 * Based off of:
 * https://phaser.io/examples/v3/view/physics/matterjs/advanced-shape-creation
 */
import 'phaser';

let collider_shapes
let spacebar
const config = {
    width: 1920,
    height: 1080
}
export class Scene1 extends Phaser.Scene {
    preload() {
        
        this.load.atlas('collider_sprites', '/physics/collider_test/collider_test_sprites.png', '/physics/collider_test/collider_test_sprites.json')
        this.load.json('collider_shapes', '/physics/collider_test/collider_test_shapes.json')
    }
    create() {
       
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.input.mouse.capture = true

        // this.matter.world.setBounds(0, 0, config.width, config.height)

        collider_shapes = this.cache.json.get('collider_shapes');

        const collider001 = this.matter.add.sprite(config.width / 2, config.height / 2 + 100, 'collider_sprites', 'collider001.png', { shape: collider_shapes.collider001 });
        collider001.setAlpha(0)

    }
    update() {
        if (Phaser.Input.Keyboard.DownDuration(spacebar, 5000)) {
            const ball = this.matter.add.sprite(
                // (config.width / 2) - 20 + (Math.random() * 40) - 60,
                this.input.mouse.manager.mousePointer.x,
                this.input.mouse.manager.mousePointer.y,
                'collider_sprites',
                'ball.png',
                { shape: collider_shapes.ball }
            );
            ball.setBlendMode(Phaser.BlendModes.ADD)
            ball.setTint(0xff0099)
            ball.setScale(0.4 + (Math.random() * 0.6))
            setTimeout(() => { ball.destroy() }, 5000)
        }
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    scene: Scene1,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    }
}

new Phaser.Game(gameConfig)
 
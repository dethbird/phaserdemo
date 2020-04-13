import 'phaser';

let blocks

const uncles = [
    {
        key: 'uncle001',
        url: '/images/uncles/uncle 001.png',
        sprite: null,
        width: null,
        height: null,
        originX: null,
        originY: null,
        offsetX: 814,
        offsetY: 79
    },
    {
        key: 'uncle002',
        url: '/images/uncles/uncle 002.png',
        sprite: null,
        width: null,
        height: null,
        originX: null,
        originY: null,
        offsetX: 166,
        offsetY: 107
    },
    {
        key: 'uncle003',
        url: '/images/uncles/uncle 003.png',
        sprite: null,
        width: null,
        height: null,
        originX: null,
        originY: null,
        offsetX: 1240,
        offsetY: 61
    }
]

export class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image('background-image', '/images/test/test-bg.001.png')
        this.load.image('block', '/images/test/50x50.png');
        for (const uncle of uncles) {
            this.load.image(uncle.key, uncle.url)
        }
    }
    create() {
        /**
         * Background image
         */
        this.add.image(1920 / 2, 1080 / 2, 'background-image')

        /**
         * Blocks
         */
        blocks = this.add.group({ key: 'block', repeat: 2400, setScale: { x: 0, y: 0 } })
        
        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 100,
            cellWidth: 50,
            cellHeight: 50,
            x: 0,
            y: 0
        })
        
        // tween each block
        const _this = this
        let i = 0
        blocks.children.iterate(function (child) {
            // console.log(child.tint)
            child.setBlendMode(Phaser.BlendModes.OVERLAY)
            console.log(child.tint)
            _this.tweens.add({
                targets: child,
                scaleX: .96,
                scaleY: .96,
                angle: 180,
                _ease: 'Sine.easeInOut',
                ease: 'Power2',
                duration: 1250,
                delay: i * 125,
                repeat: -1,
                yoyo: true,
                hold: 0,
                repeatDelay: 250
            })

            i++
            if (i % 100 === 0) {
                i = 0
            }
        })
        console.log((250).toString(16))
        /**
         * Uncles
         */
        for (const uncle of uncles) {
            uncle.width = this.textures.get(uncle.key).getSourceImage().width
            uncle.originX = uncle.width / 2
            uncle.height = this.textures.get(uncle.key).getSourceImage().height
            uncle.originY = uncle.height / 2
            uncle.sprite = this.add.sprite(
                uncle.originX + uncle.offsetX,
                uncle.originY + uncle.offsetY,
                uncle.key
            )
            // console.log(uncle)
        }
    }
    update() {
        if (Math.random() > 0.985) {
            blocks.children.iterate(function (child) {
                const r = Math.floor(220 + Math.random() * 35).toString(16)
                const g = Math.floor(220 + Math.random() * 35).toString(16)
                const b = Math.floor(220 + Math.random() * 35).toString(16)
                child.setTint(`0x${r}${g}${b}`)
            })
        }
    }
}

const gameConfig = {
    width: 1920,
    height: 1080,
    backgroundColor: '#b2b2b2',
    scene: Scene1
}

new Phaser.Game(gameConfig)

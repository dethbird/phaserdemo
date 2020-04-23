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
/**
 * Contains physics properties for corresponding sprites
 */
let props_shapes
let inputs = {
    spacebar: null, // controls emitters
    keyP: null // music play / pause
}
/**
 * Character Bounds
 */
let bounds = {
    'bounds001.png' : {
        x: 1960,
        y: 3820,
        matterSprite: undefined
    }
}

/**
 * Character flickering settings
 */
let waveTween
const sliceHeight = 4

/**
 * Characters
 */
let currentCharacterIndex = 0
const characters = {
    'character001.001.png' : {
        boundsKey: 'bounds001.png',
        boundsOffsetX: 215,
        boundsOffsetY: 70,
        sprite: undefined,
        slices: []
    },
    'character001.002.png' : {
        boundsKey: 'bounds001.png',
        boundsOffsetX: 50,
        boundsOffsetY: -280,
        sprite: undefined,
        slices: []
    },
    'character001.003.png' : {
        boundsKey: 'bounds001.png',
        boundsOffsetX: -210,
        boundsOffsetY: 118,
        sprite: undefined,
        slices: []
    }
}

export class Scene1 extends Phaser.Scene {
    
    preload() {
        
        // load hanging shards
        this.load.atlas('shards', '/atlas/1_min_song001/hanging.png', '/atlas/1_min_song001/hanging.json')
        
        // load audio
        this.load.audio('song', '/audio/2020-04-15.mp3')

        // load props sprites
        this.load.atlas('props_sprites', '/atlas/1_min_song001/props.png', '/atlas/1_min_song001/props.json')
        
        // load props shapes
        this.load.json('props_shapes', '/atlas/1_min_song001/props_physics.json')

        // load character sprites
        this.load.atlas('character_sprites', '/atlas/1_min_song001/characters.png', '/atlas/1_min_song001/characters.json')
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
            drag: 0.001,
            maxSpeed: 2
        }

        // setup keyboard controls
        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)

        // camera initial position and bounds
        this.cameras.main.setBounds(0, 0, configs.totalWidth, configs.totalHeight)
        this.cameras.main.pan(0, configs.totalHeight - 1700, 0)

        /**
         * Inputs
         */
        inputs.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        inputs.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.input.mouse.capture = true

        /**
         * The song
         */
        music = this.sound.add('song')

        /**
         * Graphics managers for indicators
         */
        graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0099 } })
        graphicsScroll = this.add.graphics({ lineStyle: { width: 2, color: 0x0099ff } })

        /**
         * Hanging shards
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

        // Position the props
        props_shapes = this.cache.json.get('props_shapes')

        // position the bounds
        for (const boundsKey of Object.keys(bounds)) {
            let matterSprite = this.matter.add.sprite(
                bounds[boundsKey].x,
                bounds[boundsKey].y,
                'props_sprites',
                boundsKey,
                { shape: props_shapes[boundsKey.replace('.png', '')] })
            matterSprite.setDepth(1)
            bounds[boundsKey].matterSprite = matterSprite
        }

        // Position the characters
        const characterFrameNames = this.textures.get('character_sprites').getFrameNames()
        for (const charFrame of characterFrameNames) {
            let character = characters[charFrame]

            // base sprite
            character.sprite = this.add.image(
                bounds[character.boundsKey].matterSprite.x + character.boundsOffsetX,
                bounds[character.boundsKey].matterSprite.y + character.boundsOffsetY,
                'character_sprites',
                charFrame)
            character.sprite.setDepth(2)

            // sliced up sprite
            for (let y = 0; y < Math.floor(character.sprite.height / sliceHeight); y++) {
                let slice = this.add.sprite(
                    character.sprite.x,
                    character.sprite.y,
                    'character_sprites',
                    charFrame)
                slice.setDepth(2.1)
                slice.setBlendMode(Phaser.BlendModes.ADD)
                slice.cx = Phaser.Math.Wrap(y, 0, 24)
                slice.setCrop(new Phaser.Geom.Rectangle(0, y * sliceHeight, character.sprite.width, sliceHeight));
                character.slices.push(slice);
            }
        }

        /**
         * Wave tween
         */
        waveTween = this.tweens.add({
            targets: { x: 0, y: 0 },
            x: 24,
            y: 0,
            ease: 'Bounce.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        })
    }

    update(time, delta) {

        controls.update(delta)
        
        // rotate the hanging shards
        Phaser.Actions.Rotate(shards.getChildren(), 0.0005)
               
        // handle play / pause
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

        
        // Update music indicator
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

        // drop "particles"
        if (Phaser.Input.Keyboard.DownDuration(inputs.spacebar, 5000)) {
            const ball = this.matter.add.sprite(
                this.cameras.main.scrollX + configs.cameraWidth / 2 - 600 + Math.random() * 1200,
                this.cameras.main.scrollY - Math.random() * 100,
                'props_sprites',
                'ball.png',
                { shape: props_shapes.ball }
            );
            ball.setDepth(1.1)
            ball.setBlendMode(Phaser.BlendModes.ADD)
            ball.setTint(Math.random() < 0.95 ? 0xff0099 : 0x9900cc)
            ball.setScale(0.35 + (Math.random() * 0.55))
            setTimeout(() => { ball.destroy() }, 8000)
        }

        // Wave animation
        let characterKeys = Object.keys(characters)
        if (waveTween.isPlaying()) {
            for (var c = 0, len = characterKeys.length; c < len; c++) {
                const character = characters[characterKeys[c]]
                if (currentCharacterIndex == c) {
                    character.sprite.setAlpha(0.1)
                    for (var i = 0, len = character.slices.length; i < len; i++) {
                        character.slices[i].x = character.sprite.x + Math.floor(waveTween.getValue(0) - character.slices[i].cx)
                        character.slices[i].setAlpha(0.3 + Math.random())
                        
                        character.slices[i].cx++;
                        if (character.slices[i].cx > 12)
                        {
                            character.slices[i].cx = 0;
                        }
                    }
                }
            }
        }

        const changePercent = Math.random()
        if (changePercent > 0.80) {
            if (changePercent > 0.80 && changePercent < 0.90) {
                if (currentCharacterIndex < characterKeys.length) {
                    characters[characterKeys[currentCharacterIndex]].sprite.setAlpha(1)
                    for (var i = 0, len = characters[characterKeys[currentCharacterIndex]].slices.length; i < len; i++) {
                        characters[characterKeys[currentCharacterIndex]].slices[i].setAlpha(0)
                    }
                }
                currentCharacterIndex = Math.floor(Math.random() * characterKeys.length)
            }
            if (changePercent > 0.90 && changePercent <= 1) {
                if (currentCharacterIndex < characterKeys.length) {
                    characters[characterKeys[currentCharacterIndex]].sprite.setAlpha(1)
                    for (var i = 0, len = characters[characterKeys[currentCharacterIndex]].slices.length; i < len; i++) {
                        characters[characterKeys[currentCharacterIndex]].slices[i].setAlpha(0)
                    }
                }
                currentCharacterIndex = characterKeys.length + 1
            }
        }
    }
}

const gameConfig = {
    backgroundColor: '#000',
    width: 1920,
    height: 1080,
    scene: Scene1,
    physics: {
        default: 'matter',
        matter: {
            debug: false
        }
    }
}

new Phaser.Game(gameConfig)

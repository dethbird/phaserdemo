const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'production-dependencies': ['phaser'],
        'item_1min_song001': './pages/item_1min_song001.js',
        'item_broadcast_animation001': './pages/item_broadcast_animation001.js',
        'item_uncles': './pages/item_uncles.js',
        'test_audio': './pages/test_audio.js',
        'test_broadcast_animation001': './pages/test_broadcast_animation001.js',
        'test_emitter_collision': './pages/test_emitter_collision.js',
        'test_emitter_from_config': './pages/test_emitter_from_config.js',
        'test_input_trigger': './pages/test_input_trigger.js',
        'test_parallax': './pages/test_parallax.js',
        'test_tween': './pages/test_tween.js',
        'test_tween_wavy': './pages/test_tween_wavy.js',
        index: './pages/index.js', // keep this last
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, '../../public/js/pages'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'async'
        },
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
        })]
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
    ]
};

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'production-dependencies': ['phaser'],
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

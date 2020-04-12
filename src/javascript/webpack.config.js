const path = require('path');
const webpack = require('webpack');

console.log('NODE_ENV = ' + process.env.NODE_ENV)

module.exports = {
    entry: {
        'production-dependencies': ['phaser'],
        index: './pages/index.js'
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
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
    ]
};

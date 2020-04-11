const path = require('path');

console.log('NODE_ENV = ' + process.env.NODE_ENV)

module.exports = {
    entry: {
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
};

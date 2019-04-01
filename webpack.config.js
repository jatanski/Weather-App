const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            loader: ['babel-loader'],
            exclude: /node_modules/
        }]
    }
}
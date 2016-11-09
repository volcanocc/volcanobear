/**
 * Created by CAN on 2016/9/25.
 */
var webpack = require("webpack");
var config = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router', './src/app']
    },
    output: {
        path: __dirname + '/tmp/scripts',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    eslint: {
        configFile: './.eslintrc'
    }
};

module.exports = config;

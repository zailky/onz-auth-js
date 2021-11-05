const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        "onz-auth-js-sdk": {
            import: './src/index.js',
            dependOn: 'shared',
        },
        "onz-auth-js-sdk.min": {
            import: './src/index.js',
            dependOn: 'shared',
        },
        shared: 'zoid',
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        libraryTarget: "umd",
        library: "onz",
        umdNamedDefine: true
    },
    mode: 'production',
    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    devtool: "source-map",
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/,
        })],
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
};
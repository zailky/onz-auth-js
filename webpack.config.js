const webpack = require('webpack');

module.exports = {
    entry: {
        "onz-auth-js-sdk": './src/index.js'
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        libraryTarget: "umd",
        library: "onz",
        umdNamedDefine: true,
    },
    mode: 'production',
    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    devtool: "source-map",
    optimization: {
        minimize: true, //Update this to true or false
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
};
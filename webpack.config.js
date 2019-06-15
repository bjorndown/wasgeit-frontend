const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const {execSync} = require('child_process')

const currentCommit = execSync('git rev-list --max-count=1 HEAD').toString().trim()

module.exports = {
    entry: {
        app: "./src/index.tsx",
        vendor: "./src/vendor.ts"
    },
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {
                test: /\.less$/, use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            }
        ]
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, "dist"),
        proxy: {
            "/rest": {
                "target": "http://localhost:8080",
                "secure": false,
                "logLevel": "info",
                "pathRewrite": {
                    "^/rest": ""
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/index.html'},
            {from: 'src/service-worker.js'},
            {from: 'src/manifest.json'},
            {from: 'src/favicon.ico'},
            {from: 'src/assets', to: 'assets/'}
        ]),
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            WASGEIT_BUILD_COMMIT: JSON.stringify(currentCommit),
            WASGEIT_BUILD_TIME: JSON.stringify(new Date())
        })
    ]
};
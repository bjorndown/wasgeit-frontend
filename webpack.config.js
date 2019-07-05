const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const {execSync} = require('child_process')

const currentCommit = execSync('git rev-list --max-count=1 HEAD').toString().trim()

const VERSION = {
    WASGEIT_BUILD_COMMIT: currentCommit,
    WASGEIT_BUILD_TIME: new Date()
}

function stringifyValues(object) {
    let objectCopy = {}
    for (key of Object.keys(object)) {
        objectCopy[key] = JSON.stringify(object[key])
    }
    return objectCopy
}

module.exports = {
    entry: "./src/index.tsx",
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
            {from: 'src/assets', to: 'assets/'},
            {
                from: 'src/version.json', transform: function (buffer) {
                    const versionTemplate = JSON.parse(buffer.toString())
                    Object.assign(versionTemplate, VERSION)
                    return JSON.stringify(versionTemplate)
                }
            }
        ]),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin(stringifyValues(VERSION))
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
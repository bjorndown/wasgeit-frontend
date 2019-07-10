const path = require('path')
const {execSync} = require('child_process')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
    pwa: {
        name: 'wasgeit',
        theme_color: '#17a2b8',
        workboxOptions: {
            navigateFallback: '/index.html'
        }
    },
    configureWebpack: {
        devServer: {
            historyApiFallback: true,
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
                {
                    from: 'src/version.json', transform: function (buffer) {
                        const versionTemplate = JSON.parse(buffer.toString())
                        Object.assign(versionTemplate, VERSION)
                        return JSON.stringify(versionTemplate)
                    }
                }
            ]),
            new webpack.DefinePlugin(stringifyValues(VERSION))
        ]
    }
}

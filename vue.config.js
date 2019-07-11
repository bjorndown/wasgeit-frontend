const path = require('path')
const {execSync} = require('child_process')
const webpack = require('webpack')
const currentCommit = execSync('git rev-list --max-count=1 HEAD').toString().trim()
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

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
        orientation: 'portrait',
        manifestOptions: {
            "icons": [
                {
                    "src": "img/icons/icon-48.png",
                    "type": "image/png",
                    "sizes": "48x48"
                },
                {
                    "src": "img/icons/icon-96.png",
                    "type": "image/png",
                    "sizes": "96x96"
                },
                {
                    "src": "img/icons/apple-touch-icon-120x120.png",
                    "type": "image/png",
                    "sizes": "120x120"
                },
                {
                    "src": "img/icons/apple-touch-icon.png",
                    "type": "image/png",
                    "sizes": "128x128"
                },
                {
                    "src": "img/icons/icon-144.png",
                    "type": "image/png",
                    "sizes": "144x144"
                },
                {
                    "src": "img/icons/icon-192.png",
                    "type": "image/png",
                    "sizes": "192x192"
                }
            ]
        },
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
            new webpack.DefinePlugin(stringifyValues(VERSION)),
            new CleanWebpackPlugin()
        ]
    }
}

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
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
        new CopyWebpackPlugin([{ from: 'src/index.html', dest: 'dist' }])
    ]
};
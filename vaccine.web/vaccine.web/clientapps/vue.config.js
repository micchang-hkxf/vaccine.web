const path = require("path");
const webpack = require('webpack');
module.exports = {
    filenameHashing: false,
    publicPath: "/",
    outputDir: path.resolve(__dirname, "./../wwwroot"),
    pages: {
        main: {
            entry: "./src/pages/main/main.js",
            template: "./src/pages/main/main.html",
            //title: "main",
            chunks: ["main"]
        },
    },
    chainWebpack: config => {

        if (config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css')
            extractCSSPlugin && extractCSSPlugin.tap(() => [{
                filename: '[name].css',
                chunkFilename: '[name].css'
            }])
        }

        config.resolve.alias
            .set("clientApps", path.resolve(__dirname, "./"))
            .set("project", path.resolve(__dirname, "./../"))
            .set("@", path.resolve(__dirname, "src"))
            .set("plugins", path.resolve(__dirname, "src/plugins"))
            .set("languages", path.resolve(__dirname, "src/languages"))
            .set("modules", path.resolve(__dirname, "node_modules"))
            .set("pages", path.resolve(__dirname, "src/pages"))
            .set("stores", path.resolve(__dirname, "src/stores"))
            .set("components", path.resolve(__dirname, "src/components"))
            .set("contents", path.resolve(__dirname, "src/components/contents"))
            .set("plugins/material-pro", path.resolve(__dirname, "src/plugins/dashboard/material-pro"))
            .set("displays/material-pro", path.resolve(__dirname, "src/components/displays/material-pro"))
            .set("displays/default", path.resolve(__dirname, "src/components/displays/default"))
            .set("displays", path.resolve(__dirname, "src/components/displays"));

    },
    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"'
            })
        ]
    },
    "transpileDependencies": [
        "vuetify"
    ]
}
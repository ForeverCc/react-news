//webpack配置;
var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/root.js",
    module: {
        loaders: [
            {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                //plugins: ['react-html-attrs'], //添加组件的插件配置
                plugins: [
                        ["import", { libraryName: "antd", style: "css" }]
                    ]
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    output: {
        path: __dirname,
        filename: "./src/bundle.js"
    },
    plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};

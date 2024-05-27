const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean : true,

    },
    devtool: 'source-map',
    devServer : {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port : 3000,
        hot: true,
        historyApiFallback: true,
        compress: true,
        // open: true,
    },
    module : {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader","sass-loader"],
            },
            {
                test : /\.js$/,
                exclude: /node_modules/, // for not include node modules files
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],

                    }
                },

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'crudappwithindexDB',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/template.html')
        })
    ]

}
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000
    },
    module: {
      rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query:
            {
                presets:['@babel/preset-react']
            }
        },
        {
            test:  /\.(css|scss)$/,
            include: [
                path.join(__dirname, "/src/"),
				/node_modules\/bootstrap/
            ],
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
              ],
        },
        {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      ]
    }
  };

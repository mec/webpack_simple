const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // We need both the js and sass entry points
	entry: ['./src/js/index.js', './src/sass/index.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/index.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use:
        {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      },
			{ test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          },
          {
            loader:
              'sass-loader'
          }]
        })
      }]
	},
	plugins: [
    new ExtractTextPlugin({
        filename: 'assets/css/styles.css',
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(
      ['dist']
    ),
  ]
}

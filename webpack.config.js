const webpack = require('webpack');
// we use node path to know what directory we're in
const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    // extract text will use this file path appended to the publicPath
    filename: 'assets/css/styles.css',
});

const extractHtml = new htmlWebpackPlugin({
  template: './src/index.html'
})

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
        use: extractSass.extract({
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
    extractSass,
    extractHtml
  ]
}

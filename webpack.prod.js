const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		// new webpack.DefinePlugin({
  //           'process.env.NODE_ENV': JSON.stringify('development')
  //       }),
		
		new ExtractTextPlugin({
      		filename: 'public/css/style.css',
      		allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
    		sourceMap: true,
    		compress: {
    			warnings: false
    		},
    		output: {
        		comments: false, // remove all comments
      		},
    }),
    new CleanWebpackPlugin(['dist'])
	],

	module: {
    rules: [
      {
  		test:/\.scss$/,
  		use: ExtractTextPlugin.extract({
  				fallback: 'style-loader',
  				use: ['css-loader', 'sass-loader']
  		})
  	  },
  	  {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
        		fallback: 'style-loader',
          		use: 'css-loader',
              //Без publicPath не работали изображения в css background-image ...
              publicPath: "../../"
        }),
      },
    ],
  },
})
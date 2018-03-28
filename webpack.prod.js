const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	plugins: [
    //Существенно влияет на размер бандла, бандл уменьшился на 25% НО webpack -p в package.json делает тоже самое...
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
    }),
		
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
              //Minify css, comment css above
              // use: [
              //     { loader: 'css-loader', options: { minimize: true } }
              // ],
              //Без publicPath не работали изображения в css background-image ...
              publicPath: "../../"
        }),
      },
    ],
  },
})
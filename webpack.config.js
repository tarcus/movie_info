const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	plugins: [
		// new webpack.DefinePlugin({
  //           'process.env.NODE_ENV': JSON.stringify('development')
  //       }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html')
		}),
		new ExtractTextPlugin({
      		filename: 'style.css',
      		allChunks: true
    	}),
    	// new webpack.optimize.UglifyJsPlugin({
    	// 	sourceMap: true,
    	// 	compress: {
    	// 		warnings: false
    	// 	},
    	// 	output: {
     //    		comments: false, // remove all comments
     //  		},
    	// })
	],

	module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
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
        }),
      },
      {
	    test: /\.(jpg|png|gif|svg|pdf|ico)$/,
	    use: [
		        {
		            loader: 'file-loader',
		            options: {
		                name: '[name].[ext]',
		                outputPath: 'public/images/'   
		            },
		        },
	    	 ]
	  },
    ],
  },
  // Enable importing JS files without specifying their's extenstion -> ADDED IN THIS STEP
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
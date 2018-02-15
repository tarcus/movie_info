const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	plugins: [
		// new webpack.DefinePlugin({
  //           'process.env.NODE_ENV': JSON.stringify('development')
  //       }),
		
	],

	module: {
    rules: [
      {
  		test:/\.scss$/,
  		use: ['style-loader','css-loader', 'sass-loader']
  	  },
  	  {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
    ],
  },

devServer: {
    //contentBase: path.resolve(__dirname,'/dist/'),
    historyApiFallback: true,
    // historyApiFallback: {
    //          rewrites: [
    //              { from: /^\/movies/, to: '/index.html' },
    //          ],
    //         index: '/index.html',
    //     },
  }
})
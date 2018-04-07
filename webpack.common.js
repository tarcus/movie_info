const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},


	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			favicon: 'src/images/favicon.ico'
		}),
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
	  // {
   //          test: /\.(png|jp(e*)g|svg)$/,  
   //          use: [{
   //              loader: 'url-loader',
   //              options: { 
   //                  limit: 8000, // Convert images < 8kb to base64 strings
   //                  name: 'images/[hash]-[name].[ext]'
   //              } 
   //          }]
   //    },
	  //собираем шрифты в отдельную папку
	  {
	    test: /\.(woff|woff2|ttf)$/,
	    use: [
		        {
		            loader: 'file-loader',
		            options: {
		                name: '[name].[ext]',
		                outputPath: 'public/fonts/'   
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
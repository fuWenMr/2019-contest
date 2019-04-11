
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	// devtool:'eval-source-map',
	mode:'production',
	entry:'./src/js/index.js',
    output:{
        filename:'bundle.js',
		path:path.resolve(__dirname,'./dist'),
    },
    module:{
        rules: [
			{
			  test: /\.css$/,
			  use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			  })
			},
			{
				test: /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/,
				loader: 'url-loader',
			},
		  ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html'}),
		new CopyWebpackPlugin(
			[{from:'./src/image',to:'image'}],
		{}),
		new ExtractTextPlugin("styles.css"),
		new CleanWebpackPlugin(['dist']),
		],

};
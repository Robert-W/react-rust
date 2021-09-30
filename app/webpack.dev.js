const HtmlWebpackPlugin = require('html-webpack-plugin');
const getEnvironment = require('./webpack.env');
const webpack = require('webpack');
const path = require('path');

let public = path.resolve(__dirname, 'public');

module.exports = {
	target: ['web', 'es5'],
	mode: 'development',
	profile: true,
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: public,
		clean: true,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		static: public,
		compress: true,
		port: 4000
	},
	plugins: [
		new webpack.DefinePlugin(getEnvironment('development')),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
	]
};


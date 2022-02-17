const HtmlWebpackPlugin = require('html-webpack-plugin');
const setEnvironment = require('./webpack.env');
const webpack = require('webpack');
const path = require('path');

let public = path.resolve(__dirname, 'public');

let environment = {
	BABEL_ENV: 'development',
	NODE_ENV: 'development',
};

module.exports = {
	target: ['web', 'es5'],
	mode: 'development',
	profile: true,
	entry: {
		index: './src/index.tsx',
	},
	output: {
		filename: '[name].bundle.js',
		path: public,
		clean: true,
	},
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
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
		new webpack.DefinePlugin(setEnvironment(environment)),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
	]
};


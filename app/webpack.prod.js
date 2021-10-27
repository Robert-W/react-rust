const InlineStylePlugin = require('./plugins/inline-style-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const setEnvironment = require('./webpack.env');
const webpack = require('webpack');
const path = require('path');

let publicDirectoryName = 'public';
let output = path.resolve(__dirname, 'assets');

let environment = {
	BABEL_ENV: 'production',
	NODE_ENV: 'production',
};

/**
 * @name exports
 * @summary Webpack production configurations
 */
module.exports = {
	target: ['web', 'es5'],
	mode: 'production',
	entry: {
		main: path.resolve('src/index'),
	},
	output: {
		path: path.join(output, publicDirectoryName),
		publicPath: `/${publicDirectoryName}/`,
		filename: '[name].[contenthash].js',
	},
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
				exclude: /app\.scss$/,
			},
			{
				test: /app\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'app.[contenthash].css' }),
		new webpack.DefinePlugin(setEnvironment(environment)),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: 'src/index.html',
			filename: path.join(output, 'index.html'),
		}),
		new InlineStylePlugin(HtmlWebpackPlugin, [/.css$/])
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'common',
		},
	},
};

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.ts'
	},
	output: {
		path: path.resolve(__dirname, './lib'),
		filename: '[name].js',
		sourceMapFilename: '[name].map',
		libraryTarget: 'commonjs'
	},
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	resolve: { extensions: ['.ts', '.js'] },
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader'
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: {
				mangle: false,
				output: { comments: true }
			}
		}),
		new webpack.optimize.ModuleConcatenationPlugin,
		new webpack.optimize.OccurrenceOrderPlugin,
	]
}

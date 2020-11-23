const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
    NODE_ENV = 'production'
} = process.env;

module.exports = {
    mode: NODE_ENV,
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
	module: {
		rules: [
			{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
		]
	}
};

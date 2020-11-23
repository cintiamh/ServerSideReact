const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
    NODE_ENV = 'production'
} = process.env;

module.exports = {
    mode: NODE_ENV,
	// Inform webpack that we're building a bundle
	// for nodeJS, rather than for the browser
	target: 'node',

	// Tell webpack the root file of our server application
	entry: './src/index.tsx',

	// Tell webpack where to put the output file that is generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
    },
    
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

	// Tell webpack to run babel on every file it runs through
	module: {
		rules: [
			{
				test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
			}
		]
    },

    plugins: [
        new CleanWebpackPlugin()
    ],
};
const path = require('path');

module.exports = {
	// Tell webpack the root file of our client application
	entry: './src/client/client.tsx',

	// Tell webpack where to put the output file that is generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
    },
    
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
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
	}
};
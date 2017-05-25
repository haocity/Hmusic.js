var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'hmusic.js',
    path: path.resolve(__dirname, 'dist')
  },module: {
        rules:[
            {
                test: /\.js$/,
                loader:"babel-loader",
                include: /src/,
                exclude: /node_modules/
            },{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				include: /src/,
                exclude: /node_modules/
			}

        ]
    }
  
};
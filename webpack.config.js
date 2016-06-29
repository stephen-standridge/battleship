module.exports = {
  entry: './source/Initializer',
  module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /node_modules/,
	      loader: 'babel',
        query: {
          "presets": ["es2015"]
        }
	    },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react"]
        }
      }
	  ]
  },  
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    libraryTarget: "var",
    library: "Battleship"    
  }
};
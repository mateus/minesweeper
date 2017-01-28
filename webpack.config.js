module.exports = {
  entry: "./assets/js/minesweeper.js",
  output: {
      path: __dirname + '/public/assets/js',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  watch: true
};

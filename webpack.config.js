const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    fallback: {
        "fs": false,
        "path": require.resolve("path-browserify")
    }
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.bundle.js',
  },
};
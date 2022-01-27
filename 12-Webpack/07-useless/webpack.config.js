const path = require('path')

module.exports = {
  entry: './src/index',
  devtool: false,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [   // use 是从后往前执行
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }
    ]
  }
}

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

  pages: {
    index: {
      entry: 'src/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(args => {
        args.compilerOptions.whitespace = 'preserve'
      }) 

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

       
  },
  productionSourceMap: false,
  assetsDir: './assets/',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/assets/img', to: 'assets/img' },
        { from: 'src/assets/fonts', to: 'assets/fonts' }
      ])
    ]
  }
}

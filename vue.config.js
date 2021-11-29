module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-form-dragger/main' : '',
  assetsDir: 'static'
}
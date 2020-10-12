module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? 'http://cdn.abc.com/' : '',
  assetsDir: 'static'
}
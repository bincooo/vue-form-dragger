module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.jsdelivr.net/gh/bingco-zhan/vue-form-dragger@0.0.1/dist/' : '',
  assetsDir: 'static'
}
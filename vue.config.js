const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
let PUBLIC_PATH = (function() {
  const GITHUB_PAGE_PATH = "/vue-form-dragger/dist/"
  return process.env.NODE_ENV === "production" ? GITHUB_PAGE_PATH : ""
})()

module.exports = {
  publicPath: PUBLIC_PATH,
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: (config) => {
    // 打包组件库环境
    if (process.env.NODE_ENV === "library") {
      return {
        plugins: [
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, "src/style"),
              to: path.resolve(__dirname, "lib/style")
            }
          ])
        ]
      }
    }
  }
}

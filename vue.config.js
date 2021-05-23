module.exports = {
    css: {
        loaderOptions: {
            less: {
                globalVars: {
                    hack: `true; @import '~@/assets/style/var.less';`
                }
            }
        }
    }
}

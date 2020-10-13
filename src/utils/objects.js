/**
 * 对象深拷贝工具类
 * 拦截器：filter 参数[key, value, ang(fn)]
 */
export default class OUtil {
    constructor(...fn) {
        this.filters = fn
    }

    agn(source) {
        // 判空
        if (source == null) return null

        // 判断是否对象类型
        if (typeof source === 'object') {
            // 是否数组
            if (Array.isArray(source)) {
                let result = []
                for (let x in source) {
                    result.push(this.agn(source[x]))
                }
                return result
            }
            // 是否正则对象
            if (source.constructor === RegExp) return source

            // 为map类型
            let result = {}
            for (let key in source) {
                for (let index in this.filters) {
                    // 拦截器不是一个函数
                    if (!(typeof this.filters[index] === 'function')) {
                        result[key] = this.agn(source[key])
                    }
                    // 执行拦截器
                    let data = this.filters[index](key, source[key], this.agn)
                    // 没有结果返回时
                    result[key] = (typeof data === 'undefined') ? this.agn(source[key]) : data
                }
            }
            return result
        }
        // 不是对象则直接返回
        else {
            return source;
        }
    }
}


/**
 * 数据流转文件下载
 */
function exportFile(name, data) {
    const urlKit = window.URL || window.webkitURL || window
    const blob = new Blob([data])
    const link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    link.href = urlKit.createObjectURL(blob)
    link.download = name
    const event = document.createEvent("MouseEvents")
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    link.dispatchEvent(event)
}


export {
    OUtil,
    exportFile
}
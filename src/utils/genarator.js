const __map__ = {}
export default function encoder(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    const local = {}
    return {
        template: `<el-container><el-form inline style='width: 100%' :model='local' label-width='80px'>${exec(data, 'local.', local)}</el-form></el-container>`,
        data() {
            return {
                local
            }
        }
    }
}

/**
 * 递归方法
 */
function exec(data, pre, local) {
    if (Array.isArray(data)) {
        let html = ''
        data.forEach(item => {
            html += exec(item, pre, local)
        })
        return html
    } else {
        if (__map__[data.type]) {
            return __map__[data.type](data, pre, local)
        }
        else {
            return ''
        }
    }
}

/**
 * 数据绑定
 */
function __fn_bind__(data, local) {
    if (data.value && data.value.trim().length > 0) {
        if (data.value.indexOf('.') > 0) {
            const split = data.value.split('.')
            let len = split.length, d = local
            split.forEach((it, index) => {
                if (index + 1 !== len) {
                    d[it] = {}
                    d = d[it]
                } else {
                    d[it] = data.type === 'checkbox' ? [] : undefined
                }
            })
        } else {
            local[data.value] = data.type === 'checkbox' ? [] : undefined
        }
        return true
    } else return false
}

/**
 * 容器组件生成代码
 */
function container(data, pre, local) {
    const item = function(list) {
        let html = ''
        list.forEach(item => {
            html += exec(item, pre, local)
        })
        return html
    }
    return `<el-container>${item(data.drag)}</el-container>`
}
__map__.container = container


/**
 * 布局组件生成代码
 */
function layout(data, pre, local) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-col id='${data.key}_${index}' :span='${item.span}'>${exec(item.list, pre, local)}</el-col>`
        })
        return html
    }
    return `<el-row id='${data.key}' :gutter='${data.gutter}'>${item(data.drag)}</el-row>`
}
__map__.layout = layout


/**
 * 输入框生成代码
 */
function input(data, pre, local) {
    let bind = __fn_bind__(data, local)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-input ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}px' id='${data.key}' ${data.disabled?'disabled':''} placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.input = input

/**
 * 选择框生成代码
 */
function select(data, pre, local) {
    const item = function(list) {
        let html = ''
        list.forEach(item => {
            html += `<el-option label='${item.label}' ${item.disabled?'disabled':''} value='${item.value}'/>`
        })
        return html
    }
    let bind = __fn_bind__(data, local)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-select ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}px' id='${data.key}' ${data.disabled?'disabled':''} placeholder='${data.placeholder}' value=''>${item(data.option)}</el-select></el-form-item>`
}
__map__.select = select

/**
 * 日期框生成代码
 */
function date(data, pre, local) {
    let bind = __fn_bind__(data, local)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-date-picker ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}px' id='${data.key}' ${data.disabled?'disabled':''} type="date" placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.date = date


/**
 * 开关框生成代码
 */
function _switch(data, pre, local) {
    let bind = __fn_bind__(data, local)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-switch id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''} ${data.disabled?'disabled':''}/></el-form-item>`
}
__map__.switch = _switch


/**
 * 多选框生成代码
 */
function checkbox(data, pre, local) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-checkbox id='${data.key}_${index}' ${data.disabled?'disabled':''} label='${item.value}'>${item.label}</el-checkbox>`
        })
        return html
    }
    let bind = __fn_bind__(data, local)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-checkbox-group id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''}>${item(data.option)}</el-checkbox-group></el-form-item>`
}
__map__.checkbox = checkbox


/**
 * 单选框生成代码
 */
function radio(data, pre, local) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-radio id='${data.key}_${index}' ${data.disabled?'disabled':''} label='${item.value}'>${item.label}</el-radio>`
        })
        return html
    }
    let bind = __fn_bind__(data, local)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-radio-group id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''}>${item(data.option)}</el-radio-group></el-form-item>`
}
__map__.radio = radio


/**
 * 文本域代码生成
 */
function textarea(data, pre, local) {
    let bind = __fn_bind__(data, local)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-input resize='none' id='data.key' ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}px' type="textarea" placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.textarea = textarea
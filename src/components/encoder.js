const __map__ = {}, pre = 'data.'

/**
 * 递归方法
 */
function __fn_build__(data, bind, fn_bind, fn_build) {
    if (Array.isArray(data)) {
        let html = ''
        data.forEach(item => {
            html += __fn_build__(item, bind, fn_bind, fn_build)
        })
        return html
    } else {
        if (__map__[data.type]) {
            return __map__[data.type](data, bind, fn_bind, fn_build)
        }
        else {
            return ''
        }
    }
}

/**
 * 数据绑定
 */
function __fn_bind__(data, bind, _fn_) {
    if (data.value && data.value.trim().length > 0) {
        if (data.value.indexOf('.') > 0) {
            const split = data.value.split('.')
            let len = split.length, d = bind
            split.forEach((it, index) => {
                if (index + 1 !== len) {
                    d[it] = {}
                    d = d[it]
                } else {
                    d[it] = data.type === 'checkbox' ? [] : (_fn_ ? _fn_() : '')
                }
            })
        } else {
            bind[data.value] = data.type === 'checkbox' ? [] : (_fn_ ? _fn_() : '')
        }
        return true
    } else return false
}

/**
 * 布局组件生成代码
 */
function layout(data, _bind_) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-col id='${data.key}_${index}' :span='${item.span}'>${__fn_build__(item.list, _bind_, __fn_bind__, __fn_build__)}</el-col>`
        })
        return html
    }
    return `<el-row id='${data.key}' :gutter='${data.gutter}'>${item(data.drag)}</el-row>`
}
__map__.layout = layout


/**
 * 输入框生成代码
 */
function input(data, _bind_) {
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-input ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}' id='${data.key}' ${data.disabled?'disabled':''} placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.input = input

/**
 * 选择框生成代码
 */
function select(data, _bind_) {
    const item = function(list) {
        let html = ''
        list.forEach(item => {
            html += `<el-option label='${item.label}' ${item.disabled?'disabled':''} value='${item.value}'/>`
        })
        return html
    }
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-select ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}' id='${data.key}' ${data.disabled?'disabled':''} placeholder='${data.placeholder}' value=''>${item(data.option)}</el-select></el-form-item>`
}
__map__.select = select

/**
 * 日期框生成代码
 */
function date(data, _bind_) {
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-date-picker ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}' id='${data.key}' ${data.disabled?'disabled':''} type="date" placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.date = date


/**
 * 开关框生成代码
 */
function _switch(data, _bind_) {
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-switch id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''} ${data.disabled?'disabled':''}/></el-form-item>`
}
__map__.switch = _switch


/**
 * 多选框生成代码
 */
function checkbox(data, _bind_) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-checkbox id='${data.key}_${index}' ${data.disabled?'disabled':''} label='${item.value}'>${item.label}</el-checkbox>`
        })
        return html
    }
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-checkbox-group id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''}>${item(data.option)}</el-checkbox-group></el-form-item>`
}
__map__.checkbox = checkbox


/**
 * 单选框生成代码
 */
function radio(data, _bind_) {
    const item = function(list) {
        let html = ''
        list.forEach((item, index) => {
            html += `<el-radio id='${data.key}_${index}' ${data.disabled?'disabled':''} label='${item.value}'>${item.label}</el-radio>`
        })
        return html
    }
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item  size='${data.size}' label='${data.name}'><el-radio-group id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''}>${item(data.option)}</el-radio-group></el-form-item>`
}
__map__.radio = radio


/**
 * 文本域代码生成
 */
function textarea(data, _bind_) {
    let bind = __fn_bind__(data, _bind_)
    return `<el-form-item size='${data.size}' label='${data.name}'><el-input resize='none' id='${data.key}' ${bind?'v-model="' + pre + data.value + '"': ''} style='width: ${data.width}' type="textarea" placeholder='${data.placeholder}'/></el-form-item>`
}
__map__.textarea = textarea



class encoder {
    constructor(map = {}) {
        this.__map__ = __map__
        for(const key in map) {
            this.put(key, map[key])
        }
    }

    put(key, _Fn_) {
        this.__map__[key] = _Fn_
    }

    del(key) {
        delete this.__map__[key]
    }

    build(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        const local = {}
        return {
            template: `<el-container><el-form style='width: 100%' :model='${pre.substr(0, pre.length - 1)}' label-width='80px'>${__fn_build__(data, local, __fn_bind__, __fn_build__)}</el-form></el-container>`,
            data() {
                return {
                    data: local
                }
            }
        }
    }
}

export default encoder
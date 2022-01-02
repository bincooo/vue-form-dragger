const __config_list__ = [
    {
        type: 'layout',
        name: '布局',
        gutter: 10,
        drag: [
            {
                span: 8,
                list: []
            }, {
                span: 8,
                list: []
            }, {
                span: 8,
                list: []
            }
        ]
    }, {
        type: 'input',
        name: '输入框',
        size: 'mini',
        width: '200px',
        value: '',
        disabled: false,
        labelWidth: '80px',
        placeholder: '请输入',
        rules: [
            { required: true, message: '请输入...', trigger: 'blur', type: 'custom', script: `
                if(value && value != '') {
                  callback()
                } else {
                  callback(new Error('该项不能为空~'))
                }`
            }
        ]
    }, {
        type: 'textarea',
        name: '文本域',
        size: 'mini',
        width: '200px',
        value: '',
        disabled: false,
        labelWidth: '80px',
        placeholder: '请输入文本',
        rules: []
    }, {
        type: 'select',
        name: '选择框',
        size: 'mini',
        width: '200px',
        value: '',
        disabled: false,
        labelWidth: '80px',
        placeholder: '请选择',
        option: [
            {
                label: '区域一',
                value: '1'
            }, {
                label: '区域二',
                value: '2'
            }
        ],
        rules: []
    }, {
        type: 'date',
        name: '日期',
        size: 'mini',
        width: '200px',
        value: '',
        disabled: false,
        labelWidth: '80px',
        placeholder: '请选择日期',
        rules: []
    }, {
        type: 'switch',
        name: '开关',
        size: 'mini',
        value: '',
        disabled: false,
        labelWidth: 80,
        rules: []
    }, {
        type: 'checkbox',
        name: '多选',
        size: 'mini',
        value: '',
        disabled: false,
        labelWidth: '80px',
        option: [
            {
                label: '选择一',
                value: '1',
                disabled: false
            }, {
                label: '选择二',
                value: '2',
                disabled: false
            }
        ],
        rules: []
    }, {
        type: 'radio',
        name: '单选',
        size: 'mini',
        value: '',
        disabled: false,
        labelWidth: '80px',
        option: [
            {
                label: '选择一',
                value: '1',
                disabled: false
            }, {
                label: '选择二',
                value: '2',
                disabled: false
            }
        ],
        rules: []
    }
]


import encoder from './encoder'
class modeler {
    constructor(list = [], _BuMap_ = {}) {
        this.__config_list__ = __config_list__
        if (list.length >= 0) {
            list.forEach(config => this.put(config))
        }
        this.__encoder__ = new encoder(_BuMap_)
    }

    put(config) {
        const index = this.__fn_search__(config.type)
        if (index < 0) {
            this.__config_list__.push(config)
        } else {
            this.__config_list__.splice(index, 1, config)
        }
    }

    del(... types) {
        types.forEach(type => {
            const index = this.__fn_search__(type)
            if (index >= 0) {
                this.__config_list__.splice(index, 1)
            }
        })
    }

    build(data, preview) {
        return this.__encoder__.build(data, preview)
    }

    __fn_search__(type) {
        return !type ? -1 : this.__config_list__.findIndex(config => {
            return type === config.type
        })
    }

    get list() {
        return this.__config_list__
    }
}

export default modeler

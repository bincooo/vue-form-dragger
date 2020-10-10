const modelerConfig = {
    width: '200px',
    list: [
        {
            type: 'container',
            name: '容器',
            drag: []
        }, {
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
            width: 200,
            value: '',
            disabled: false,
            labelWidth: 80,
            placeholder: '请输入'
        }, {
            type: 'textarea',
            name: '文本域',
            size: 'mini',
            width: 200,
            value: '',
            disabled: false,
            labelWidth: 80,
            placeholder: '请输入文本'
        }, {
            type: 'select',
            name: '选择框',
            size: 'mini',
            width: 200,
            value: '',
            disabled: false,
            labelWidth: 80,
            placeholder: '请选择',
            option: [
                {
                    label: '区域一',
                    value: '1'
                },{
                    label: '区域二',
                    value: '2'
                }
            ]
        }, {
            type: 'date',
            name: '日期',
            size: 'mini',
            width: 200,
            value: '',
            disabled: false,
            labelWidth: 80,
            placeholder: '请选择日期'
        }, {
            type: 'switch',
            name: '开关',
            size: 'mini',
            value: '',
            disabled: false,
            labelWidth: 80
        }, {
            type: 'checkbox',
            name: '多选',
            size: 'mini',
            value: '',
            disabled: false,
            labelWidth: 80,
            option: [
                {
                    label: '选择一',
                    value: '1',
                    disabled: false
                },{
                    label: '选择二',
                    value: '2',
                    disabled: false
                }
            ]
        }, {
            type: 'radio',
            name: '单选',
            size: 'mini',
            value: '',
            disabled: false,
            labelWidth: 80,
            option: [
                {
                    label: '选择一',
                    value: '1',
                    disabled: false
                },{
                    label: '选择二',
                    value: '2',
                    disabled: false
                }
            ]
        }
    ]
}

export {
    modelerConfig
}
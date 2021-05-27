import {
  FormElement,
  InputElement
} from '@/components/container/items'

import formConfig from './el-conf/form-config'
import inputConfig from './el-conf/input-config'

const config: any = {
  // 编辑器大小
  size: {},
  // 组件
  compoments: {
    form: FormElement,
    input: InputElement
  },
  // 属性面板表单构建信息
  props: {
    form: formConfig,
    input: inputConfig
  },
  // 组件拖拽条件约束
  condition: {
    root: ["form"],
    form: ["input"]
  },
  // 组件标签
  element: [
    {
      el: "form",
      name: "表单",
      icon: "fa fa-th-list"
    },
    {
      el: "grid",
      name: "栅格",
      icon: "fa fa-th-large"
    },
    {
      el: "layout",
      name: "布局",
      icon: "fa fa-th"
    },
    {
      el: 'input',
      name: '文本输入框',
      icon: 'fa fa-keyboard-o'
    }
  ]
}
export default config

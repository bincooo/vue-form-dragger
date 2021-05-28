import {
  GridElement,
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
    grid: GridElement,
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
    root: ["form", "grid"],
    form: ["input", "grid"]
  },
  // 组件标签
  element: [
    {
      el: "form",
      group: '容器',
      name: "表单",
      icon: "fa fa-th-list"
    },
    {
      el: "grid",
      group: '容器',
      name: "栅格",
      icon: "fa fa-th-large"
    },
    {
      el: "layout",
      group: '容器',
      name: "布局",
      icon: "fa fa-th"
    },
    {
      el: 'input',
      group: '表单组件',
      name: '文本输入框',
      icon: 'fa fa-keyboard-o'
    }
  ]
}
export default config

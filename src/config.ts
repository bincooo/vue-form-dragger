import {
  FormElement
} from '@/components/container/items'

const config: any = {
  // 编辑器大小
  size: {},
  // 组件
  compoments: {
    form: FormElement
  },
  // 属性面板表单构建信息
  props: {
    form: [{
      title: '基本',
      layout: [{
        el: 'inline',
        // TODO
      }]
    }]
  },
  // 组件拖拽条件约束
  condition: {
    root: ['form']
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
    }
  ]
}
export default config

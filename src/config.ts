import {
  FormElement,
  InputElement
} from '@/components/container/items'

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
    form: [{
      title: '基本', // 手风琴标题
      layout: [{ // 布局数据
        el: 'grid',
        col: 1, // 行数
        item: [{ // 标签数据
          el: 'field', // 组件名称
          title: '表单布局',
          field: 'select', // 输入框类型
          map: {
            horizontal: '水平布局', vertical: '垂直布局', inline: '内联布局'
          },
          callback: (binding:any, val:any) => {
            binding.meta = (binding.meta || {})
            binding.meta.layout = val
          }
        }]
      }, { // 布局数据
        el: 'grid',
        col: 2, // 行数
        label: '标签布局',
        item: [{ // 标签数据
          el: 'field', // 组件名称
          title: '标签布局',
          field: 'text', // 输入框类型
          callback: (binding:any, val:any) => {
            binding.meta = (binding.meta || {})
            binding.meta.layout = val
          }
        }]
      }]
    }, {
      title: '其他',
      layout: [{
        el: 'block'
      }]
    }]
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

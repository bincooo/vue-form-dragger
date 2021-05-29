export default [
  {
    title: "基本",
    layout: [
      {
        // 布局数据
        el: "grid",
        col: 1, // 行数
        item: [
          {
            // 标签数据
            el: "field", // 组件名称
            title: "标签",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.label
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.label = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "字段绑定",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.filed
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.filed = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "组件 id",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.id
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.id = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "组件 class",
            field: "textbox", // 输入框类型
            get(binding: any) {
              return (binding.meta.class)||[]
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.class = val
            }
          }
        ]
      },
      {
        // 布局数据
        el: "grid",
        col: 2, // 行数
        item: [
          {
            // 标签数据
            el: "field", // 组件名称
            title: "宽度",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.width
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.width = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "提示信息",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.placeholder
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.placeholder = val
            }
          }
        ]
      },
      {
        // 布局数据
        el: "grid",
        col: 2, // 行数
        label: "标签布局",
        item: [
          {
            // 标签数据
            el: "field", // 组件名称
            title: "跨度",
            field: "text", // 输入框类型
            get(binding:any) {
              return binding.meta.labelCol?.span
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.labelCol = binding.meta.labelCol || {}
              binding.meta.labelCol.span = Number(val)
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "偏移",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.labelCol?.offset
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.labelCol = binding.meta.labelCol || {}
              binding.meta.labelCol.offset = val
            }
          }
        ]
      },
      {
        // 布局数据
        el: "grid",
        col: 2, // 行数
        label: "包裹布局",
        item: [
          {
            // 标签数据
            el: "field", // 组件名称
            title: "跨度",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.wrapperCol?.span
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.wrapperCol = binding.meta.wrapperCol || {}
              binding.meta.wrapperCol.span = Number(val)
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "偏移",
            field: "text", // 输入框类型
            get(binding: any) {
              return binding.meta.wrapperCol?.offset
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.wrapperCol = binding.meta.wrapperCol || {}
              binding.meta.wrapperCol.offset = val
            }
          }
        ]
      }
    ]
  },
  {
    title: "其他",
    layout: [
      {
        el: "block"
      }
    ]
  }
]

export default [
  {
    title: "基本", // 手风琴标题
    layout: [
      {
        // 布局数据
        el: "grid",
        col: 1, // 行数
        item: [
          {
            // 标签数据
            el: "field", // 组件名称
            title: "表单布局",
            field: "select", // 输入框类型
            map: {
              horizontal: "水平布局",
              vertical: "垂直布局",
              inline: "内联布局"
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.layout = val
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
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.labelCol = binding.meta.labelCol || {}
              binding.meta.labelCol.spen = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "偏移",
            field: "text", // 输入框类型
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
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.wrapperCol = binding.meta.wrapperCol || {}
              binding.meta.wrapperCol.spen = val
            }
          },
          {
            // 标签数据
            el: "field", // 组件名称
            title: "偏移",
            field: "text", // 输入框类型
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.wrapperCol = binding.meta.wrapperCol || {}
              binding.meta.wrapperCol.offset = val
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
            title: "跨度",
            field: "radio", // 输入框类型
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.colon = (val === "1")
            }
          }, {
            // 标签数据
            el: "field", // 组件名称
            title: "标签对齐",
            field: "select", // 输入框类型
            map: {
                left: '左对齐',
                right: '右对齐'
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.colon = (val === "1")
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

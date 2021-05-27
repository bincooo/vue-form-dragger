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

export default [
  {
    title: "基本",
    layout: [
      {
        el: "grid",
        col: 1,
        item: [
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
              return binding.meta.class || []
            },
            callback: (binding: any, val: any) => {
              binding.meta = binding.meta || {}
              binding.meta.class = val
            }
          }
        ]
      },
      {
        el: "grid",
        col: 1,
        label: "布局项",
        item: [
          {
            el: "field", // 组件名称
            title: "布局项",
            field: "grid-item", // 输入框类型
            get(binding: any) {
              return binding.items
            },
            callback(binding: any, val: any) {
              binding.items = val
            }
          }
        ]
      },
      {
        el: "grid",
        col: 2,
        item: [
          {
            el: "field",
            title: "垂直对齐",
            field: "select",
            map: {
              top: "顶部",
              middle: "居中",
              bottom: "底部"
            },
            get(binding: any) {
              return binding.meta.align || "middle"
            },
            callback(binding: any, val: any) {
              binding.meta = binding.meta || {}
              binding.meta.align = val
            }
          },
          {
            el: "field",
            title: "水平排列",
            field: "select",
            map: {
              start: "左边",
              center: "居中",
              end: "右边"
            },
            get(binding: any) {
              return binding.meta.justify || "end"
            },
            callback(binding: any, val: any) {
              binding.meta = binding.meta || {}
              binding.meta.justify = val
            }
          }
        ]
      }
    ]
  }
]

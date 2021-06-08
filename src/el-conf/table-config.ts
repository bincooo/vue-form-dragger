export default [
    {
      title: "基本", // 手风琴标题
      layout: [
        {
          el: 'grid',
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
              get(binding:any) {
                return binding.meta?.width
              },
              callback: (binding: any, val: any) => {
                binding.meta = binding.meta || {}
                binding.meta.width = val
              }
            },
            {
              // 标签数据
              el: "field", // 组件名称
              title: "高度",
              field: "text", // 输入框类型
              get(binding: any) {
                return binding.meta?.height
              },
              callback: (binding: any, val: any) => {
                binding.meta = binding.meta || {}
                binding.meta.height = val
              }
            }
          ]
        },
        {
          // 布局数据
          el: "grid",
          col: 4, // 行数
          item: [
            {
              // 标签数据
              el: "field", // 组件名称
              title: "对齐方式",
              field: "select", // 输入框类型
              map: {
                  '': 'NONE',
                  left: '靠左',
                  center: '居中',
                  right: '靠右'
              },
              get(binding: any) {
                return binding.meta?.float
              },
              callback: (binding: any, val: any) => {
                binding.meta.float = val
              }
            },  {
              // 标签数据
              el: "field", // 组件名称
              title: "边框",
              field: "number", // 输入框类型
              get(binding: any) {
                return binding.meta?.border
              },
              callback: (binding: any, val: any) => {
                binding.meta = binding.meta || {}
                binding.meta.border = val
              }
            },  {
                // 标签数据
                el: "field", // 组件名称
                title: "颜色",
                field: "color", // 输入框类型
                get(binding: any) {
                  return binding.meta?.borderColor
                },
                callback: (binding: any, val: any) => {
                  binding.meta = binding.meta || {}
                  binding.meta.borderColor = val
                }
            },  {
                // 标签数据
                el: "field", // 组件名称
                title: "边框样式",
                field: "select", // 输入框类型
                map: {
                    '': 'NONE',
                    dashed: '虚线',
                    solid: '实线'
                },
                get(binding: any) {
                  return binding.meta?.borderStyle
                },
                callback: (binding: any, val: any) => {
                  binding.meta = binding.meta || {}
                  binding.meta.borderStyle = val
                }
            },  {
                // 标签数据
                el: "field", // 组件名称
                title: "背景色",
                field: "color", // 输入框类型
                get(binding: any) {
                  return binding.meta?.backgroundColor
                },
                callback: (binding: any, val: any) => {
                  binding.meta = binding.meta || {}
                  binding.meta.backgroundColor = val
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
  
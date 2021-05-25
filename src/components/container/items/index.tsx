import { Options, Vue } from "vue-class-component"
import DragWrapper from "@/components/container/drag-wrapper.vue"
import { Inject } from "vue-property-decorator"

/**
 * 视图面板右键菜单事件绑定
 * @param config 全局配置
 * @param other 指令 1删除 2设置 3拷贝
 * @param token 令牌
 * @param list 组件描述集合
 */
export function bind(config:any, other:number, token:string, list:any[]) {
  const { mitt, CPKit } = config
  switch(other) {
    case 1:
      mitt.on(`del:${token}`, () => {
        const li = list.filter(item => item.key = token)
        ;(() => (!!li && li.length > 0 ? list.splice(list.indexOf(li[0]), 1) : null))()
      })
      break
    case 2:
      mitt.on(`set:${token}`, (callback:Function) => {
        const li = list.filter(item => item.key = token)
        ;(() => (!!li && li.length > 0 ? callback.call(li[0]) : null))()
      })
      break
    case 3:
      mitt.on(`copy:${token}`, () => {
        const li = list.filter(item => item.key = token)
        if (!!li && li.length > 0) {
          const element = li[0]
          const index = list.indexOf(element)
          list.splice(index, 0, CPKit.copy({}, {
            ...list[index],
            key: `${element.el}-${Date.now()}`
          }))
        }
      })
      break
  }
}

/**
 * 表单容器
 */
@Options({
  name: "form-element",
  props: ["modelValue"],
  components: { DragWrapper }
})
export class FormElement extends Vue {
  @Inject() config: any
  readonly modelValue!: any

  created() {
    const element = this.modelValue
    if (!!element && !element.children) {
      element.children = []
    }
  }

  render() {
    const size = { minHeight: "200px" }
    return (
      <a-form title="表单" style="min-height: 200px">
        {!!this.modelValue?.children ? (
          <drag-wrapper move={this.onMove} v-model={this.modelValue.children} data-box={this.modelValue.el} size={size} />
        ) : null}
      </a-form>
    )
  }

  menuHandler(other: number, token: string) {

  }

  onMove(other: number, evt: any) {
    console.log("other:" + other, evt)
    switch (other) {
      case 1:
        console.log("start --->")
        break
      case 2:
        console.log("end --->")
        break
      case 3:
        console.log("move --->")
        break
      case 4:
        console.log("add --->")
        const index = evt.newIndex
        // 表单不允许嵌套
        const path = evt.path
        for (let index = 0; index < path.length; index++) {
          const element = path[index]
          if (element.classList.contains("__container-panel_")) {
            break
          }
          if (element.hasAttribute("box") && element.getAttribute("box") === "form") {
            
            this.modelValue.children.splice(index, 1)
            return false
          }
        }
        // =============
        const condition = (this.config.condition || {})[this.modelValue.el]
        if (!condition) return false
        const {children} = this.modelValue
        const {mitt, CPKit} = this.config
        const ndata = CPKit.copy({}, {
          ...children[index],
          key: `${children[index].el}-${Date.now()}`
        })
        children.splice(index, 1, ndata)
        bind(this.config, 1, ndata.key, children)
        bind(this.config, 2, ndata.key, children)
        bind(this.config, 3, ndata.key, children)
        break
    }
  }

  
}
// ======================

/**
 * 文本输入框
 */
@Options({
  name: "input-element"
})
export class InputElement extends Vue {
  render() {
    return (
      <a-form-item label="Activity name">
        <a-input />
      </a-form-item>
    )
  }
}
// ======================

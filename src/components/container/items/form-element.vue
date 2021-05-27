<template>
  <div title="表单" v-unmarsk style="padding-left: 10px">
    <drag-wrapper
      v-model="modelValue.children"
      :data-box="modelValue.el"
      :attribute="{
        tag: 'a-form',
        move: onMove,
        style: { minHeight: '60px' },
        props: getComponentData
      }"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import DragWrapper from "@/components/container/drag-wrapper.vue"
import { Inject, Watch } from "vue-property-decorator"
import { bind } from "./index"

@Options({
  name: "form-element",
  props: ["modelValue"],
  components: { DragWrapper }
})
export default class FormElement extends Vue {
  @Inject() config: any
  readonly modelValue!: any

  @Watch("modelValue.meta.layout")
  onLayout(val:any) {
    const { mitt } = this.config
    mitt.emit(`layout:${this.modelValue.key}`, val)
  }

  created() {
    const element = this.modelValue
    if (!!element && !element.children) {
      element.children = []
    }
    if (!!element && !element.meta) {
      element.meta = {}
    }
  }

  onMove(other: number, evt: any) {
    const { children } = this.modelValue
    const index = evt.newIndex
    const condition = this.config.condition
    switch (other) {
      case 1:
        console.log("start --->")
        break
      case 2:
        console.log("end --->")
        break
      case 3: // 移动事件
            // 根节点处理
        const element = evt.draggedContext.element
        if (!evt.to.hasAttribute("data-box")) {
          return !!condition["root"] ? condition["root"].includes(element.el) : true
        }
        // 子节点处理
        else {
          const el = evt.to.getAttribute("data-box")
          return !!condition[el] ? condition[el].includes(element.el) : true
        }
      case 4: // add 事件
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
        const { CPKit } = this.config
        const ndata = CPKit.copy({}, {
            ...children[index],
            key: `${children[index].el}-${Date.now()}`
        })
        children.splice(index, 1, ndata)
        bind(this.config, ndata.key, children)
        return true
    }
  }

  getComponentData() {
    return {
      layout: this.modelValue.meta.layout
    }
  }

}
</script>

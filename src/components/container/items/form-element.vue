<template>
  <div title="表单" v-unmarsk>
    <drag-wrapper
      v-model="modelValue.children"
      :data-box="modelValue.el"
      :attribute="{
        tag: 'a-form',
        move: onMove,
        size: { minHeight: '200px' }
      }"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import DragWrapper from "@/components/container/drag-wrapper.vue"
import { Inject } from "vue-property-decorator"
import { bind } from "./index"

@Options({
  name: "form-element",
  props: ["modelValue"],
  components: { DragWrapper }
})
export default class FormElement extends Vue {
  @Inject() config: any
  readonly modelValue!: any

  created() {
    const element = this.modelValue
    if (!!element && !element.children) {
      element.children = []
    }
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
        const { children } = this.modelValue
        const { mitt, CPKit } = this.config
        const ndata = CPKit.copy(
          {},
          {
            ...children[index],
            key: `${children[index].el}-${Date.now()}`
          }
        )
        children.splice(index, 1, ndata)
        bind(this.config, 1, ndata.key, children)
        bind(this.config, 2, ndata.key, children)
        bind(this.config, 3, ndata.key, children)
        return true
    }
  }
}
</script>

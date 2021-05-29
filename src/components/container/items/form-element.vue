<template>
  <section title="表单" v-unmarsk>
    <drag-wrapper
      v-model="modelValue.children"
      :data-box="modelValue.el"
      :attribute="{
        tag: 'a-form',
        move: onMove,
        style: { minHeight: '200px', alignContent: 'flex-start' },
        props: componentData
      }"
    />
  </section>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import wrapper from "@/components/container/drag-wrapper.vue"
import { Inject } from "vue-property-decorator"

@Options({
  name: "form-element",
  props: ["modelValue"],
  components: { "drag-wrapper": wrapper }
})
export default class FormElement extends Vue {
  @Inject() config: any
  readonly modelValue!: any
  cache: any = {}

  created() {
    const element = this.modelValue
    if (!!element && !element.children) {
      element.children = []
    }
    if (!!element && !element.meta) {
      element.meta = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  }

  onMove(other: number, evt: any) {
    const { item: div } = evt
    switch (other) {
      case 1: // 开始移动
        const model = this.modelValue
        this.cache = { ...div.style }
        if (model.meta?.layout !== "inline") {
          div.style = { maxHeight: "3px", minHeight: "3px" }
        }
        break
      case 2: // 结束移动
        const { minHeight, maxHeight } = this.cache
        div.style = { maxHeight, minHeight }
        break
      case 3: // 移动事件
      case 4: // 添加事件
        const { children } = this.modelValue
        const { moveHandler } = this.config
        return moveHandler(other, evt, children, this.$nextTick)
    }
  }

  componentData() {
    const { layout, wrapperCol } = this.modelValue.meta
    return {
      ...this.modelValue.meta,
      wrapperCol: layout === "inline" ? {} : wrapperCol
    }
  }
}
</script>

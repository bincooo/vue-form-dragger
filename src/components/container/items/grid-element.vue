<template>
  <a-row
    class="grid"
    :align="modelValue.meta?.align"
    :justify="modelValue.meta?.justify"
    v-unmarsk
    :title="modelValue.name"
  >
    <template v-for="(item, index) in modelValue.items" :key="index">
      <a-col :span="item.span">
        <drag-wrapper
          v-model="item.children"
          :data-box="modelValue.el"
          :attribute="{
            move: (o, e) => onMove(o, e, item.children),
            style: { minHeight: '30px', width: '100%' }
          }"
        />
      </a-col>
    </template>
  </a-row>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
import DragWrapper from "../drag-wrapper.vue"
import { bind } from "./index"

@Options({
  name: "grid-element",
  components: { DragWrapper },
  props: ["modelValue"]
})
export default class GridElement extends Vue {
  @Inject() config: any
  readonly modelValue: any

  created() {
    const element = this.modelValue
    if (!!element && !element.items) {
      element.items = [
        {
          span: 12,
          children: []
        },
        {
          span: 12,
          children: []
        }
      ]
      element.meta = {}
    }
  }

  onMove(other: number, evt: any, children: any[]) {
    const { newIndex: index, item: div } = evt
    const condition = this.config.condition
    switch (other) {
      case 1: // 开始移动
        break
      case 2: // 结束移动
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
            children.splice(index, 1)
            return false
          }
        }
        // 添加新的元素时绑定事件    
        const { CPKit } = this.config
        const ndata = CPKit.copy({}, {
          ...children[index],
          key: `${children[index].el}-${Date.now()}`
        })
        children.splice(index, 1, ndata)
        this.config.active = ndata.key
        bind(this.config, children)
        return true
    }
  }
}
</script>

<style lang="less">
.drag-builder > .__container-panel_ .__view_ {
  .grid {
    padding: 2px;
    > .ant-col:hover {
      outline: 1px dashed @global-box-border-color;
    }
  }
}
</style>

<template>
  <a-row
    class="grid"
    :align="modelValue.meta?.align"
    :justify="modelValue.meta?.justify"
    v-unmarsk
    :title="modelValue.name"
  >
    <template v-for="(item, index) in modelValue.items" :key="index">
      <a-col :span="item.span" :class="{ empty: !item.children || item.children.length === 0 }">
        <drag-wrapper
          v-model="item.children"
          :data-box="modelValue.el"
          :attribute="{
            move: (o, e) => onMove(o, e, item.children),
            style: { minHeight: '30px' }
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
    switch (other) {
      case 1: // 开始移动
        break
      case 2: // 结束移动
        break
      case 3: // 移动事件
      case 4: // add 事件
        const { moveHandler } = this.config
        return moveHandler(other, evt, children)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
.grid {
  padding: 2px;
  > .empty {
    border: 1px dashed @global-box-border-color;
  }
}
</style>

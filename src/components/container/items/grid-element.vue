<template>
  <a-row class="grid" v-unmarsk :title="modelValue.name">
    <template v-for="(item, index) in modelValue.items" :key="index">
      <a-col :span="item.span">
        <drag-wrapper
          @contextmenu.prevent
          v-model="item.children"
          :data-box="modelValue.el"
          :attribute="{
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

@Options({
  name: "grid-element",
  components: { DragWrapper },
  props: ["modelValue", "contextmenu"]
})
export default class GridElement extends Vue {
  @Inject() config: any
  readonly modelValue: any
  readonly contextmenu!: Function

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
    }
    this.contextmenu((evt: any, element: any) => {
      const { showmenu } = this.config
      let previousElementSibling = evt.target.parentNode,
        x = 0
      const parentTop = previousElementSibling.parentNode.offsetTop
      const parentLeft = previousElementSibling.parentNode.offsetLeft
      while ((previousElementSibling = previousElementSibling.previousElementSibling) !== null)
        x += previousElementSibling.clientWidth
      showmenu(x + evt.layerX + parentLeft + 10 + "px", evt.layerY + parentTop + 30 + "px", element)
    })
  }
}
</script>

<style lang="less">
.drag-builder > .__container-panel_ .__view_ {
  .grid {
    padding: 2px;
    > .ant-col {
      border: 1px dashed grey;
    }
  }
}
</style>

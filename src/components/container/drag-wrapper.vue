<template>
  <draggable
    :tag="attribute.tag"
    class="__drag_"
    ghost-class="__placeholder_"
    group="container"
    :list="modelValue"
    animation="300"
    item-key="type"
    @start="(e) => attribute.move(1, e)"
    @end="(e) => attribute.move(2, e)"
    :move="(e) => attribute.move(3, e)"
    @add="(e) => attribute.move(4, e)"
    @remove="(e) => attribute.move(5, e)"
  >
    <template #item="d">
      <component
        :token="d.element.key"
        @contextmenu.stop="contextmenu($event, d.element)"
        class="__box_ marsk"
        :is="config.compoments[d.element.el]"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
import draggable from "vuedraggable"

@Options({
  name: "drag-wrapper",
  components: { draggable },
  props: ["modelValue", "attribute"]
})
export default class DragWrapper extends Vue {
  @Inject() config: any
  readonly attribute: any = {}

  created() {
    const attribute = this.attribute
    attribute.move = attribute.move || function() {}
  }

  mounted() {
    const { style } = this.$el
    const { width, height, minWidth, minHeight } = this.attribute.size || {}
    style.width = width
    style.height = height
    style.minWidth = minWidth
    style.minHeight = minHeight
  }

  contextmenu(evt: any, element: any) {
    const { layerX, layerY, currentTarget } = evt
    this.config.showmenu(`${layerX + 30}px`, `${layerY + 30}px`, element.key)
    evt.preventDefault()
    evt.returnValue = false
  }
}
</script>

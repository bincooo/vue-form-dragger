<template>
  <draggable
    :tag="tag"
    class="__drag_"
    ghost-class="__placeholder_"
    group="container"
    :list="modelValue"
    animation="300"
    item-key="type"
    @start="(e) => move(1, e)"
    @end="(e) => move(2, e)"
    :move="(e) => move(3, e)"
    @add="(e) => move(4, e)"
  >
    <template #item="d">
      <component
        :token="d.element.key"
        @contextmenu.stop="contextmenu($event, d.element)"
        class="__box_"
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
  props: {
    tag: String,
    modelValue: Object,
    size: Object,
    move: Function
  }
})
export default class DragWrapper extends Vue {
  @Inject() config: any
  readonly size?: any
  readonly move: Function = () => {}

  mounted() {
    const { style } = this.$el
    const { width, height, minWidth, minHeight } = this.size || {}
    style.width = width
    style.height = height
    style.minWidth = minWidth
    style.minHeight = minHeight
  }

  contextmenu(evt: any, element: any) {
    evt.returnValue = false
    const { layerX, layerY, currentTarget } = evt
    this.config.showmenu(`${layerX}px`, `${layerY + 10}px`, currentTarget.getAttribute("token"))
  }
}
</script>

<template>
  <draggable
    :tag="attribute.tag"
    class="__drag_"
    ghost-class="__placeholder_"
    group="container"
    :list="modelValue"
    animation="300"
    item-key="type"
    :component-data="attribute?.props()"
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
        v-model="d.element"
        class="__box_ marsk"
        :contextmenu="(fn) => (childrenmenu = fn)"
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
  childrenmenu?: Function

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
    const { layerX, layerY } = evt
    const { offsetLeft, offsetTop } = evt.target
    this.config.showmenu(`${offsetLeft + layerX + 5}px`, `${offsetTop + layerY + 25}px`, element.key)
    if (!!this.childrenmenu) {
      this.childrenmenu(evt, element)
    }
    evt.preventDefault()
    evt.returnValue = false
  }
}
</script>

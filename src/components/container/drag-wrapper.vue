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
    @start="(e) => notice(1, e)"
    @end="(e) => notice(2, e)"
    :move="(e) => notice(3, e)"
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
  readonly modelValue: any
  readonly attribute: any = {}
  childrenmenu?: Function

  created() {
    const attribute = this.attribute
    attribute.move = attribute.move || function() {}
  }

  mounted() {
    const { CPKit } = this.config
    const style = this.attribute.style || {}
    CPKit.copy(this.$el.style, style)
  }

  contextmenu(evt: any, element: any) {
    const { layerX, layerY } = evt
    const { offsetLeft, offsetTop } = evt.target
    this.config.showmenu(`${offsetLeft + layerX + 5}px`, `${offsetTop + layerY + 25}px`, element)
    if (!!this.childrenmenu) {
      this.childrenmenu(evt, element)
    }
    evt.preventDefault()
    evt.returnValue = false
  }

  notice(other:number, evt:any) {
    const ret = this.attribute.move(other, evt)
    const { mitt } = this.config
    const element = (!!evt.oldIndex || evt.oldIndex > -1) ? this.modelValue[evt.oldIndex] : evt.draggedContext.element
    mitt.emit(`notice:${element.key}`, {other, evt})
    return ret
  }
}
</script>

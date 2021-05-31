<template>
  <draggable
    :tag="attribute.tag"
    class="drag"
    ghost-class="placeholder"
    group="container"
    :list="modelValue"
    animation="300"
    item-key="type"
    :component-data="componentData()"
    @start="(e) => innerMove(1, e)"
    @end="(e) => innerMove(2, e)"
    :move="(e) => innerMove(3, e)"
    @add="(e) => innerMove(4, e)"
    @remove="(e) => innerMove(5, e)"
  >
    <template #item="d">
      <component
        :token="d.element.key"
        v-model="d.element"
        class="box marsk"
        :class="{active: config.active === d.element.key}"
        @click.stop="config.active = (config.active === d.element.key) ? null : d.element.key"
        :is="config.components[d.element.el]"
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

  componentData() {
    const { props } = this.attribute
    if (!!props && typeof(props) === "function") {
      return props()
    }
  }

  innerMove(other: number, evt: any) {
    const { move } = this.attribute
    if (!!move && typeof(move) === "function") {
      return move(other, evt)
    }
  }
}
</script>

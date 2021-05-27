<template>
  <div :style="{minWidth}">
    <a-form-item :label="modelValue.meta.label" style="padding: 2px">
      <a-input v-blur />
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "input-element",
  props: ["modelValue"]
})
export default class InputElement extends Vue {
  @Inject() config: any
  readonly modelValue: any

  get minWidth() {
    const element = this.modelValue
    return !!element.meta?.width ? element.meta.width : "280px"
  }

  created() {
    const element = this.modelValue
    if (!!element && !element.meta) {
      element.meta = {}
    }
  }
}
</script>

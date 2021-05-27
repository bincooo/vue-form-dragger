<template>
  <div :style="{ minWidth }">
    <a-form-item :label="label" style="padding: 0 2px">
      <a-input v-blur :placeholder="modelValue.meta.placeholder" :style="{ width: modelValue.meta?.minWidth }" />
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

  get label() {
    const label = this.modelValue.meta?.label
    return !!label ? label : "标签"
  }

  get minWidth() {
    const width = this.modelValue.meta?.width
    return !!width ? width : "190px"
  }

  created() {
    const element = this.modelValue
    if (!!element && !element.meta) {
      element.meta = {}
    }
  }
}
</script>

<template>
  <div :title="modelValue.name">
    <a-form-item :label="label" style="padding: 0 2px" :labelCol="modelValue.meta?.labelCol" :wrapperCol="modelValue.meta?.wrapperCol">
      <a-input v-blur :placeholder="modelValue.meta.placeholder" :style="{ width: modelValue.meta?.width }" />
    </a-form-item>
    <div style="clear:both"></div>
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
  minWidth: string|null = '226px'

  get label() {
    const label = this.modelValue.meta?.label
    return !!label ? label : "标签"
  }

  created() {
    const element = this.modelValue
    if (!!element && !element.meta) {
      element.meta = {}
    }
  }
}
</script>

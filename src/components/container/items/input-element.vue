<template>
  <div :style="style">
    <a-form-item label="Activity name">
      <a-input v-blur />
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "input-element"
})
export default class InputElement extends Vue {
  @Inject() config: any
  style: any = {}

  mounted() {
    const mitt = this.config.mitt
    mitt.on("layout", (val:string) => {
      if (val === "inline") {
          this.style.height = "42px"
          this.style.maxHeight = "42px"
      } else {
        this.style.height = undefined
      }
    })
  }
}
</script>

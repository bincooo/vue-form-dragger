<template>
  <div class="__collapse_">
    <slot />
  </div>
</template>
<script lang="ts">
import { Provide } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "collapse",
  props: ["active"]
})
export default class Collapse extends Vue {
  @Provide() native:any = {
    active: -1
  }
  active:number|string|null = -1
  click(val:string|number) {
    this.active = this.active === null ? val : null
  }

  mounted() {
    this.native.active = this.active
  }
}
</script>

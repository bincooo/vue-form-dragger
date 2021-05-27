<template>
  <div style="min-width: 280px">
    <a-form-item label="Activity name" style="padding: 2px">
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
}
</script>

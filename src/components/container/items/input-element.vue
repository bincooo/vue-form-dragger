<template>
  <div>
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
}
</script>

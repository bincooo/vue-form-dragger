<template>
  <div>
    <a-form-item label="Activity name">
      <a-input v-blur />
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({
  name: "input-element"
})
export default class InputElement extends Vue {
}
</script>

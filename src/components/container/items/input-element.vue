<template>
  <div style="min-height: 60px;max-height: 60px; min-width: 280px">
    <a-form-item label="Activity name">
      <a-input v-blur />
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { Inject, Watch } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "input-element"
})
export default class InputElement extends Vue {
  @Inject() config: any
  
  updated() {
    console.log(1234455);
  }
}
</script>

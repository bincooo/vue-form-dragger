<template>
  <div class="field">
    <span>{{ item.title }}</span>
    <div>
      <input type="text" @keyup="item.callback(config.setup.element, $event.target.value)" />
    </div>
  </div>
</template>
<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
@Options({
  name: "field",
  props: ["modelValue", "item"]
})
export default class Field extends Vue {
  @Inject() config!: any
}
</script>

<style lang="less">
.drag-builder > .__setup-panel_ .__inner_ .layout > .field {
  > span {
    font-size: 12px;
    color: @global-font-color;
  }
  > div > input {
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    text-decoration: none;
    outline: 0;
    border: 1px solid @global-border-color;
    height: 25px;
    padding: 0 5px;
  }
}
</style>

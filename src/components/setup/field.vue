<template>
  <div class="field">
    <span>{{ item.title }}</span>
    <div v-if="item.field === 'text'">
      <input type="text" @keyup="item.callback(config.setup.element, $event.target.value)" />
    </div>
    <div v-else-if="item.field === 'select'">
      <select @change="item.callback(config.setup.element, $event.target.value)">
        <option v-for="(item, key) in item.map" :value="key" :key="key">
            {{item}}
        </option>
      </select>
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
.drag-builder > .__setup-panel_ .inner .field {
  > span {
    font-size: 12px;
    color: @global-font-color;
  }
  > div > input, > div > select {
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    text-decoration: none;
    outline: 0;
    border: 1px solid @global-border-color;
    height: 25px;
    padding: 0 5px;
    border-radius: 0;
  }
}
</style>

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
    <div v-if="item.field === 'radio'">
      <div class="switch">
        <input text="No" type="radio" :name="item.title" @change="item.callback(config.setup.element, $event.target.value)" value=0 />
        <input text="Yes" type="radio" :name="item.title" @change="item.callback(config.setup.element, $event.target.value)" value=1 />
      </div>
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
  .switch {
    text-align: center;
    height: 25px;
    line-height: 25px;
    border: 1px solid @global-border-color;
    border-radius: 15px;
    > :nth-child(1) {
      &::after {
        content: attr(text);
        text-align: center;
        position: relative;
        display: inline-block;
        left: -62px;
        height: 23px;
        width: 76px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        z-index: 1;
        background-color: @global-background-color;
        border-right: 1px solid @global-border-color;
      }
    }
    > :nth-child(2) {
      &::after {
        content: attr(text);
        text-align: center;
        position: relative;
        display: inline-block;
        left: 0px;
        height: 23px;
        width: 75px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        z-index: 1;
        background-color: @global-background-color;
        border-left: 1px solid @global-border-color;
      }
    }
    input {
      width: unset;
      cursor: pointer;
    }
    >:checked::after {
      background-color: #ebeeee;
    }
  }
  input, button, select, optgroup, textarea {
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
    border: 1px solid @global-border-color;
    height: 25px;
    padding: 0 5px;
    border-radius: 0;
  }
}
</style>

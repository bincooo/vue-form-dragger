<template>
  <div class="field">
    <span>{{ item.title }}</span>
    <div v-if="item.field === 'text'">
      <input type="text" :disabled=item.disabled :value="item.get(config.setup.element)"
        @keyup="item.callback(config.setup.element, $event.target.value)" />
    </div>
    <div v-else-if="item.field === 'select'">
      <select :disabled=item.disabled @change="item.callback(config.setup.element, $event.target.value)">
        <option v-for="(value, key) in item.map" 
          :selected="key === item.get(config.setup.element)" :value="key" :key="key">
            {{value}}
        </option>
      </select>
    </div>
    <div v-if="item.field === 'radio'">
      <div class="switch" :class="{disabled:item.disabled}">
        <input text="否" type="radio" :checked="0 == item.get(config.setup.element)" 
          :name="item.title" @change="item.callback(config.setup.element, $event.target.value)" value=0 />
        <input text="是" type="radio" :checked="1 == item.get(config.setup.element)"
          :name="item.title" @change="item.callback(config.setup.element, $event.target.value)" value=1 />
      </div>
    </div>
    <div v-if="item.field === 'textbox'">
      <div class="textbox">
        <div v-for="(value, index) in item.get(config.setup.element)" :key=index>
          {{value}}
          <i class="fa fa-times-circle-o" @click="textbox.splice(index, 1)" />
        </div>
        <input type="text" @keydown="onTextboxKeydown($event, item)" />
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
  readonly item:any
  textbox:string[] = [
  ]

  created() {
    if (this.item.field === 'textbox') {
      this.textbox = [...this.item.get(this.config.setup.element)]
    }
  }

  onTextboxKeydown(evt:any, item:any) {
    const textbox = this.textbox
    const target = evt.target
    // 删除
    if (evt.key === "Backspace" && target.value === "") {
      textbox.splice(textbox.length - 1, 1)
      item.callback(this.config.setup.element, this.textbox)
    }
    else
    // 回车
    if (evt.key === "Enter" && target.value.trim() !== "") {
      textbox.splice(textbox.length, 0, target.value.trim())
      item.callback(this.config.setup.element, this.textbox)
      target.value = ""
    }
  }
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
    > :nth-child(1) {
      width: 50%;
      height: 23px;
      box-sizing: border-box;
      &::after {
        content: attr(text);
        text-align: center;
        position: relative;
        display: block;
        left: 0;
        height: 23px;
        z-index: 1;
        background-color: @global-background-color;
        border-right: 1px solid @global-border-color;
        cursor: pointer;
      }
    }
    > :nth-child(2) {
      width: 50%;
      height: 23px;
      &::after {
        content: attr(text);
        text-align: center;
        position: relative;
        display: inline-block;
        display: block;
        left: 0;
        height: 23px;
        z-index: 1;
        background-color: @global-background-color;
        cursor: pointer;
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
  .disabled::after {
    content: '';
    position: relative;
    display: block;
    top: -30px;
    height: 23px;
    background-color: #d2d1d163;
    z-index: 1;
  }
  .textbox {
    border: 1px solid @global-border-color;
    > div, input {
      display: inline-block;
      width: auto;
    }
    > div {
      border: 1px dashed @global-border-color;
      margin: 1px;
      float: left;
      padding: 0 2px;
      > i {
        color: @global-border-color;
        cursor: pointer;
      }
    }
    > input {
      border: 0px;
      display: block;
      margin-bottom: 1px;
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

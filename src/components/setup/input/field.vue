<template>
  <div class="field">
    <span>{{ item.title }}</span>
    <div v-if="item.field === 'text'">
      <input
        type="text"
        :disabled="item.disabled"
        :value="item.get(config.setup.element)"
        @keyup="item.callback(config.setup.element, $event.target.value)"
      />
    </div>
    <div v-else-if="item.field === 'number'">
      <input
        type="number"
        :disabled="item.disabled"
        :value="item.get(config.setup.element)"
        @keyup="item.callback(config.setup.element, $event.target.value)"
      />
    </div>
    <div v-else-if="item.field === 'select'">
      <select :disabled="item.disabled" @change="item.callback(config.setup.element, $event.target.value)">
        <option
          v-for="(value, key) in item.map"
          :selected="key === item.get(config.setup.element)"
          :value="key"
          :key="key"
        >
          {{ value }}
        </option>
      </select>
    </div>
    <div v-else-if="item.field === 'radio'">
      <div class="switch" :class="{ disabled: item.disabled }">
        <input
          text="否"
          type="radio"
          :checked="0 == item.get(config.setup.element)"
          :name="item.title"
          @change="item.callback(config.setup.element, $event.target.value)"
          value="0"
        />
        <input
          text="是"
          type="radio"
          :checked="1 == item.get(config.setup.element)"
          :name="item.title"
          @change="item.callback(config.setup.element, $event.target.value)"
          value="1"
        />
      </div>
    </div>
    <div v-else-if="item.field === 'textbox'">
      <div class="textbox" :class="{ disabled: item.disabled }" @click="(e) => e.target.children[0].focus()">
        <div v-for="(value, index) in item.get(config.setup.element)" :key="index">
          {{ value }}
          <i class="fa fa-times-circle-o" @click="textbox.splice(index, 1)" />
        </div>
        <input type="text" @click.stop @keydown="onTextboxKeydown($event, item)" />
      </div>
    </div>
    <div v-else-if="item.field === 'grid-item'">
      <div class="grid-item">
        <div>
          <button @click="onGridItemAdd">添加</button>
        </div>
        <div v-for="(item, index) in items" :key="index">
          <input type="number" @keyup="onGridItemKeyup($event, index)" :value="item.span" />
          <button @click="onGridItemDel(index)">删除</button>
        </div>
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
  readonly item: any
  textbox: string[] = []
  items: any[] = []

  created() {
    if (this.item.field === "textbox") {
      this.textbox = [...this.item.get(this.config.setup.element)]
    } else if (this.item.field === "grid-item") {
      this.items = [...this.item.get(this.config.setup.element)]
    }
  }

  onTextboxKeydown(evt: any, item: any) {
    const textbox = this.textbox
    const target = evt.target
    // 删除
    if (evt.key === "Backspace" && target.value === "") {
      textbox.splice(textbox.length - 1, 1)
      item.callback(this.config.setup.element, this.textbox)
    }
    // 回车
    else if (evt.key === "Enter" && target.value.trim() !== "") {
      textbox.splice(textbox.length, 0, target.value.trim())
      item.callback(this.config.setup.element, this.textbox)
      target.value = ""
    }
  }

  onGridItemAdd() {
    this.items.splice(this.items.length, 1, { span: 12, children: [] })
    this.item.callback(this.config.setup.element, this.items)
  }

  onGridItemDel(index: number) {
    // 保留一个
    if (this.items?.length > 1) {
      this.items.splice(index, 1)
      this.item.callback(this.config.setup.element, this.items)
    }
  }

  onGridItemKeyup(evt: any, index: number) {
    const element = this.items[index]
    const value = evt.target.value
    element.span = Number(value)
    this.item.callback(this.config.setup.element, this.items)
  }
}
</script>

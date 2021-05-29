<template>
  <div class="grid-item">
    <div>
      <button @click="onAdd">添加</button>
    </div>
    <div v-for="(item, index) in items" :key="index">
      <input type="number" @keyup="onKeyup($event, index)" :value="item.span" />
      <button @click="onDel(index)">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "grid-item",
  props: ["item"]
})
export default class GridItem extends Vue {
  @Inject() config: any
  readonly item: any
  items: any[] = []

  created() {
    this.items = [...this.item.get(this.config.setup.element)]
  }

  onAdd() {
    this.items.splice(this.items.length, 1, { span: 12, children: [] })
    this.item.callback(this.config.setup.element, this.items)
  }

  onDel(index: number) {
    this.items.splice(index, 1)
    this.item.callback(this.config.setup.element, this.items)
  }

  onKeyup(evt: any, index: number) {
    const element = this.items[index]
    const value = evt.target.value
    element.span = Number(value)
    this.item.callback(this.config.setup.element, this.items)
  }
}
</script>

<style lang="less">
.drag-builder > .__setup-panel_ .inner .grid-item {
  button:first-child {
    width: 200px;
    font-size: 12px;
    color: grey;
    background-color: white;
    border: 1px dashed @global-border-color;
    border-radius: 0px;
    margin: 2px;
    &:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
    &:active {
      background-color: #dddddd;
    }
  }
  > div {
    text-align: center;
    margin-bottom: 2px;
    > input {
      width: 140px;
      font-size: 12px;
      box-sizing: border-box;
      outline: 0;
      border: 1px solid @global-border-color;
      height: 25px;
      padding: 0 5px;
      border-radius: 0;
      margin-right: 4px;
    }
    > button {
      width: 56px;
      font-size: 12px;
      color: grey;
      box-sizing: border-box;
      outline: 0;
      border: 1px solid @global-border-color;
      height: 25px;
      border-radius: 0px;
      &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }
      &:active {
        background-color: #dddddd;
      }
    }
  }
}
</style>

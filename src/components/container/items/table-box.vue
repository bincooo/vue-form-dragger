<template>
  <div class="table-box" :title="modelValue.name" v-unmarsk>
    <table cellspacing="0" cellpadding="0" @contextmenu.stop="contextmenu">
      <thead>
        <tr>
          <template v-for="(item, index) in modelValue.meta.head" :key="index">
            <th v-show="!item.del" :colspan="item.colspan" :serial="index" :class="item.class" :style="item.style">
              <div v-show="!item.edit" @dblclick="edit($event, item)">{{ item.text }}&emsp;</div>
              <input v-show="item.edit" @keyup="onInputKeyup($event, item)" type="text" :value="item.text" />
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue.meta.body" :key="index">
          <template v-for="(it, idx) in item" :key="idx">
            <td
              v-show="!it.del"
              :rowspan="it.rowspan"
              :colspan="it.colspan"
              :serial="serial(index, idx)"
              :class="{ 'last-td': false }"
              :style="it.style"
            >
              <div v-show="!it.edit" @dblclick="edit($event, it)">{{ it.text }}&emsp;</div>
              <input v-show="it.edit" @keyup="onInputKeyup($event, it)" :value="it.text" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Vue, Options } from "vue-class-component"
import Tbu from "./table-box-util"

@Options({
  name: "table-box",
  props: ["modelValue"]
})
export default class TableBox extends Vue {
  @Inject() config: any
  readonly modelValue: any
  cacheEdit: any = null
  update: number = 0

  created() {
    const model = this.modelValue
    const { CPKit } = this.config
    if (model) {
      model.meta = {}
      model.meta.head = CPKit.copy([], Tbu.template())
      model.meta.body = [CPKit.copy([], Tbu.template()), CPKit.copy([], Tbu.template())]
    }
  }

  serial(i1: number, i2: number) {
    return i1 + "-" + i2
  }

  edit(evt: any, item: any) {
    if (this.cacheEdit) this.cacheEdit.edit = false
    this.cacheEdit = item
    item.edit = true
    this.$nextTick(() => evt.target.nextElementSibling.focus())
    evt.stopPropagation()
    evt.returnValue = false
  }

  onInputKeyup(evt: any, item: any) {
    item.text = evt.target.value
    if (["NumpadEnter", "Enter"].includes(evt.code)) {
      item.edit = false
    }
    evt.stopPropagation()
    evt.returnValue = false
  }

  contextmenu(evt: any) {
    console.log("表格的右键", evt)
    Tbu.menuHandler(evt, this)
    evt.returnValue = false
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.table-box {
  box-sizing: border-box;
  overflow: auto;
  padding: 2px;
  table {
    width: 100%;
    height: 100%;
    border: 1px dashed @global-box-border-color;
    tr td,
    tr th {
      border: 1px dashed @global-box-border-color;
      box-sizing: content-box;
      padding: 2px;
      margin: 1px;
      position: relative;
      > input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        border: 1px solid;
        outline: 0;
        border-radius: 0;
      }
    }
    .cell-selected {
      position: relative;
      &::after {
        content: "";
        background-color: rgba(180, 215, 255, 0.7);
        border: 1px solid rgba(180, 215, 255, 0.7);
        bottom: -1px;
        left: -1px;
        position: absolute;
        right: -1px;
        top: -1px;
      }
    }
  }
}
</style>

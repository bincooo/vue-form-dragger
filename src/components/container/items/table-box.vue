<template>
  <div
    v-unmarsk
    class="table-box"
    :title="modelValue.name"
    :style="{
      minHeight,
      float: modelValue.meta.float === 'center' ? null : modelValue.meta.float
    }"
  >
    <table
      ref="tableRef"
      cellspacing="0"
      cellpadding="0"
      @contextmenu.stop="contextmenu"
      :border="modelValue.meta.border"
      :style="{
        width: modelValue.meta.width,
        height: modelValue.meta.height,
        borderColor: modelValue.meta.borderColor,
        borderStyle: modelValue.meta.borderStyle,
        backgroundColor: modelValue.meta.backgroundColor,
        marginLeft: modelValue.meta.float === 'center' ? 'auto' : null,
        marginRight: modelValue.meta.float === 'center' ? 'auto' : null
      }"
    >
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
import { Inject, Ref } from "vue-property-decorator"
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
  minHeight: string | null = null
  @Ref() tableRef!: any

  created() {
    const model = this.modelValue
    const { CPKit } = this.config
    if (model) {
      model.meta = {}
      model.meta.head = CPKit.copy([], Tbu.template())
      model.meta.body = [CPKit.copy([], Tbu.template()), CPKit.copy([], Tbu.template()), CPKit.copy([], Tbu.template())]
    }
  }

  mounted() {
    Tbu.editAddListener(this)
  }

  serial(i1: number, i2: number) {
    return i1 + "-" + i2
  }

  edit(evt: any, item: any) {
    if (this.cacheEdit) this.cacheEdit.edit = false
    this.cacheEdit = item
    item.edit = true
    this.minHeight = this.tableRef.offsetHeight + 5 + "px"
    this.$nextTick(() => evt.target.nextElementSibling.focus())
    evt.stopPropagation()
    evt.returnValue = false
  }

  onInputKeyup(evt: any, item: any) {
    item.text = evt.target.value
    if (["NumpadEnter", "Enter"].includes(evt.code)) {
      item.edit = false
      this.minHeight = null
    }
    evt.stopPropagation()
    evt.returnValue = false
  }

  contextmenu(evt: any) {
    if (this.cacheEdit) {
      this.cacheEdit.edit = false
      this.minHeight = null
    }
    Tbu.menuHandler(evt, this)
    evt.returnValue = false
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.table-box {
  overflow: hidden;
  padding: 2px;
  min-height: 82px;
  table:not([border]),
  table[border="0"] {
    border: 1px dashed @global-box-border-color;
    tr td:not([style*="border-style"]),
    tr th:not([style*="border-style"]) {
      border: 1px dashed @global-box-border-color;
    }
  }
  table {
    tr td:not([style*="padding"]),
    tr th:not([style*="padding"]) {
      padding: 4px;
    }
    width: 100%;
    height: 100%;
    min-height: 82px;
    tr td,
    tr th {
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
        min-height: 26px;
        background-color: white;
      }
    }
    tr td[selected],
    tr th[selected] {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        background-color: rgba(180, 215, 255, 0.7);
        border: 1px solid rgba(180, 215, 255, 0.7);
        top: 0;
        bottom: -1px;
        left: -1px;
        right: -1px;
      }
    }
  }
}
</style>

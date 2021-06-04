<template>
  <div class="table-box" :title="modelValue.name" v-unmarsk>
    <table cellspacing="0" cellpadding="0" @contextmenu.stop="contextmenu">
      <thead>
        <tr>
          <template v-for="(item, index) in modelValue.meta.head" :key="index">
            <th v-if="!item.del" :serial="index" :class="item.class" :style="item.style">{{ item.text }}&emsp;</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue.meta.body" :key="index">
          <template v-for="(it, idx) in item" :key="idx">
            <td v-if="!it.del" :serial="serial(index, idx)" :class="{ 'last-td': false }" :style="it.style">
              {{ it.text }}&emsp;
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
    // border-collapse: unset;
    tr td,
    tr th {
      border: 1px dashed @global-box-border-color;
      box-sizing: content-box;
      padding: 2px;
      margin: 1px;
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

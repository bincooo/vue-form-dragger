<template>
  <div class="table-box" v-unmarsk>
    <table width="100%" cellspacing="0" cellpadding="0" @contextmenu.stop="contextmenu">
      <thead>
        <tr>
          <th v-for="(item, index) in modelValue.meta.head" :serial="index" :key="index" :style="item.style">
            {{ item.text }}&emsp;
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue.meta.body" :key="index">
          <td v-for="(it, idx) in item" :key="idx" :serial="serial(index, idx)" :style="it.style">
            {{ it.text }}&emsp;
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Vue, Options } from "vue-class-component"

@Options({
  name: "table-box",
  props: ["modelValue"]
})
export default class TableBox extends Vue {
  @Inject() config: any
  readonly modelValue: any

  created() {
    const model = this.modelValue
    if (model) {
      model.meta = {}
      model.meta.head = []
      model.meta.body = [
        [
          {
            type: 0,
            text: "",
            style: {}
          },
          {
            type: 0,
            text: "",
            style: {}
          },
          {
            type: 0,
            text: "",
            style: {}
          },
          {
            type: 0,
            text: "",
            style: {}
          }
        ]
      ]
    }
  }

  serial(i1: number, i2: number) {
    return i1 + "-" + i2
  }

  contextmenu(evt: any) {
    const config = this.config
    const { offsetLeft, offsetTop } = config.el
    const { pageX, pageY } = evt
    const { meta } = this.modelValue
    console.log("表格的右键", evt)
    const serial: string = evt.target.hasAttribute("serial") ? evt.target.getAttribute("serial") : null
    const menuList = {
      width: "100px",
      list: [
        {
          text: "表格",
          icon: "fa fa-chevron-right",
          list: []
        }
      ]
    }
    const { list }: any = menuList.list[0]
    if (Object.keys(meta.head).length === 0) {
      list.push({
        text: "添加头",
        icon: "fa fa-question-circle",
        handler(evt: any) {
          const size = Object.keys(meta.body[0]).length
          for (let index = 0; index < size; index++) {
            meta.head.push({ type: 0, text: "", style: {} })
          }
        }
      })
    } else {
      list.push({
        text: "删除头",
        icon: "fa fa-question-circle",
        handler(evt: any) {
          meta.head = []
        }
      })
    }
    list.push({
      text: "添加行",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        const li = []
        const size = Object.keys(meta.body[0]).length
        const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[0]) : 0
        for (let index = 0; index < size; index++) {
          li.push({ type: 0, text: "", style: {} })
        }
        meta.body.splice(idx + 1, 0, li)
      }
    })
    if (meta.body.length > 1) {
      list.push({
        text: "删除行",
        icon: "fa fa-question-circle",
        handler(evt: any) {
          const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[0]) : NaN
          if (serial.indexOf("-") > 0) {
            meta.body.splice(idx, 1)
          } else {
            meta.head = []
          }
        }
      })
    }
    list.push({
      text: "添加列",
      icon: "fa fa-question-circle",
      handler(evt: any) {
        if (Object.keys(meta.head).length !== 0) {
          meta.head.push({ type: 0, text: "", style: {} })
        }
        for (let index = 0; index < meta.body.length; index++) {
          const idx: number = serial.indexOf("-") > 0 ? parseInt(serial.split("-")[1]) : parseInt(serial)
          const li = Object.values(meta.body[index])
          li.splice(idx + 1, 0, { type: 0, text: "", style: {} })
          meta.body[index] = li
        }
      }
    })
    config.showmenu(pageX - offsetLeft - 260 + "px", pageY - offsetTop + "px", this.modelValue, menuList)
    evt.returnValue = false
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.table-box {
  box-sizing: border-box;
  overflow: auto;
  table {
    td,
    th {
      border-right: 1px dashed @global-box-border-color;
      border-bottom: 1px dashed @global-box-border-color;
      height: 25px;
    }
    thead,
    tbody {
      th:last-child,
      td:last-child {
        border-right: unset;
      }
      tr:last-child {
        td {
          border-bottom: unset;
        }
      }
    }
  }
}
</style>

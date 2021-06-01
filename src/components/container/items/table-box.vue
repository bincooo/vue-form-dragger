<template>
  <div class="table-box">
    <table cellspacing="0" width="100%" cellpadding="0">
      <thead>
        <tr>
          <th v-for="(item, index) in modelValue.meta.head" :key="index" :style="item.style">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue.meta.body" :key="index">
          <td v-for="(it, idx) in item" :key="idx" :style="item.style">{{it.text}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component"

@Options({
  name: "table-box",
  props: ["modelValue"]
})
export default class TableBox extends Vue {
  readonly modelValue: any

  created() {
    const model = this.modelValue
    if (model) {
      model.meta = {
        head: [
          {
            text: "H1",
            style: {}
          },
          {
            text: "H2",
            style: {}
          },
          {
            text: "H3",
            style: {}
          },
          {
            text: "H4",
            style: {}
          },
          {
            text: "H5",
            style: {}
          }
        ],
        body: [
          [
            {
              type: 0,
              text: "A1",
              style: {}
            },
            {
              type: 0,
              text: "A2",
              style: {}
            },
            {
              type: 0,
              text: "A3",
              style: {}
            },
            {
              type: 0,
              text: "A4",
              style: {}
            },
            {
              type: 0,
              text: "A5",
              style: {}
            }
          ],
          [
            {
              type: 0,
              text: "B1",
              style: {}
            },
            {
              type: 0,
              text: "B2",
              style: {}
            },
            {
              type: 0,
              text: "B3",
              style: {}
            },
            {
              type: 0,
              text: "B4",
              style: {}
            },
            {
              type: 0,
              text: "B5",
              style: {}
            }
          ]
        ]
      }
    }
  }

  mounted() {}
}
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.table-box {
  box-sizing: border-box;
  table {
    td, th {
      border-right: 1px dashed @global-box-border-color;
      border-bottom: 1px dashed @global-box-border-color;
    }
    thead,
    tbody {
      th:last-child, td:last-child {
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

<template>
  <div class="table-box">
      <table cellspacing="0" width="100%" cellpadding="0">
        <thead>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </thead>
        <tbody>
          <tr>
            <td>A1</td>
            <td>A2</td>
            <td>A3</td>
            <td>A4</td>
            <td>A5</td>
          </tr>
          <tr>
            <td>B1</td>
            <td>B2</td>
            <td>B3</td>
            <td>B4</td>
            <td>B5</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component"

@Options({ name: "table-box" })
export default class TableBox extends Vue {
  mounted() {

  }
}
</script>
<style lang="less" scoped>
@import "~@/style/var.less";
.table-box {
  box-sizing: border-box;
  table {
    td {
      border-right: 1px dashed @global-box-border-color;
      border-bottom: 1px dashed @global-box-border-color;
    }
    thead,
    tbody {
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

<template>
  <div class="grid" :class="{ label: !!layout.label }" :label="layout.label">
    <table style="width: 100%">
      <tr v-for="(item, index) in list" :key="index">
        <td :style="{ width: `${100 / layout.col}%` }" v-for="(it, idx) in item" :key="idx">
          <template v-if="it !== null">
            <!-- <component :is="it.el" :item=it /> -->
            <component :is="config.setupComponents[it.el]" :item="it" />
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
@Options({
  name: "grid",
  props: ["modelValue", "layout"]
})
export default class Grid extends Vue {
  @Inject() config: any
  readonly layout: any

  get list(): any[] {
    const list: any[] = []
    const { item, col } = this.layout
    if (!item) return list
    item.push({})
    for (let index = 0; index < item.length; index++) {
      if (col === 1) {
        list.push([item[index]])
      } else if (index > 0 && index % col === 0) {
        const it = item.slice(index - col, index)
        list.push(it)
      } else if (item.length - 1 === index && (index % col !== 0 || index < col)) {
        const it = item.slice(index - (index % col), index)
        list.push(it)
      }
    }
    // 最后一行tr中td不足col,则补全
    const li = list[list.length - 1]
    if (li.length < col) {
      for (let index = li.length; index < col; index++) {
        li.push(null)
      }
    }
    console.log(list)
    return list
  }
}
</script>

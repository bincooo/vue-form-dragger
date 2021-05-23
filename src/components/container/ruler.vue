<template>
  <div :style="size">
    <svg ref="svg" :style="size">
      <path :d="path_d" stroke="#d0d0d0" stroke-width="2" />
      <g class="label" style="font-size: 8px">
        <text v-for="(text, index) in textList" stroke="#6d6d6d" :x="text.x" :y="text.y" :key="index">
          {{ text.tex }}
        </text>
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"
@Options({
  name: "ruler",
  props: {
    left: Boolean
  }
})
export default class ruler extends Vue {
  private left: boolean = false
  private path_d: string = ""
  private size?: any = {}
  private textList: Array<any> = []

  mounted() {
    this.reload()
    this.$el.oncontextmenu = (event: any) => {
      event.returnValue = false
    }
    this.$el.onselectstart = (event: any) => {
      event.returnValue = false
    }
    const global = window as any
    global.__resize_fn__ = (window as any).__resize_fn__ || []
    global.__resize_fn__.push(() => {
      this.reload()
    })
    if (!global.__resize_evt__) {
      global.__resize_evt__ = function(event: any) {
        global.__resize_fn__.forEach((callback: Function) => {
          callback.call(event)
        })
      }
      global.addEventListener("resize", global.__resize_evt__)
    }
  }

  reload() {
    const textList = []
    const left = this.left
    const { offsetWidth, offsetHeight } = this.$el
    // 总长
    let size: number = left ? offsetHeight : offsetWidth
    if (left) {
      this.size = {
        height: "100%",
        width: "20px"
      }
    } else {
      this.size = {
        height: "20px",
        width: "100%"
      }
    }
    // 步长
    const pos: number = 10
    const tmp: number = 0
    let d = ""
    for (let index = 0; index < size; index += pos) {
      if (tmp >= size) break
      const remain: number = (index / pos) % 10
      const M_Y: number = remain == 0 ? 0 : remain == 5 ? 6 : 12
      if (left) {
        d += `M${M_Y} ${index + 1} L20 ${index + 1} `
        if (remain != 0) continue
        textList.push({
          x: 2,
          y: index + 10,
          tex: index
        })
      } else {
        d += `M${index + 1} ${M_Y} L${index + 1} 20 `
        if (remain != 0) continue
        textList.push({
          x: index + 4,
          y: 8,
          tex: index
        })
      }
    }
    this.path_d = d
    this.textList = textList
  }
}
</script>

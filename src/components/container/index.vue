<template>
  <div class="container-panel" @click="showmenu = false" @mouseleave="showmenu = false">
    <div class="inner" :class="{ empty: !modelValue.list || modelValue.list.length === 0 }">
      <div class="view" @contextmenu="contextmenu" :style="{ ...modelValue.size }">
        <draggable
          class="drag"
          ghost-class="placeholder"
          group="container"
          :list="modelValue.list"
          animation="300"
          item-key="type"
          @add="onAdd"
          :move="onMove"
        >
          <template #item="d">
            <component
              :token="d.element.key"
              v-model="d.element"
              class="box marsk"
              :class="{ active: config.active === d.element.key }"
              @click="config.defaultClickEvt(d.element.key)"
              :is="config.components[d.element.el]"
            />
          </template>
        </draggable>
      </div>
      <Ruler id="ruler_1" />
      <Ruler id="ruler_2" left />
      <resize hidden />
    </div>
    <ul ref="menu" class="contextmenu" v-show="this.showmenu">
      <li @click="menuHandler(1)"><i class="fa fa-trash" />删除</li>
      <li @click="menuHandler(2)"><i class="fa fa-clipboard" />复制</li>
      <li @click="menuHandler(3)"><i class="fa fa-cogs" />设置</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Inject, Ref } from "vue-property-decorator"
import Ruler from "./ruler.vue"
import resize from "vue-drag-resize"
import draggable from "vuedraggable"
import mitt from "mitt"
import { bind, unbind } from "@/handler"

@Options({
  name: "container-panel",
  props: ["modelValue"],
  components: { Ruler, resize, draggable }
})
export default class Container extends Vue {
  @Inject() readonly config!: any
  readonly modelValue!: any
  @Ref() readonly menu!: any
  showmenu: boolean = false

  created() {
    const config = this.config
    config.mitt = mitt()
    config.defaultClickEvt = (key: string): void => {
      if (this.showmenu) {
        config.showmenu(0, 0, {}, false)
        return
      }
      config.active = config.active === key ? null : key
    }
    config.showmenu = (x: string, y: string, element: any, show: boolean = true): void => {
      this.showmenu = show
      const menu = this.menu
      menu.style.top = y
      menu.style.left = x
      config.token = element.key
      config.setup.element = element
    }
  }

  onAdd(e: any): void {
    console.log("onadd")
    const index = e.newIndex
    const list = this.modelValue.list
    const data = list[index]
    const ndata: any = {}
    this.config.CPKit.copy(ndata, {
      ...data,
      key: `${data.el}-${Date.now()}`
    })
    list.splice(index, 1, ndata)
    const condition = this.config.condition
    if (!condition["root"] || condition["root"].includes(data.el)) {
      list.splice(index, 1, ndata)
      this.config.active = ndata.key
    } else {
      list.splice(index, 1)
    }
  }

  onMove(evt: any) {
    // 根节点处理
    const condition = this.config.condition
    const element = evt.draggedContext.element
    if (!evt.to.hasAttribute("data-box")) {
      return !!condition["root"] ? condition["root"].includes(element.el) : true
    }
    // 子节点处理
    else {
      const el = evt.to.getAttribute("data-box")
      return !!condition[el] ? condition[el].includes(element.el) : true
    }
  }

  contextmenu(evt: any) {
    const { path, pageX, pageY } = evt
    const keys: string[] = []
    for (let index = 0; index < path.length; index++) {
      const element = path[index]
      // 根节点退出循环
      if (element.classList.contains("view")) {
        break
      }
      if (element.hasAttribute("token")) {
        keys.push(element.getAttribute("token"))
      }
    }
    keys.reverse()
    const { list } = this.modelValue
    let element = null
    const gEl = (key: string, list: any[] = []): any => {
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        if (element.key === key) return element
      }
    }
    let temp: any[] = list
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      element = gEl(key, temp)
      if (!element) return
      if (element.hasOwnProperty("items")) {
        temp = []
        element?.items.forEach((el: any) => temp.push(...el.children))
      } else temp = element.children || []
    }
    const { offsetLeft, offsetTop } = this.config.el
    if (!element) return
    this.config.showmenu(pageX - offsetLeft - 260 + "px", pageY - offsetTop + "px", element)
    evt.preventDefault()
    evt.returnValue = false
  }

  menuHandler(other: number) {
    const { setup, token, mitt, CPKit } = this.config
    const g_list: any[] = this.modelValue.list || []
    const list = g_list.filter((item: any) => item.key === token)
    const data = list.length > 0 ? list[0] : null
    switch (other) {
      case 1: {
        // 删除
        if (!!data) {
          g_list.splice(g_list.indexOf(data), 1)
          data.children?.forEach((el: any) => unbind(this.config, el))
        } else mitt.emit(`del:${token}`)
        break
      }
      case 2: {
        // 拷贝
        const index = !!data ? g_list.indexOf(data) : -1
        const ndata: any = {}
        if (!!data) {
          g_list.splice(
            index + 1,
            0,
            CPKit.copy(ndata, {
              ...data,
              key: null
            })
          )
          const element = g_list[index + 1]
          if (element.hasOwnProperty("items")) {
            element.items?.forEach((el: any) => bind(this.config, el.children))
          } else bind(this.config, element.children)
        } else mitt.emit(`copy:${token}`)
        break
      }
      case 3: {
        // 配置
        setup.show = true
        break
      }
    }
  }
}
</script>

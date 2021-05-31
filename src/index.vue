<template>
  <div class="drag-builder" :style="size">
    <element-panel :element="config.element" />
    <container-panel v-model="data" />
    <setup-panel v-model="config.setup.element" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Provide } from "vue-property-decorator"
import ElementPanel from "./components/element/index.vue"
import ContainerPanel from "./components/container/index.vue"
import SetupPanel from "./components/setup/index.vue"
import Obj, { is, uuid } from "@/utils/obj"
import { moveHandler } from "./handler"
import "@/style/index.less"

class Handler implements Obj.Handler {
  order: number = 1
  support(param: Obj.Parameter): boolean {
    return param.key === "key"
  }
  worked(param: Obj.Parameter, data: any, chain: Obj.Fn) {
    return param.target.el + "-" + uuid()
  }
}

@Options({
  name: "drag-builder",
  props: ["config"],
  components: { ElementPanel, ContainerPanel, SetupPanel }
})
export default class DragBuilder extends Vue {
  @Provide() config: any = {}
  data: any = {
    size: {},
    list: []
  }

  get size(): any {
    const { width, height } = this.config.size || {}
    return {
      width: is(width, "number") ? `${width}px` : is(width, "string") ? width : null,
      height: is(height, "number") ? `${height}px` : is(height, "string") ? height : null
    }
  }

  created() {
    const config = this.config
    config.moveHandler = (...args: any) => moveHandler.apply(config, args)
    config.reload = () => {
      this.$forceUpdate()
    }
    config.CPKit = new Obj.Coper()
    config.CPKit.addHandler(new Handler())
    config.showmenu = false
    config.setup = { show: false, element: null }
  }

  mounted() {
    this.config.el = this.$el
    this.jsLoad("#fonticon", "//use.fontawesome.com/355056eaf2.js")
    this.$el.oncontextmenu = (evt: any) => (evt.returnValue = false)
  }

  jsLoad(key: string, src: string) {
    const dom = document.body.querySelector(key)
    if (!dom) {
      const script = document.createElement("script")
      script.src = src
      script.id = "fontaware"
      document.body.appendChild(script)
    }
  }
}
</script>

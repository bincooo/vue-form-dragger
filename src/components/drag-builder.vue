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
import ElementPanel from "./element/index.vue"
import ContainerPanel from "./container/index.vue"
import SetupPanel from "./setup/index.vue"
import Obj, { is } from "@/utils/obj"

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
    this.config.CPKit = new Obj.Coper()
    class HandlerImpl implements Obj.Handler {
      order: number = 1
      support(param: Obj.Parameter): boolean {
        return param.key === "key"
      }
      worked(param: Obj.Parameter, data: any, chain: Obj.Fn) {
        const split:string[] = data.split("-")
        return `${split[0]}-${Date.now()}`
      }
    }
    this.config.CPKit.addHandler(new HandlerImpl())
    this.config.showmenu = false
    this.config.setup = {
      show: false,
      element: null
    }
  }

  mounted() {
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

<style lang="less">
.drag-builder {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

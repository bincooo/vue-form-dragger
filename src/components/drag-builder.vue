<template>
  <div class="drag-builder" :style="size">
    <element-panel :element="config.element" />
    <container-panel v-model:showmenu="showmenu" v-model="data" />
    <setup-panel />
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
  showmenu: boolean = false
  @Provide() config: any = {}
  @Provide() coper: Obj.Coper = new Obj.Coper()
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

  mounted() {
    const $fontaware = document.body.querySelector("#fontaware")
    if (!$fontaware) {
      const $script = document.createElement("script")
      $script.id = "fontaware"
      $script.src = "//use.fontawesome.com/355056eaf2.js"
      document.body.appendChild($script)
    }
    this.$el.oncontextmenu = (evt:any) => evt.returnValue = false
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

<template>
  <div
    class="__container-panel_"
    @mouseleave="$emit('update:showmenu', false)"
    @click="$emit('update:showmenu', false)"
  >
    <div class="__inner_" :class="{ __empty_: !modelValue.list || modelValue.list.length === 0 }">
      <div class="__view_" :style="{ ...modelValue.size }">
        <draggable
          class="__drag_"
          ghost-class="__placeholder_"
          :group="{
            name: 'container',
            pull: 'clone',
            put: true
          }"
          :list="modelValue.list"
          animation="300"
          item-key="type"
          @add="onAdd"
        >
          <template #item="d">
            <component
              @contextmenu.stop="contextmenu($event, d.element)"
              :box="d.element.el"
              :token="d.element.key"
              class="__box_"
              :is="config.compoments[d.element.el]"
            />
          </template>
        </draggable>
      </div>
      <Ruler id="ruler_1" />
      <Ruler id="ruler_2" left />
    </div>
    <ul ref="menu" class="__contextmenu_" v-show="showmenu">
      <li @click="menuhandler(1)"><i class="fa fa-trash" />删除</li>
      <li @click="menuhandler(2)"><i class="fa fa-clipboard" />复制</li>
      <li @click="menuhandler(3)"><i class="fa fa-cogs" />设置</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Inject, Ref } from "vue-property-decorator"
import Ruler from "./ruler.vue"
import draggable from "vuedraggable"
import Obj from "@/utils/obj"

@Options({
  name: "container-panel",
  props: ["modelValue", "showmenu"],
  components: { Ruler, draggable }
})
export default class Container extends Vue {
  @Inject() readonly config!: any
  @Inject() readonly coper!: Obj.Coper
  readonly modelValue!: any
  @Ref() readonly menu!: any

  created() {}

  onAdd(e: any): void {
    const index = e.newIndex
    const data = this.modelValue.list[index]
    const ndata: any = {}
    this.coper.copy(ndata, {
      ...data,
      key: `${data.el}_${Date.now()}`
    })
    this.modelValue.list.splice(index, 1, ndata)
  }

  contextmenu(evt: any, element: any) {
    evt.returnValue = false
    this.$emit("update:showmenu", true)
    const menu = this.menu
    menu.style.left = `${evt.layerX}px`
    menu.style.top = `${evt.layerY + 10}px`
    this.config.token = evt.currentTarget.getAttribute("token")
  }

  menuhandler(num:number) {
      switch(num) {
          case 1: {
              console.log('删除')
              break
          }
          case 2: {
              console.log('复制')
              break
          }
          case 3: {
              console.log('配置')
              break
          }
      }
  }
}
</script>

<style lang="less">
.drag-builder > .__container-panel_ {
  margin-left: @element-panel-width + 4px;
  margin-top: 2px;
  margin-right: 2px;
  margin-bottom: 2px;
  height: calc(100% - 4px);
  max-width: 100%;
  border: 1px solid @global-border-color;
  background-color: @global-background-color;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  > .__inner_ {
    height: 100%;
    width: 100%;
    min-width: 100%;
    min-height: 100%;
    position: relative;
    #ruler_1 {
      padding-left: 20px;
      box-sizing: border-box;
      background-color: @global-background-color;
      z-index: 10;
      top: -20px;
      width: 100%;
      position: absolute;
    }
    #ruler_2 {
      padding-top: 20px;
      box-sizing: border-box;
      background-color: @global-background-color;
      left: 0;
      top: -20px;
      height: 100%;
      position: absolute;
    }
    > .__view_ {
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      margin-top: 20px;
      margin-left: 20px;
      box-sizing: border-box;
      border: 1px solid red;
      background-color: @global-background-color;
      > .__drag_ {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .__box_ {
          box-sizing: border-box;
          border: 1px dashed @global-box-border-color;
          margin: 2px;
          z-index: 10;
        }
        > .__placeholder_ {
          background-color: rgb(37, 186, 255);
          height: 3px;
          font-size: 0;
          margin: 2px;
          border: 0px solid;
          > * {
            display: none;
          }
        }
      }
    }
  }
  > .__empty_::before {
    content: "请拖入组件";
    width: 200px;
    font-size: 20px;
    display: block;
    position: absolute;
    padding-left: 20px;
    top: calc((100% - 60px) / 2);
    left: calc((100% - 240px) / 2);
    color: #d4d4d4;
    text-align: center;
    padding: 20px;
    border: 1px dashed #d4d4d4;
  }

  > .__contextmenu_ {
    position: absolute;
    top: 20px;
    left: 50px;
    font-size: 12px;
    border: 1px dashed @global-box-border-color;
    outline: 5px solid @element-background-color;
    background-color: @element-background-color;
    padding: 2px;
    width: 50px;
    text-align: center;
    > li {
      list-style: none;
      z-index: 100;
      padding: 2px;
      cursor: pointer;
      user-select: none;
      &:hover {
        background-color: #e2e3ec;
      }
      &:active {
        background-color: #c9cad3;
      }
      > i {
        width: 13px;
        height: 13px;
        margin-right: 4px;
      }
    }
  }
}
</style>

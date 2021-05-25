<template>
  <div @mousedown="showHandler" class="__setup-panel_" v-show="config.setup.show">
    <transition name="fade">
      <div class="__inner_" v-show="config.setup.show">
        <div>{{ modelValue?.name }}</div>
        <div>{{ modelValue?.key }}</div>
        <collapse :active="1">
          <template v-for="(item, index) in config.props[modelValue?.el]" :key="index">
            <collapse-wrapper :idx="index" :title="item.title">
              <template v-for="(it, index) in item.layout" :key="index">
                <component :is="it.el" :layout=it />
              </template>
            </collapse-wrapper>
          </template>
        </collapse>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Inject } from "vue-property-decorator"
import Collapse from "./collapse/index.vue"
import CollapseWrapper from "./collapse/wrapper.vue"

@Options({
  name: "setup-panel",
  props: ["modelValue", "collapse"],
  components: { Collapse, CollapseWrapper }
})
export default class Setup extends Vue {
  @Inject() config!: any

  showHandler(evt: any) {
    if (evt.target.classList.contains("__setup-panel_")) {
      this.config.setup.show = false
    }
  }
}
</script>

<style lang="less">
.drag-builder > .__setup-panel_ {
  width: 100%;
  height: 100%;
  background-color: rgba(89, 91, 94, 0.582);
  position: relative;
  top: -100%;
  z-index: 1000;
  > .__inner_ {
    background-color: @global-background-color;
    width: @setup-panle-width;
    border: 1px solid @global-border-color;
    height: 100%;
    float: right;
    box-sizing: border-box;
    > div:nth-child(1) {
      text-align: center;
      font-size: 14px;
      margin: 4px 0;
    }
    > div:nth-child(2) {
      text-align: center;
      font-size: 10px;
      font-family: "Courier New", Courier, monospace;
      color: #a0a0a0;
      padding-bottom: 6px;
      margin-bottom: 4px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
  > .fade-enter-active {
    transition: all 0.3s ease-out;
  }
  > .fade-enter-from,
  > .fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
}
</style>

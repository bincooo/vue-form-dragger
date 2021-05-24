<template>
  <div @mousedown="showHandler" class="__setup-panel_" v-show="config.setup.show">
    <transition name="fade">
      <div class="__inner_" v-show="config.setup.show">
        setup panel
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
@Options({
  name: "setup-panel",
  props: ["modelValue"]
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
  }
  > .fade-enter-active {
    transition: all 0.3s ease-out;
  }
  > .fade-enter-from, > .fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
}
</style>

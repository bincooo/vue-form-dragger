<template>
  <div class="__setup-panel_" hidden>
    <div class="__inner_">setup panel</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
@Options({
  name: "setup-panel"
})
export default class Setup extends Vue {}
</script>

<style lang="less">
.drag-builder > .__setup-panel_ {
  width: 100%;
  height: 100%;
  background-color: #444444bd;
  position: absolute;
  top: 0;
  > .__inner_ {
    background-color: @global-background-color;
    width: @setup-panle-width;
    border: 1px solid @global-border-color;
    position: absolute;
    height: 100%;
    right: 0;
    box-sizing: border-box;
  }
}
</style>

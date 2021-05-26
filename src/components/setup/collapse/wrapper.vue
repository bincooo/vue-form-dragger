<template>
  <div class="__collapse-wrapper_">
    <div class="title" @click="onClick">
      <div>{{ title }}</div>
      <i v-show="idx == this.native.active" class="fa fa-angle-down" />
      <i v-show="idx != this.native.active" class="fa fa-angle-left" />
    </div>
    <transition name="fade">
      <div class="content" v-show="idx == this.native.active">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
@Options({
  name: "collapse-wrapper",
  props: {
    title: String,
    idx: {
      type: [String, Number],
      required: true
    }
  }
})
export default class CollapseWrapper extends Vue {
  @Inject() native!: any
  readonly idx: string | number | null | undefined = undefined

  onClick(evt: any) {
    this.native.active = this.idx
  }
}
</script>

<style lang="less">
.__collapse_ > .__collapse-wrapper_ {
  > .title {
    padding: 4px;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
    background-color: @global-background-color;
    position: relative;
    > div {
      padding-right: 20px;
      color: #4c4b4b;
    }
    > i {
      position: absolute;
      top: 2px;
      right: 0;
      margin: 4px;
      width: 16px;
      text-align: center;
      color: #d4d4d4;
    }
  }
  > .content {
    border-bottom: 1px solid #e8e8e8;
    padding: 5px 5px;
  }
  > .fade-enter-active {
    transition: all 0.3s ease-out;
    overflow: hidden;
  }
  > .fade-enter-from,
  > .fade-leave-to {
    transform: translateY(20px);
    overflow: hidden;
    opacity: 0;
  }
}
</style>

<template>
  <div class="collapse-wrapper">
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

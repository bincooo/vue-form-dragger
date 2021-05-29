<template>
  <div class="layout" v-for="(item, index) in layout.item" :key="index">
    <component :is="item.el" :item=item />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
@Options({
  name: "block",
  props: ["layout"]
})
export default class Block extends Vue {
  readonly layout: any
  mounted() {
  }
}
</script>

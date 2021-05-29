<template>
  <div class="layout" v-for="(item, index) in layout.item" :key="index">
    <!-- <component :is="item.el" :item=item /> -->
    <component :is="config.setupComponents[it.el]" :item="item" />
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
@Options({
  name: "block",
  props: ["layout"]
})
export default class Block extends Vue {
  @Inject() config: any
  readonly layout: any
  mounted() {}
}
</script>

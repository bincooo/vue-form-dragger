<template>
  <!-- <div style="height:100%;">
    <drag-builder />
  </div> -->

  <div style="width: 1200px; height: 800px; margin-top: 50px">
    <drag-builder :config="config" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import DragBuilder from './components/drag-builder.vue'
import config from './config'
@Options({
  name: 'app',
  components: {
    DragBuilder
  }
})
export default class App extends Vue {
  config:any = config
}
</script>

<style lang="less"></style>

<template>
  <!-- <div style="height:100%;">
    <drag-builder />
  </div> -->

  <div style="width: 1200px; height: 800px; margin-top: 50px; margin-left: 10px">
    <form-dragger :config="config" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import dragger from "./components/form-dragger.vue"
import config from "./config"
import "ant-design-vue/dist/antd.css"
@Options({
  name: "app",
  components: {
    "form-dragger": dragger
  }
})
export default class App extends Vue {
  config: any = config
}
</script>

<style lang="less"></style>

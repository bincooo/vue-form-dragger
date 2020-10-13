<template>
  <div id="app">
    <a href="https://github.com/bingco-zhan/vue-form-dragger" target="_blank" id="github-link">
      <img alt="" src="./assets/github.png" />
    </a>
    <designer :data="data">
      <!-- 可根据实际场景设计属性配置项 -->
      <template v-slot="d">
        <parameter v-if="d.config" :data.sync="d.config" />
      </template>
    </designer>
  </div>
</template>

<script>
import designer from "./components/designer"

import demo from "./examples/demo1"
import parameter from "./components/parameter"
export default {
  name: 'App',
  components: {
    parameter,
    designer
  },
  data() {
    return {
      data: demo
    }
  }
}
</script>

<style lang="scss">
html,body,#app {
  margin: 0 auto;
  height: 100%;
  overflow-x: hidden;
}
#github-link {
  width: 0;
  height: 0;
  border-width: 0 50px 50px;
  border-style: solid;
  transform: rotate(45deg);
  border-color: transparent transparent #0d95e8;
  position: absolute;
  top: -7px;
  right: -32px;
  z-index: 100;
  img {
    width: 30px;
    margin: 15px -16px;
  }
}
</style>
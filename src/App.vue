<template>
  <designer :data="data">
    <!-- 可根据实际场景设计属性配置项 -->
    <template v-slot="d">
      <parameter v-if="d.config" :data.sync="d.config" />
    </template>
  </designer>
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
html,body {
  margin: 0 auto;
  height: 100%;
}
</style>
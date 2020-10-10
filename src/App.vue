<template>
    <designer />
</template>

<script>
import designer from "./components/designer"
export default {
  name: 'App',
  components: {
    designer
  }
}
</script>

<style lang="scss">
html,body {
  margin: 0 auto;
  height: 100%;
}
</style>
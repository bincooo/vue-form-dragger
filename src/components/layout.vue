<template>
  <el-container>
    <el-row class="dr-layout dr-active" style="margin: 2px" :gutter="data.gutter">
      <i class="dr-mover el-icon-rank" />
      <el-col v-for="(item, index) in data.drag" :key=index :span=item.span>
        <container :data="item.list"/>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import draggable from 'vuedraggable'
import container from './container'

export default {
  name: "layout",
  components: {
    draggable,
    container
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dr-layout {
  min-height: 36px;
  outline: 1px dashed #95a3b7;
  width: 100%;
  > .el-col {
    padding: 4px 0;
    > div {
      min-height: 36px;
      outline: 2px dashed #95a3b7;
      height: 100%;
    }
  }
}

.dr-active {
  outline: 1px solid #0d95e8;
  border: 1px solid #0d95e8;
  > .el-icon-rank {
    left: -2px;
    top: -2px;
    position: absolute;
    font-size: 14px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    color: white;
    background-color: #0d95e8;
  }
}
</style>
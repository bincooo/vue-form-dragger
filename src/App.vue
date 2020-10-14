<template>
  <div id="app">
    <a href="https://github.com/bingco-zhan/vue-form-dragger" target="_blank" id="github-link">
      <img alt="" src="./assets/github.png" />
    </a>
    <designer :data="data">
      <!-- 可根据实际场景设计属性配置项 -->
      <template v-slot="d">
        <parameter v-if="d.config" :data="d.config">

          <div v-if="d.config.type === 'table'">
            <el-divider content-position="left">表格</el-divider>
            <div v-for="(item, index) in d.config.column" class="table_item_param" :key="index">
              <el-form-item label="固定列">
                <el-select v-model="item.field" placeholder="请选择">
                  <el-option label="Left" value="left" />
                  <el-option label="Right" value="right" />
                </el-select>
              </el-form-item>
              <el-form-item label="列名">
                <el-input v-model="item.label" />
              </el-form-item>
              <el-form-item label="宽度">
                <el-input v-model="item.width" />
              </el-form-item>
              <el-form-item label="字段名">
                <el-input style="width: 110px" v-model="item.prop" />
                <el-button type="info" size="mini" @click="d.config.column.splice(index, 1)">删除</el-button>
              </el-form-item>
            </div>
            <el-form-item style="float: right">
              <el-button type="primary" size="mini" @click="d.config.column.splice(d.config.column.length, 0,
              {
                    fixed: '',
                    label: '',
                    width: '100px',
                    prop: ''
              })">添加</el-button>
            </el-form-item>
          </div>

        </parameter>
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

.table_item_param {
  width: 100%;
  border: 1px solid silver;
  margin-bottom: 5px;
  padding-top: 10px;
}
</style>
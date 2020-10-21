<template>
  <div id="app">
    <a href="https://github.com/bingco-zhan/vue-form-dragger" target="_blank" id="github-link">
      <img alt="" src="./assets/github.png" />
    </a>
    <designer :data="data" @activeChange="activeChange">
      <!-- 可根据实际场景设计属性配置项 -->
      <template v-slot="d">
        <parameter v-if="d.config" :data="d.config">

          <div v-if="d.config.type === 'table'">
            <el-divider content-position="left">表格</el-divider>
            <el-form-item label="选择列">
              <el-select v-model="index" clearable placeholder="请选择" @change="change(d.config.column)">
                <el-option
                    v-for="(item, index) in d.config.column"
                    :key="index"
                    :label="item.label"
                    :value="index">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="table_item_param">
              <el-form-item label="固定">
                <el-select v-model="column.field" placeholder="请选择">
                  <el-option label="Left" value="left" />
                  <el-option label="Right" value="right" />
                </el-select>
              </el-form-item>
              <el-form-item label="列名">
                <el-input v-model="column.label" />
              </el-form-item>
              <el-form-item label="宽度">
                <el-input v-model="column.width" />
              </el-form-item>
              <el-form-item label="字段名">
                <el-input style="width: 110px" v-model="column.prop" />
                <el-button v-if="index !== ''" type="info" size="mini" @click="del(d.config.column)">删除</el-button>
              </el-form-item>
            </div>
            <el-form-item style="float: right" v-if="index === ''">
              <el-button type="primary" size="mini" @click="add(d.config.column)">添加</el-button>
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
      data: demo,
      index: '',
      column: {}
    }
  },
  methods: {
    activeChange() {
      this.index = ''
      this.column = {}
    },
    change(val) {
      if (this.index === '') {
        this.column = {}
      } else {
        this.column = val[this.index]
      }
    },
    del(val) {
      if (this.index !== '') {
        val.splice(this.index, 1)
        this.index = ''
      }
    },
    add(val) {
      console.log(this.column, val[val.length - 1])
      const data = {
        fixed: this.column.field || '',
        label: this.column.label || '',
        width: this.column.width || '',
        prop: this.column.prop || ''
      }
      val.splice(val.length, 0, data)
      this.column = {}
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
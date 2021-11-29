<template>
  <el-container class="dr-param_item">
    <el-form size="mini" :model="data" label-width="80px" inline style="width: 100%; padding: 0 10px">
      <!-- === start 通用配置项 === -->
      <div>
        <el-divider content-position="left">通用</el-divider>
        <el-form-item label="类型">
          <el-input v-model="data.type" disabled/>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="data.key"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="data.name"/>
        </el-form-item>
        <el-form-item label="数据键" v-if="Object.keys(data).indexOf('value') >= 0">
          <el-input v-model="data.value"/>
        </el-form-item>
        <el-form-item v-if="Object.keys(data).indexOf('size') >= 0" label="尺寸">
          <el-select v-model="data.size" placeholder="请选择尺寸" >
            <el-option label="默认" value="" />
            <el-option label="中等" value="medium" />
            <el-option label="小" value="small" />
            <el-option label="迷你" value="mini" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="Object.keys(data).indexOf('placeholder') >= 0" label="提示">
          <el-input v-model="data.placeholder"/>
        </el-form-item>
        <el-form-item v-if="Object.keys(data).indexOf('width') >= 0" label="宽度">
          <el-input v-model="data.width"/>
        </el-form-item>
        <el-form-item v-if="Object.keys(data).indexOf('labelWidth') >= 0" label="标签宽度">
          <el-input v-model="data.labelWidth"/>
        </el-form-item>
        <el-form-item v-if="Object.keys(data).indexOf('disabled') >= 0" label="禁用">
          <el-switch v-model="data.disabled" />
        </el-form-item>
      </div>
      <!-- === end 通用配置项 === -->


      <!-- === start 布局配置项 === -->
      <div v-if="data.type === 'layout'">
        <el-divider content-position="left">布局</el-divider>
        <el-form-item label="间隔">
          <el-input type="number" class="dr-param_item_gutter" v-model.number="data.gutter" />
          <el-button type="primary" @click="data.drag.splice(data.drag.length -1, 0, {span: 8, list:[]})">添加列</el-button>
        </el-form-item>
        <el-form-item v-for="(item,index) in data.drag" :label="'列'+(index+1)" :key="index">
          <el-input type="number" class="dr-param_item_col" v-model.number="item.span" />
          <el-button @click="data.drag.splice(index, 1)">删除</el-button>
        </el-form-item>
      </div>
      <!-- === end 布局配置项 === -->


      <!-- === start 选项配置项 === -->
      <div v-if="Object.keys(data).indexOf('option') >= 0">
        <el-divider content-position="left">选项</el-divider>
        <el-form-item style="border: 1px solid #bcbbbb" v-for="(item, index) in data.option" :label="'选项'+(index+1)" :key=index>
          <el-input v-model="item.label" class="dr-param_option-key" />
          <el-input v-model="item.value" class="dr-param_option-value" />
          <el-form-item style="padding-left: 8px">
            <el-button @click="data.option.splice(index, 1)">删除</el-button>
            <span style="color: #606266;padding: 0 8px 0 20px">禁用</span>
            <el-switch v-model="item.disabled" />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="data.option.splice(data.option.length+1, 0, {label: '选项' + (data.option.length+1), value: `${data.option.length+1}`})">添加元素</el-button>
        </el-form-item>
      </div>
      <!-- === end 选项配置项 === -->

      <!-- === start 校验 === -->
      <div v-if="Object.keys(data).indexOf('rules') >= 0">
        <el-divider content-position="left">校验</el-divider>
        <div class="table_item_param" v-for="(item, idx) in data.rules" :key="idx">
          <el-form-item label="必填">
            <el-switch
              v-model="item.required"
              active-color="#13ce66"
              inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="事件">
            <el-select v-model="item.trigger" placeholder="请选择事件类型">
              <el-option label="blur" value="blur" />
              <el-option label="change" value="change" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="item.type" placeholder="请选择数据类型" clearable>
              <el-option label="date" value="date" />
              <el-option label="array" value="array" />
            </el-select>
          </el-form-item>
          <el-form-item label="提示">
            <el-input v-model="item.message" placeholder="请填写提示信息" />
          </el-form-item>
          <div style="margin: 0 12px 5px; text-align: right">
            <el-button type="info" size="mini" @click="data.rules.splice(idx, 1)">删除</el-button>
          </div>
        </div>
        <el-form-item style="float: right">
          <el-button type="primary" size="mini" @click="data.rules.push({ required: true, message: '请输入...', trigger: 'blur' })">添加</el-button>
        </el-form-item>
      </div>
      <!-- === end 校验 === -->

      <!-- === 其他配置 === -->
      <slot></slot>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "parameter",
  props: {
    data: {
      validator() {
        return true
      }
    }
  }
}
</script>
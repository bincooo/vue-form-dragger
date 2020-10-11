<template>
  <el-container :class="{'dr-container': true, 'dr-empty':(root && data.length === 0) }">
    <draggable tag="div" ghostClass="dr-placeholder" handle=".dr-mover" :list="data" group="viewer" animation="300"
               :move=moveCommand @add=addCommand @start=startCommand @end=endCommand>
      <template v-for="(item, index) in data">

        <!-- 容器 -->
        <div v-if="item.type === 'container'" :key="item.key" style="margin: 2px; height: calc(100% - 5px)">
          <div :class="{'dr-area': true, 'dr-active': (localSelector && localSelector.key === item.key)}" style="height: 100%"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <el-container style="height: 100%; padding: 4px">
              <container :map="map" :selector.sync=localSelector :data=item.drag />
            </el-container>
          </div>
        </div>


        <!-- 布局器 -->
        <el-container v-else-if="item.type === 'layout'" :key="item.key">
          <el-row :class="{
            'dr-area': true, 'dr-active': (localSelector && localSelector.key === item.key)}" style="margin: 2px" :gutter="item.gutter" type="flex" @click.native.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <el-col v-for="(it, index) in item.drag" :key=index :span="it.span">
              <container :map="map" :selector.sync="localSelector" :data="it.list"/>
            </el-col>
          </el-row>
        </el-container>

        <!-- 输入框 -->
        <div v-else-if="item.type === 'input'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}" style="height: 100%"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size="item.size" :label="item.name">
                <el-input :style="{width: item.width + 'px'}" :disabled="item.disabled" :placeholder="item.placeholder"/>
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 选择框 -->
        <div v-else-if="item.type === 'select'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :label=item.name :size="item.size">
                <el-select :style="{width: item.width + 'px'}" :disabled="item.disabled" :placeholder=item.placeholder value="">
                  <el-option v-for="o in item.option" :label=o.label :value=o.value :key=o.value />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>


        <!-- 日期框 -->
        <div v-else-if="item.type === 'date'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size=item.size :label=item.name>
                <el-date-picker :style="{width: item.width + 'px'}" :disabled="item.disabled" type="date" :placeholder=item.placeholder />
              </el-form-item>
            </div>
          </div>
        </div>


        <!-- 开关按钮 -->
        <div v-else-if="item.type === 'switch'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size=item.size :label=item.name>
                <el-switch :disabled="item.disabled"></el-switch>
              </el-form-item>
            </div>
          </div>
        </div>


        <!-- 多选框 -->
        <div v-else-if="item.type === 'checkbox'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size=item.size :label=item.name>
                <el-checkbox-group v-model="local.checkbox">
                    <el-checkbox v-for="o in item.option" :disabled="o.disabled" :label=o.label :key=o.value />
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
        </div>


        <!-- 单选框 -->
        <div v-else-if="item.type === 'radio'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size=item.size :label="item.name">
                <el-radio-group v-model="local.radio">
                  <el-radio v-for="o in item.option" :disabled="o.disabled" :label=o.label :key=o.value />
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>


        <!-- 文本域 -->
        <div v-else-if="item.type === 'textarea'" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <el-form-item :label-width="item.labelWidth + 'px'" :size="item.size" :label="item.name">
                <el-input resize='none' :disabled="item.disabled" :style="{width: item.width + 'px'}" type="textarea" :placeholder="item.placeholder"/>
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 自定义组件 -->
        <div v-else-if="map[item.type]" :key="item.key" style="margin: 2px">
          <div :class="{'dr-area mask': true, 'dr-active': (localSelector && localSelector.key === item.key)}"
               @click.stop="selectCommand(index)">
            <i class="dr-mover el-icon-rank" />
            <i class="el-icon-document-copy" @click="copyCommand(index)" />
            <i class="el-icon-close" @click="closeCommand(index)"/>
            <div style="overflow: auto">
              <component v-bind:is="map[item.type]" :item="item" />
            </div>
          </div>
        </div>


      </template>
    </draggable>
  </el-container>
</template>

<script>
import draggable from 'vuedraggable'
import OUtil from '../utils/objects'

export default {
  name: "container",
  components: {
    draggable,
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    selector: Object,
    root: Boolean,
    map: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      localSelector: this.selector,
      outil: undefined,
      local: {
        checkbox: [],
        radio: []
      }
    }
  },
  watch: {
    selector (val) {
      this.localSelector = val
    },
    localSelector: {
      handler (val) {
        this.$emit('update:selector', val)
      },
      deep: true
    }
  },
  methods: {
    addCommand(e) {
      const newIndex = e.newIndex;
      const local = this.data[newIndex];
      this.$set(this.data, newIndex, {
        ...local,
        key: `${local.type}_${new Date().getTime()}`
      })
      if (e.pullMode === 'clone') {

        if (local.type === 'container' || local.type === 'layout') {
          this.$set(this.data, newIndex, {
            ...this.data[newIndex],
            drag: this.outil.agn(this.data[newIndex].drag)
          })
        }

        if (local.option) {
          this.$set(this.data, newIndex, {
            ...this.data[newIndex],
            option: this.outil.agn(this.data[newIndex].option)
          })
        }
      }
      this.localSelector = this.data[newIndex];
    },
    selectCommand(index) {
      this.localSelector = this.data[index];
    },
    copyCommand(index) {
      this.data.splice(index, 0, this.outil.agn(this.data[index]))
    },
    closeCommand(index) {
      this.data.splice(index, 1)
    },
    startCommand(e) {
      console.log('移动中....', e)
    },
    moveCommand(e) {
      // 目标是容器不可拖入
      // console.log('来源', e.draggedContext.element.type)
      if (e.relatedContext.element && e.relatedContext.element.type === 'container') {
        return false;
      }

      // 布局容器不允许容器停靠
      if (e.draggedContext.element.type === 'container' && e.relatedContext.element) {
        return false;
      }
    },
    endCommand(e) {
      console.log('结束移动...', e)
    }
  },
  created() {
    this.outil = new OUtil((key, source) => {
      // 重新分配key
      if (key === 'key') {
        return `${source.split('_')[0]}_${new Date().getTime()}`
      }
    })
  }
}
</script>

<style lang="scss">
/*整体布局*/
.dr-container {
  padding: 4px;
  outline: 2px dashed #95a3b7;
  position: relative;
  min-height: 80px;
  > div {
    min-width: 100%;
  }
}

/*空白时显示拖拽提示*/
.dr-empty::before {
  content: '请拖入组件';
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 25px;
  color: #e5e5e5;
  z-index: -1;
}

/*蒙版*/
.mask {
  position: relative;
}

.mask::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 14px;
  left: 0;
  right: 0;
  z-index: 100;
}

/*拖拽域*/
.dr-area {
  > .el-icon-rank,.el-icon-document-copy,.el-icon-close {
    display: none;
  }
  min-height: 25px;
  outline: 1px dashed #95a3b7;
  width: 100%;
  > .el-col {
    padding: 4px 0;
    > section {
      min-height: 25px;
      outline: 2px dashed #95a3b7;
      height: 100%;
    }
  }
  > div > .el-form-item {
    margin-bottom: 14px;
    > .el-form-item__label, >.el-form-item__content {
      line-height: 20px;
    }
  }
}

/*激活域*/
.dr-active {
  outline: 1px solid #0d95e8;
  border: 1px solid #0d95e8;
  position: relative;
  > .el-icon-rank, > .el-icon-document-copy, > .el-icon-close {
    z-index: 100;
    color: white;
    background-color: #0d95e8;
    position: absolute;
    font-size: 14px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
  }
  > .el-icon-rank {
    cursor: move;
    display: block;
    left: -2px;
    top: -2px;
  }
  > .el-icon-document-copy {
    cursor: pointer;
    display: block;
    right: 14px;
    top: -2px;
  }
  > .el-icon-close {
    cursor: pointer;
    display: block;
    right: -2px;
    top: -2px;
  }
}

/*占位符样式*/
.dr-placeholder {
  background-color: slateblue;
  height: 3px;
  max-height: 3px;
  font-size: 0;
  > * {
    display: none;
  }
}
</style>
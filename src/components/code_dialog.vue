<template>
  <el-dialog width="90%" class="code_dialog" title="代码展示" :visible.sync="visible">
    <div style="width: 100%; border: 1px solid gainsboro; overflow: auto; max-height: 400px" v-highlight>
      <pre style="font-size: 12px; margin: 2px"><code class="html" style="font-family: 'Courier New', serif" v-text="template" /></pre>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="download">导 出</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { exportFile } from '@/utils/objects'

export default {
  name: "code_dialog",
  props: [ 'template', 'codeVisible' ],
  data() {
    return {
      visible: false
    }
  },
  watch: {
    codeVisible (val) {
      this.visible = val
    },
    visible: {
      handler (val) {
        this.$emit('update:codeVisible', val)
      },
      deep: true
    }
  },
  methods: {
    download() {
      this.$prompt("请输入名称", "提示", {
        inputPattern: /.+/
      }).then(res => {
        if (res.action === 'confirm') {
          exportFile(res.value + '.vue', this.template)
          this.visible = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
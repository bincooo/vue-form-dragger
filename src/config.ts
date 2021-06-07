import { GridElement, FormElement, InputElement, TableBox as table } from "@/components/container/items"
import { grid, field } from "./components/setup/index"
import gridConfig from "./el-conf/grid-config"
import formConfig from "./el-conf/form-config"
import inputConfig from "./el-conf/input-config"
import tableConfig from "./el-conf/table-config"

const config: any = {
  // 编辑器大小
  size: {},
  // 组件
  components: {
    grid: GridElement,
    form: FormElement,
    input: InputElement,
    table
  },
  // 全局注册的组件本地开发没问题，到了编译后就丢失了组件。不得其解 T^T，无奈增加此节点
  setupComponents: {
    grid,
    field
  },
  // 属性面板表单构建信息
  props: {
    grid: gridConfig,
    form: formConfig,
    input: inputConfig,
    table: tableConfig
  },
  // 组件拖拽条件约束
  condition: {
    root: ["form"],
    form: ["input", "grid", "table"]
  },
  // 组件标签
  element: [
    {
      el: "form",
      group: "容器",
      name: "表单",
      icon: "fa fa-th-list"
    },
    {
      el: "grid",
      group: "容器",
      name: "栅格",
      icon: "fa fa-th-large"
    },
    {
      el: "table",
      group: "容器",
      name: "表格",
      icon: "fa fa-th-large"
    },
    {
      el: "input",
      group: "表单组件",
      name: "文本输入框",
      icon: "fa fa-keyboard-o"
    }
  ]
}
export default config

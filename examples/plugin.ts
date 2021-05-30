import { App } from "@vue/runtime-core"
import Antd from "ant-design-vue"
import plugin from "../src/plugin"
export default function(inst: App<any>): App<any> {
  return plugin(inst).use(Antd)
}

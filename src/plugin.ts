import { App } from "@vue/runtime-core"
import Antd from "ant-design-vue"
import Items from "./components/setup/index"
export default function(inst: App<any>): App<any> {
  return inst.use(Antd).use(Items)
}

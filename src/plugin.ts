import { App } from "@vue/runtime-core"
import Antd from "ant-design-vue"
import Items from "./components/setup/index"
export default function(inst: App<any>): App<any> {
  return inst
    .use(Antd)
    .use(Items)
    .directive("blur", { created: blur })
    .directive("unmarsk", { mounted: unmarsk, updated: unmarsk })
}

// 禁止聚焦
function blur(el: HTMLElement) {
  el.onfocus = function() {
    el.blur()
  }
}

// 消除蒙板
function unmarsk(el: HTMLElement) {
  const calssList: DOMTokenList = el.classList
  if (calssList.contains("marsk")) {
    calssList.remove("marsk")
  }
}

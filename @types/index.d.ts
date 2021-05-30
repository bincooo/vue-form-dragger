import { DefineComponent } from "vue"
import { App } from "@vue/runtime-core"
declare const component: DefineComponent<{}, {}, any>
declare const plugin: (inst: App<any>) => App<any>
declare const config: any
export default component
export { plugin, config }

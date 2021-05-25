import block from "./block.vue"
import field from './field.vue'
export default {
  install(inst: any) {
    inst.component(block.name, block)
    inst.component(field.name, field)
  }
}

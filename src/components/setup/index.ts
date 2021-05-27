import grid from "./grid.vue"
import block from "./block.vue"
import field from './field.vue'
export default {
  install(inst: any) {
    inst.component(grid.name, grid)
    inst.component(block.name, block)
    inst.component(field.name, field)

  }
}

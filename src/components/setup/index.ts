import grid from "./layout/grid.vue"
import block from "./layout/block.vue"
import field from "./input/field.vue"
import gridItem from "./input/grid-item.vue"
export default {
  install(inst: any) {
    inst.component(grid.name, grid)
    inst.component(block.name, block)
    inst.component(field.name, field)
    inst.component(gridItem.name, gridItem)
  }
}

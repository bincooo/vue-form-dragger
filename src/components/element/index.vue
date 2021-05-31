<template>
  <div class="element-panel">
    <div class="search">
      <input
        @keyup="
          (e) => {
            if (e.code === 'Enter') onSearch(e.target)
          }
        "
        value=""
      />
      <i
        class="fa fa-search"
        @click="
          (e) => {
            onSearch(e.target.previousElementSibling)
          }
        "
      />
    </div>
    <template v-for="(item, key) in group" :key="key">
      <div class="_-" :name="key" :hidden="item.filter((i) => i.name.includes(search)).length === 0" />
      <draggable
        :list="item"
        :sort="false"
        :group="{
          name: 'container',
          pull: 'clone',
          put: false
        }"
        :move="(e) => onMove(3, e)"
        @end="(e) => onMove(2, e)"
        @start="(e) => onMove(1, e)"
        item-key="type"
      >
        <template #item="d">
          <div class="item" v-show="d.element.name.includes(search)">
            <i :class="d.element.icon" />
            {{ d.element.name }}
          </div>
        </template>
      </draggable>
    </template>
  </div>
</template>

<script lang="ts">
import { Inject } from "vue-property-decorator"
import { Options, Vue } from "vue-class-component"
import draggable from "vuedraggable"
@Options({
  name: "element-panel",
  props: ["element"],
  components: { draggable }
})
export default class Element extends Vue {
  @Inject() config!: any
  search: string = ""
  readonly element: any[] = []

  get group(): any {
    const map: any = {}
    for (const index in this.element) {
      const element = this.element[index]
      const item = (map[element.group] = map[element.group] || [])
      item.push(element)
    }
    return map
  }

  onSearch(search: any) {
    this.search = search.value
    search.focus()
  }

  onMove(other: number, evt: any) {
    const classname: string = "moving"
    switch (other) {
      case 1:
        evt.from.classList.add(classname)
        break
      case 2:
        evt.from.classList.remove(classname)
        break
      case 3:
        const { condition } = this.config
        const element = evt.draggedContext.element
        if (!condition.root) return true
        else if (!evt.to.hasAttribute("data-box")) {
          return condition.root.includes(element.el)
        } else {
          const condi = condition[evt.to.getAttribute("data-box")]
          if (!condi) return true
          else return condi.includes(element.el)
        }
    }
  }
}
</script>

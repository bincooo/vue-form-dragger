<template>
  <div class="__element-panel_">
    <div class="__search_">
      <input @keyup="(e) => {
        if (e.code === 'Enter') onSearch(e.target)
      }" value="" />
      <i class="fa fa-search"
        @click="(e) => {
          onSearch(e.target.previousElementSibling)
        }" />
    </div>
    <template v-for="(item, key) in group" :key="key">
      <div class="_-" :name="key" :hidden="item.filter(i => i.name.includes(search)).length === 0" />
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
          <div class="__item_" v-show="d.element.name.includes(search)">
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
  readonly element:any[] = []

  get group():any {
    const map:any = {}
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
    const classname: string = "__moving_"
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

<style lang="less" scoped>
.drag-builder > .__element-panel_ {
  *,
  *::before,
  *::after {
    box-sizing: unset;
  }
  width: @element-panel-width;
  position: absolute;
  border: 1px solid @global-border-color;
  height: calc(100% - 4px);
  margin-top: 2px;
  margin-bottom: 2px;
  box-sizing: border-box;
  background-color: @global-background-color;
  .__search_ {
    margin: 0 auto;
    width: 200px;
    margin-top: 10px;
    position: relative;
    border: 1px solid #c8cccf;
    border-radius: 2px;
    &:hover {
      border: 1px solid rgb(41, 166, 238);
      box-shadow: 0 0 3px 0.2px rgb(112, 167, 199);
    }
    > input {
      appearance: none;
      border: 1px solid @global-border-color;
      width: 170px;
      height: 25px;
      border: 0px;
      color: #7c7c7c;
      outline: 0;
      text-decoration: none;
      padding-left: 5px;
      padding-right: 24px;
    }
    > i {
      width: 20px;
      height: 20px;
      position: absolute;
      line-height: 20px;
      text-align: center;
      right: 2px;
      top: 3px;
      cursor: pointer;
      font-size: 12px;
      color: rgb(177, 177, 177);
      &:hover {
        color: rgb(133, 133, 133);
      }
      &:active {
        color: rgb(100, 100, 100);
      }
    }
  }
  ._- {
    margin: 10px 0;
    border-top: 1px dashed @global-border-color;
    max-height: 1px;
    &::after {
      content: attr(name);
      font-size: 12px;
      color: @global-border-color;
      background-color: @global-background-color;
      position: relative;
      top: -12px;
      left: 10px;
    }
  }
  .__item_ {
    border: 1px dashed @element-border-color;
    background-color: @element-background-color;
    display: inline-block;
    user-select: none;
    width: 105px;
    padding: 8px 5px;
    margin: 2px;
    font-size: 12px;
    &:hover {
      border: 1px dashed rgb(102, 102, 102);
    }
  }

  .__moving_::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }
}
</style>

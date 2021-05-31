<template>
  <div @mousedown="showHandler" class="setup-panel" v-show="config.setup.show">
    <transition name="fade">
      <div class="inner" v-show="config.setup.show">
        <div>{{ modelValue?.name }}</div>
        <div>{{ modelValue?.key }}</div>
        <collapse :active="0">
          <template v-for="(item, index) in config.props[modelValue?.el]" :key="index">
            <collapse-wrapper :idx="index" :title="item.title">
              <template v-for="(it, index) in item.layout" :key="index">
                <!-- <component :is="it.el" :layout=it /> -->
                <component :is="config.setupComponents[it.el]" :layout=it />
              </template>
            </collapse-wrapper>
          </template>
        </collapse>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Inject } from "vue-property-decorator"
import Collapse from "./collapse/index.vue"
import CollapseWrapper from "./collapse/wrapper.vue"

@Options({
  name: "setup-panel",
  props: ["modelValue", "collapse"],
  components: { Collapse, CollapseWrapper }
})
export default class Setup extends Vue {
  @Inject() config!: any

  showHandler(evt: any) {
    if (evt.target.classList.contains("setup-panel")) {
      this.config.setup.show = false
    }
  }
}
</script>

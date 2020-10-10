import Vue from 'vue'
import designer from './designer'
import Highlight from './highlight'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Highlight)

designer.install = function (Vue) {
    Vue.component(designer.name, designer)
}
export default designer
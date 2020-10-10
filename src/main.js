import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Highlight from './components/highlight'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Highlight)

new Vue({
  render: h => h(App),
}).$mount('#app')

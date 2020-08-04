import Vue from 'vue'
import App from '@/App.vue'
// 引入store对象
import store from './vuex/store.js'
// 不显示当前不是生产环境打包的提示
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册Vuex的store仓库对象
  store
}).$mount('#root')

import '@babel/polyfill' // 处理async&await Promise
import Vue from 'vue'
import App from '@/App.vue'
// 引入vuex
import store from './store/index.js'
// 不显示当前不是生产环境打包的提示
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册vuex的store仓库对象
  store
}).$mount('#root')

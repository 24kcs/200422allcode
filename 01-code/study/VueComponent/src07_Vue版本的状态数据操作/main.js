import Vue from 'vue'
import App from '@/App.vue'
// 不显示当前不是生产环境打包的提示
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#root')

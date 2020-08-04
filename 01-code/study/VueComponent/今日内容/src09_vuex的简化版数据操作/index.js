// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入store
import store from './vuex/store.js'
// 设置浏览器的控制台中默认不显示提示信息
Vue.config.productionTip = false
// 实例化Vue

new Vue({
  render: h => h(App),
  store
}).$mount('#root')

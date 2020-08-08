// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from '@/router'
// 引入TypeNav组件,并设置为全局的公共组件
import TypeNav from '@/components/TypeNav'
// 设置浏览器的控制台中的提示信息默认不显示
Vue.config.productionTip = false
// 注册全局组件(需要的使用的位置直接用即可)
Vue.component('TypeNav',TypeNav)
// 实例化Vue
new Vue({
  render: h => h(App),
  // 注册路由器
  router
}).$mount('#app')

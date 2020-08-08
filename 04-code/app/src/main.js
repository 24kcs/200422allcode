// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 设置浏览器的控制台中默认不提示信息
Vue.config.productionTip = false
// eslint语法检查的注释操作,new 了 Vue 但是没有接收过
/* eslint-disable no-new */
new Vue({
  el: '#app', // 选择器
  components: { App }, // 注册组件
  template: '<App/>' // 模版
})

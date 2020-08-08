// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 声明使用路由器插件
Vue.use(VueRouter)

// 实例化路由器对象并暴露出去
export default new VueRouter({
  mode:'history' , // 浏览器的地址栏中没有了#
  routes // 路由组件的数组
})
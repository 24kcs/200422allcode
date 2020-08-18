// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from '@/router'
// 引入store对象
import store from '@/store'
// 引入TypeNav组件,并设置为全局的公共组件
import TypeNav from '@/components/TypeNav'
// 引入mockServer.js文件,使其执行一次
import './mock/mockServer'
// 引入swiper的样式文件----多个组件都会用到该样式文件,所以在这引入一次就可以了
import 'swiper/css/swiper.css'
// 引入Carousel轮播图组件
import Carousel from '@/components/Carousel'
// 引入Pagination分页组件
import Pagination from '@/components/Pagination'
// 引入validate.js文件,执行一次内部的代码
import './utils/validate'
// 设置浏览器的控制台中的提示信息默认不显示
Vue.config.productionTip = false
// 注册全局组件(需要的使用的位置直接用即可)
Vue.component('TypeNav', TypeNav)
// 轮播图的全局公共组件
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
// 实例化Vue
new Vue({
  // 初始化之前
  beforeCreate () {
    // this就是Vue的实例对象
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  // 注册路由器
  router,
  // 注册store
  store
}).$mount('#app')

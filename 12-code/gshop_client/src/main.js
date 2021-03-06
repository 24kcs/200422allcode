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

// 引入所有的api接口函数
import * as API from '@/api'

// 引入element-ui 组件库----所有的和这个库相关的组件都引入进来了
// import ElementUI from 'element-ui';
// // 引入element-ui 组件库中所有的样式
// import 'element-ui/lib/theme-chalk/index.css';
// 声明使用插件
// Vue.use(ElementUI);

// import { Button } from 'element-ui';
// Vue.component(Button.name, Button);

// 引入element.js---该文件中的代码会执行一次
import './utils/element.js'

// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import loading from './assets/loding.gif'
// 声明使用插件
Vue.use(VueLazyload, {
  // 懒加载的时候出现的图片
  loading
})

// 所有的Vue的实例对象(每个组件对象都继承自Vue的实例)都可以直接调用$API使用内部的所有的api接口函数
Vue.prototype.$API = API


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

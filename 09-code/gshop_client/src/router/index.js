// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 声明使用路由器插件
Vue.use(VueRouter)
// 要从根本上解决这个bug
// 先得到这个push方法
const originPush = VueRouter.prototype.push
// 重写这个方法,无非就是给个默认的成功的空回调
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}

const originReplace = VueRouter.prototype.replace
// 重写这个方法,无非就是给个默认的成功的空回调
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}


export default new VueRouter({
  mode: 'history', // 浏览器的地址栏中没有了#
  routes, // 路由组件的数组
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// 实例化路由器对象并暴露出去

// 其他的组件中就多了一个$router

// this.$router.push() 出现的bug



// function Person (){

// }
// // 构造函数的原型对象上有eat方法
// Person.prototype.eat=function(name){
//   console.log('强哥喜欢吃:'+name)
// }
// // 获取了原型上的这个eat方法
// const originEat = Person.prototype.eat
// // 重写这个eat方法
// Person.prototype.eat=function(name='臭豆腐'){
//   // 保护this的指向是不变,依然是person的实例对象
//   return originEat.call(this,name)
// }
// var per = new Person()
// // 实例对象可以调用 Person原型上的方法
// // per.eat('大骨头') // 自己传
// // 就是不想传,希望默认有内容
// per.eat()
// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 引入store
import store from '@/store'
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


const router = new VueRouter({
  mode: 'history', // 浏览器的地址栏中没有了#
  routes, // 路由组件的数组
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// 全局的前置路由守卫
router.beforeEach((to, from, next) => {
  // 1. 只有登录了,才可以访问:交易界面/trade,支付/pay,个人中心/center
  // 将要访问的地址
  const checkPath = ['/trade', '/pay', '/center']
  // 目标路由地址
  const targetPath = to.path // /center/myorder
  // 此时我要访问的目标路由地址中包含了数组中的某个路由地址
  if (checkPath.find(path => targetPath.indexOf(path) === 0)) {
    // 判断是否已经登录了!
    if (store.state.user.userInfo.name) {
      next() // 放心继续访问
    } else {
      // 没有登录,但是需要把刚才将要访问的目标的地址,存储起来,然后,登陆成功之后把地址拿出来跳转即可
      next('/login?redirect='+targetPath)
    }
  } else {
    next() // 正常的放行
  }
})



// 全局的前置守卫
// router.beforeEach((to, from, next) => {
//   /*
//     to:route对象,目标路由对象-----path----/shopcart-->目标路由的地址
//     from:route对象,从哪里来的路由对象(正要离开的路由对象)---path----/-----从哪个路由地址
//     next: 函数, 
//     next() 不传入任何的参数,代表就是放行----可以继续的访问了
//     next(path) 直接跳转到某个指定的地址
//     不写next() 不会放行,也就不会跳转到任何的一个路由地址了

//   */
//   // console.log(to)
//   // console.log(from)
//   // console.log(next)
//   // next()

//   // 例子 : 当前请求的不是/login,那么就直接跳转到/login,否则就放行
//   // if(to.path!=='/login'){
//   //   next('/login')
//   // }else{
//   //   next()
//   // }

// })

export default router
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
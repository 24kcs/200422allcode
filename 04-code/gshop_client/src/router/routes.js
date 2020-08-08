// 引入Home组件
import Home from '@/pages/Home'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 路由组件的注册
export default [
  // 注册Home路由组件
  {
    path: '/',
    component: Home
  },
  // 注册Search路由组件
  {
    path: '/search',
    component: Search
  },
  // 注册Login路由组件
  {
    path: '/login',
    component: Login,
    // 目的: 隐藏底部的Footer组件,默认是就是隐藏
    meta: {
      isHideFooter: true
    }
  },
  // 注册Register路由组件
  {
    path: '/register',
    component: Register,
    // 目的: 隐藏底部的Footer组件,默认是就是隐藏
    meta: {
      isHideFooter: true
    }
  },
  // 重新定向的操作的配置,默认跳转到Home组件界面
  {
    path: '/',
    redirect: '/'
  }
]
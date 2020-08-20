// 引入Home组件
import Home from '@/pages/Home'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Detail 组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入ShopCart组件
import ShopCart from '@/pages/ShopCart'
// 引入Trade组件订单
import Trade from '@/pages/Trade'
// 引入Pay支付组件
import Pay from '@/pages/Pay'
// 引入PaySuccess支付成功组件
import PaySuccess from '@/pages/PaySuccess'
// 引入Center个人中心组件
import Center from '@/pages/Center'
// 引入MyOrder我的订单组件
import MyOrder from '@/pages/Center/MyOrder'

// 引入GroupBuy团购订单组件
// import GroupBuy from '@/pages/Center/GroupBuy'
// 路由的懒加载
const GroupBuy = () => import('@/pages/Center/GroupBuy')


// 引入store
import store from '@/store'
// 路由组件的注册
export default [

  // 注册Home路由组件
  {
    path: '/',
    component: Home
  },
  // 注册Search路由组件
  {
    path: '/search/:keyword?', // ? 当前的keyword参数可有可无,都可以进行路由的跳转
    component: Search,
    name: 'search'
  },
  // 注册Login路由组件
  {
    path: '/login',
    component: Login,
    // 目的: 隐藏底部的Footer组件,默认是就是隐藏
    meta: {
      isHideFooter: true
    },
    // 路由内的独享守卫
    // 	2. 只有在没有登录的情况下,才能看到登录界面(已经登录过了,就没有必要再看到登录界面)
    beforeEnter: (to, from, next) => {
      // 判断是否登录
      if (store.state.user.userInfo.name) {
        // 已经登录了,那么就去首页
        next('/')
      } else {
        // 没有登录的情况下正常的放行(因为此时访问的就是/login界面)
        next()
      }
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
  // 注册Detail路由组件---商品的详情页
  {
    path: '/detail/:skuId',
    component: Detail,
    name: 'detail'
  },
  // 注册添加购物车成功的组件
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // 	3. 只有携带了skuId和skuNum以及localStorage中有skuInfo数据才能看到添加购物车成功的界面/addcartsuccess
    beforeEnter: (to, from, next) => {
      // 从路由的path的query中获取skuId和skuNum
      const { skuId, skuNum } = to.query
      // 从浏览器的缓存中获取skuInfo数据
      const skuInfo = window.localStorage.getItem('SKU_INFO')
      // 判断这些数据是否存在,如果存在则放行
      if (skuId && skuNum && skuInfo) {
        next()
      } else {
        // 如果不存在,从哪里来的就去哪里
        next(from.path)
      }

    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },


  // Trade订单组件
  {
    path: '/trade',
    component: Trade,
    // 	4. 只有从购物车界面才能进入到交易的界面/trade
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if (from.path === '/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  // Pay支付组件
  {
    path: '/pay',
    component: Pay,
    props: route => ({ orderId: route.query.orderId }),
    // 	5. 只有从交易的界面才能进入到支付界面/pay
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if (from.path === '/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  // PaySuccess支付组件
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 	6. 只有从支付界面才能进入到支付成功的界面/paysuccess
    beforeEnter: (to, from, next) => {
      // 判断从哪里来的(从哪里离开的)
      if (from.path === '/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  // Center支付组件
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: '/center/groupbuy',
        component: GroupBuy
      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },




  // 重新定向的操作的配置,默认跳转到Home组件界面
  {
    path: '/',
    redirect: '/'
  }
]
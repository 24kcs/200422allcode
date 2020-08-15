// 引入home模块
import home from './home'
// 引入search模块
import search from './search'
// 引入detail
import detail from './detail'
// 引入shopcart
import shopcart from './shopcart'
// 暴露modules对象,里面都是每个模块
export default {
  // 第一个模块---都是Home组件中用到的状态数据
  home,
  search,
  detail,
  shopcart
}
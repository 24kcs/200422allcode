// detail模块
// 引入api接口函数
import { reqAddToCart, reqShopCartList, reqCheckCartItem, reqDeleteCartItem } from '@/api'
const state = {
  shopList: [] // 购物车的数据数组---暂且用不上
}
const mutations = {
  // 直接修改购物车中商品列表的数据
  RECEIVE_SHOP_LIST (state, shopList) {
    state.shopList = shopList
  }

}
const actions = {
  // 获取购物车列表信息数据
  async getShopCartList ({ commit }) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit('RECEIVE_SHOP_LIST', result.data)
    }
  },
  // 添加购物扯的操作
  async addToCart1 ({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum)
    // 添加成功或者添加失败
    if (result.code === 200) {
      // console.log('添加成功')
      callback('')
    } else {
      callback('添加失败')
      // console.log(result.message||'添加失败')
    }
  },
  // 添加购物车的操作
  async addToCart ({ commit }, { skuId, skuNum }) {
    // 调用api接口函数,实现添加购物车操作
    const result = await reqAddToCart(skuId, skuNum)
    return result.code === 200 ? '' : result.message || '添加失败'

  },
  // 修改购物项的选中状态
  async checkCartItem ({ commit }, { skuId, isChecked }) {
    const result = await reqCheckCartItem(skuId, isChecked)
    return result.code === 200 ? '' : result.message || '修改选中状态失败'
  },
  // 删除购物车中的商品项
  async reqDeleteCartItem ({ commit }, skuId) {
    const result = await reqDeleteCartItem(skuId)
    return result.code === 200 ? '' : result.message || '删除购物项失败'
  }
}
const getters = {
  // 总数量
  totalCount (state) {
    return state.shopList.reduce((pre, item) => {
      // if(item.isChecked===1){
      //  return pre+item.skuNum
      // }else{
      //  return pre
      // }
      return item.isChecked === 1 ? pre + item.skuNum : pre
    }, 0)
  },
  // 总价格
  totalPrice (state) {
    return state.shopList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum * item.skuPrice : pre
    }, 0)
  },
  // 全选/全不选
  isCheckAll (state) {
    // 每个商品是不是都是选中的?如果都选中了,则返回true--->全选了,只要有一个没有选中,那么就返回false
    return state.shopList.length>0&& state.shopList.every(item => item.isChecked === 1)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
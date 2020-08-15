// detail模块
// 引入api接口函数
import { reqAddToCart } from '@/api'
const state = {
  shopList: [] // 购物车的数据数组---暂且用不上
}
const mutations = {

}
const actions = {
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
    const result = await reqAddToCart(skuId,skuNum)
    return result.code === 200 ? '' : result.message || '添加失败'

  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}
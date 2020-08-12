// home模块
// 引入api接口函数
import { reqProductList } from '@/api'
const state = {
  // 商品信息数据对象
  productList: {}
}
const mutations = {
  // 直接修改商品信息数据对象的方法
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  // 获取商品信息数据对象
  async getProductList ({ commit }, searchParams) {
    // 调用接口函数,并传入参数数据对象
    const result = await reqProductList(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_PRODUCT_LIST', result.data)
    }
  }
}
const getters = {
  // 品牌信息数据数组
  trademarkList (state) {
    return state.productList.trademarkList || []
  },
  // 平台属性信息数据数组
  attrsList (state) {
    return state.productList.attrsList || []
  },
  // 产品信息数据数组
  goodsList (state) {
    return state.productList.goodsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
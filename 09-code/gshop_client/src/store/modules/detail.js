// detail模块
// 引入api接口函数
import { reqDetailInfo } from '@/api'
const state = {
  detailInfo: {} // 商品的详情信息对象
}
const mutations = {
  // 直接修改商品详情信息数据对象
  RECEIVE_DETAIL_INFO (state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const actions = {
  // 根据skuId获取商品详情信息
  async getDetailInfo ({ commit }, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  }
}
const getters = {
  // 三级分类信息对象
  categoryView (state) {
    return state.detailInfo.categoryView || {}
  },
  // 当前的这个商品的销售属性数组
  spuSaleAttrList (state) {
    return state.detailInfo.spuSaleAttrList || []
  },
  // 当前的商品的详情对象
  skuInfo (state) {
    return state.detailInfo.skuInfo || {}
  },
  // 当前商品的图片轮播图数组
  skuImageList (state) {
    const skuInfo = state.detailInfo.skuInfo || {}
    return skuInfo.skuImageList || []
  }


}
export default {
  state,
  mutations,
  actions,
  getters
}
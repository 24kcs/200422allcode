// detail模块
// 引入api接口函数
import { reqTradeInfo, reqPayInfo } from '@/api'
const state = {
  // 核对订单的信息数据
  tradeInfo: {},
  // 支付的信息对象
  payInfo: {}
}
const mutations = {
  // 修改订单信息的对象
  RECEIVE_TRADE_INFO (state, { tradeInfo }) {
    state.tradeInfo = tradeInfo
  },
  // 修改支付的信息
  RECEIVE_PAY_INFO (state, { payInfo }) {
    state.payInfo = payInfo
  }
}
const actions = {
  // 获取核对的订单的相关的信息
  async getTradeInfo ({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      const tradeInfo = result.data
      commit('RECEIVE_TRADE_INFO', { tradeInfo })
    }
  },
  // 获取支付的相关信息
  async getPayInfo ({ commit }, orderId) {
    const result = await reqPayInfo(orderId)
    if (result.code === 200) {
      const payInfo = result.data
      commit('RECEIVE_PAY_INFO', { payInfo })
    }
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


// var obj = { age: 10 }

// function f1({obj1}){
//   console.log(obj1)
// }

// f1({obj})
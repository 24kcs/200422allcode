// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
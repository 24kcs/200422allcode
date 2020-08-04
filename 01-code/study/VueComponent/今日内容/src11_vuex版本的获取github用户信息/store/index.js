// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 声明使用
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 包含了多个状态数据
const state = {
  count: 0
}
// 包含了多个直接修改状态数据的方法的对象(同步操作)
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象(异步操作)
const actions = {
  // 加的操作
  // increment (context) {
  //   context.commit('INCREMENT')
  // },
  // // 减得操作
  // decrement ({ commit }) {
  //   commit('DECREMENT')
  // },
  // 奇数的加操作
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit('INCREMENT')
    }
  },
  // 异步的加
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  }
}
// 包含了多个状态数据的计算属性的get方法的对象(和状态数据有关系,都是get方法)
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
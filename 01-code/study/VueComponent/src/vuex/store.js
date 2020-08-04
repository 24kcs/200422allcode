// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用插件
Vue.use(Vuex)
// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 包含了多个直接修改状态数据的方法的对象
const mutations = {
  // 加的操作,改变状态
  INCREMENT (state) {
    state.count++
  },
  // 减的操作
  DECREMENT (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  // 加的操作
  increment (context) {
    context.commit('INCREMENT') // 实现修改状态数据count,而且是加的操作
  },
  // 减的操作
  decrement (context) {
    context.commit('DECREMENT')
  },
  // 只有数据是奇数的时候,才能够进行加的操作
  incrementOrOdd ({commit,state}) {
    // 判断的操作
    if (state.count % 2 !== 0) {
      commit('INCREMENT')
    }
  },
  // 异步的加的操作
  incrementAdync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  }
}
// 包含了多个状态数据的计算属性的get方法的对象(状态数据的变化,会影响其他的数据变化,计算属性中的get方法)
const getters = {
  // get方法
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}
// 实例化对象并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,

})

// const store = new Vuex.Store({

// })

// export default store


// const obj ={
//   name:'小明',
//   age:10
// }
// const {name} = obj
// console.log(name)
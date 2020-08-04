// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入mutation的types
import {INCREMENT,DECREMENT} from './mutation-types.js'
// 声明使用插件
Vue.use(Vuex)
// 包含了多个状态数据的对象
const state = {
  count: 0,
}
// 包含了多个直接修改状态数据的方法的对象
const mutations = {
  // mutations对象中的每个方法的名字可以换一种叫法，叫:mutation
  // mutation都有自己的类型---->type,每个mutation都有自己的type,该mutation的方法名字就是type名字
  // 为了方便使用每个mutation的type,官方提供了一种写法,可以把type定义成常量名字,提交mutation的时候可以直接使用type名字
  // 加的操作,改变状态
  [INCREMENT] (state) {
    state.count++
  },
  // 减的操作
  [DECREMENT] (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  // actions对象中的每个方法都可以叫action
  incrementOrOdd ({commit,state}) {
    if (state.count % 2 !== 0) {
      // 直接使用字符串的mutation的type容易写错,可以定义成常量名直接使用
      commit(INCREMENT)
    }
  },
  // 异步的加的操作
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit(DECREMENT)
    }, 1000)
  }
}
// 包含了多个状态数据的计算属性的get方法的对象
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
// 用户信息模块
// 引入用户的临时凭证
import { getUUID } from '@/utils/storage'
import { reqLogin, reqRegister, reqLogout } from '@/api'
const state = {
  // 初次打开项目的时候,就从浏览器的缓存中读取用户信息,如果没有则默认值为空对象
  userInfo: JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {}, // 存储用户信息
  userTempId: getUUID()
}
const mutations = {
  // 登录成功了,必然要修改用户信息对象
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 退出了,也要修改用户信息(重置)
  RESET_USER_INFO (state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login ({ commit }, { mobile, password }) {
    const result = await reqLogin(mobile, password)
    if (result.code === 200) {
      // 获取用户信息
      const userInfo = result.data
      // 保存在浏览器的缓存中
      localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
      // 更新vuex中的数据
      commit('RECEIVE_USER_INFO', userInfo)
    } else {
      throw new Error(result.message || '登录失败了')
    }
  },
  // 注册
  async register ({ commit }, userInfo) {

    const result = await reqRegister(userInfo)

    if (result.code !== 200) {
      // 失败了
      throw new Error(result.message || '注册失败了')
    }
  },

  // 退出
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      // 更新用户信息
      commit('RESET_USER_INFO')
      // 清空缓存中的用户信息
      localStorage.removeItem('USER_INFO_KEY')
    } else {
      throw new Error(result.message || '退出失败')
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
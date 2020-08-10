// home模块
// 引入api接口函数
import { reqBaseCategoryList } from '@/api'
export default {
  state: {
    // 三级分类的列表数据
    baseCategoryList: []
  },
  mutations: {
    // 直接修改三级分类的状态数据的方法
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    }
  },
  actions: {
    // 获取三级分类的列表数据
    async getBaseCategoryList ({ commit }) {
      // 调用api接口函数
      const result = await reqBaseCategoryList()
      if (result.code === 200) {
        // 直接提交mutation
        commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
      }
    }
  },
  getters: {}
}
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
      // 由于后台设计数据的时候多了两个,前端在获取数据后,干掉后面的两个数据,不要了
      state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
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
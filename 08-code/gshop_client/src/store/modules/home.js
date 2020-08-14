// home模块
// 引入api接口函数
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'
export default {
  state: {
    // 三级分类的列表数据
    baseCategoryList: [],
    banners: [], // 大轮播图的数据
    floors: [] // 楼层数据
  },
  mutations: {
    // 直接修改三级分类的状态数据的方法
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      // 由于后台设计数据的时候多了两个,前端在获取数据后,干掉后面的两个数据,不要了
      state.baseCategoryList = baseCategoryList.splice(0, baseCategoryList.length - 2)
    },
    // 直接修改大轮播图的数据
    RECEIVE_BANNERS (state, banners) {
      state.banners = banners
    },
    // 直接修改楼层的数据
    RECEIVE_FLOORS (state, floors) {
      state.floors = floors
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
    },
    // 获取大轮播图数据
    async getBanners ({ commit }) {
      const result = await reqBanners()
      if (result.code === 200) {
        commit('RECEIVE_BANNERS', result.data)
      }
    },
    // 获取楼层的数据
    async getFloors ({ commit }) {
      const result = await reqFloors()
      if (result.code === 200) {
        commit('RECEIVE_FLOORS', result.data)
      }
    }
  },
  getters: {}
}
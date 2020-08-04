// 引入mutation的types
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
// 包含了多个直接修改状态数据的方法的对象
export default {
  // 发送请求中
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },
  // 请求成功
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },
  // 请求失败
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error.message || '未知错误'
  },
}
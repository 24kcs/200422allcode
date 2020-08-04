// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
// 包含了多个直接修改状态数据的方法的对象
export default {
  // 发送请求的时候需要修改状态数据
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },
  // 响应成功后需要修改状态数据
  [REQ_SUCCESS] (state, users) {  // 外部在提交这个mutation的时候可以传入进来
    state.loading = false
    state.users = users
  },
  // 响应失败后需要修改状态数据
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error.message || '未知错误'
  }
}
// 引入mutation的types
import {REQUEST,REQ_SUCCESS,REQ_ERROR} from './mutation-types'
// 引入axios
import axios from 'axios'
// 包含了多个间接修改状态数据的方法的对象
export default {
  // 进行搜索的操作(把事件总线中的代码移植到这里来写,干掉事件总线)
  async search ({commit},searchName) { // 异步操作的方法代码
    // 第一次 更新数据(请求中),提交对应的mutation进行状态的改变
    commit(REQUEST) 
    try {
      const response = await axios.get('/api/search/users2', {
        params: {
          q: searchName,
        },
      })
      // 成功了, 更新数据(成功)
      const result = response.data
      // 从响应数据中取出users  , user的结构为: {id, avatar_url, name, url}
      const items = result.items // users中的user结构为 {id, avatar_url, login, html_url, ...}
      const users = items.map((item) => ({
        id: item.id,
        avatar_url: item.avatar_url,
        name: item.login,
        url: item.html_url,
      }))
      // 第二次 更新数据(响应成功),提交对应的mutation进行状态的改变
      commit(REQ_SUCCESS,users) 
    } catch (error) {
      // 第三次 更新数据(响应失败),提交对应的mutation进行状态的改变
      commit(REQ_ERROR,error) 
    }
  }
}
// 包含了多个间接修改状态数据的方法的对象
// 引入mutation-types
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
import axios from 'axios'
export default {
  async search ({commit},searchName) {
    // 更新数据(请求中)
    commit(REQUEST)
    try {
      const response = await axios.get('/api/search/users2', {
        params: {
          q: searchName
        }
      })
      // 成功了, 更新数据(成功)
      const result = response.data
      // 从响应数据中取出users  , user的结构为: {id, avatar_url, name, url}
      const items = result.items // users中的user结构为 {id, avatar_url, login, html_url, ...} 
      const users = items.map(item => ({
        id: item.id,
        avatar_url: item.avatar_url,
        name: item.login,
        url: item.html_url
      }))
      // 更新数据
      commit(REQ_SUCCESS,users)
    } catch (error) { // 失败了, 更新数据(失败)
      commit(REQ_ERROR,error)
    }
  }
}
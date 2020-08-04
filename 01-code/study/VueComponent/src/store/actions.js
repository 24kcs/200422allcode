// 引入mutation的types
import {REQUEST,REQ_SUCCESS,REQ_ERROR} from './mutation-types'
// 引入axios
import axios from 'axios'
// 包含了多个间接修改状态数据的方法的对象
export default {
  async search ({commit},searchName) {
    // 发送请求的时候更新了状态数据
    commit(REQUEST)
    try {
      const response = await axios.get('/api/search/users2', {
        params: {
          q: searchName
        }
      })
      const result = response.data
      const items = result.items
      const users = items.map(item => ({
        id: item.id,
        avatar_url: item.avatar_url,
        name: item.login,
        url: item.html_url
      }))
      // 请求成功了,更新了一次状态数据
      commit(REQ_SUCCESS,users)
    } catch (error) {
      // 请求失败了,更新了一次状态数据
      commit(REQ_ERROR,error)
    }

  }
}
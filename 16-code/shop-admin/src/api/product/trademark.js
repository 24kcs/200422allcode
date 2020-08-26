// 引入了二次封装axios---相当于前台的项目中的ajax.js文件--->当前的这个暴露出来的对象是:request
import request from '@/utils/request'
// 公共的接口地址
const API_NAME = '/admin/product/baseTrademark'
// 暴露出去一个对象---trademark
export default {

  // 根据页码和每页的条数获取当前的品牌信息列表数据
  getTrademarkList (page, limit) {
    if (page && limit) {
      return request({
        url: `${API_NAME}/${page}/${limit}`,
        method: 'GET'
      })
    } else {
      return request({
        url: `${API_NAME}/getTrademarkList`,
        method: 'GET'
      })
    }

  },
  // 获取所有的品牌信息列表数据--返回的是一个数组
  // getAllTrademarkList () {
  //   // 通过配置对象的方式封装api接口函数
  //   return request({
  //     url: `${API_NAME}/getTrademarkList`,
  //     method: 'GET'
  //   })
  //   // 直接调用get方法的方式进行api接口函数的封装
  //   // return request.get(`/admin/product/baseTrademark/getTrademarkList`)
  // },
  // 根据id获取当前的品牌信息数据对象
  getTrademarkById (id) {
    return request({
      url: `${API_NAME}/get/${id}`,
      method: 'GET'
    })
  },

  // 根据id删除对应的品牌对象
  deleteTrademarkById (id) {
    return request({
      url: `${API_NAME}/remove/${id}`,
      method: 'DELETE'
    })
  },
  // 添加品牌
  addTrademark (trademark) {
    return request({
      url: `${API_NAME}/save`,
      method: 'POST',
      data: trademark
    })
  },
  // 修改品牌
  updateTrademark (trademark) {
    return request({
      url: `${API_NAME}/update`,
      method: 'PUT',
      data: trademark
    })
  }
}


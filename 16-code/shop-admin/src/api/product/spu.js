// 引入了二次封装axios---相当于前台的项目中的ajax.js文件--->当前的这个暴露出来的对象是:request
import request from '@/utils/request'
// 公共的接口地址
const API_NAME = '/admin/product'
// 暴露出去一个对象---spu
export default {
  // 获取所有的销售属性
  getBaseSaleAttrList () {
    return request.get(`${API_NAME}/baseSaleAttrList`)
  },
  // 根据spu的Id删除对应的spu商品对象
  deleteSpuInfoBySpuId (spuId) {
    return request.delete(`${API_NAME}/deleteSpu/${spuId}`)
  },
  // 根据spu的id获取对应的spu商品对象
  getSpuInfoByspuId (spuId) {
    return request.get(`${API_NAME}/getSpuById/${spuId}`)
  },
  // 添加或修改spu商品对象信息---参数是spu对象
  saveOrUpdateSpuInfo (spuInfo) {
    return request.post(`${API_NAME}/${spuInfo.id ? 'update' : 'save'}SpuInfo`, spuInfo)
  },
  // 根据页码和每页的条数及三级分类的id来以分页的形式获取spu的商品列表信息数据
  getSpuInfoList (page, limit, category3Id) {
    return request.get(`${API_NAME}/${page}/${limit}`, { params: { category3Id } })
  }

}


// GET /admin/product/{page}/{limit}
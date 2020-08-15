// 引入二次封装axios
import ajax from './ajax'
// 引入ajaxMock
import ajaxMock from './ajaxMock'
// 封装该项目要用到的api接口函数

// 地址 可以进行拆分:
// 服务器的地址:http://182.92.128.115
// 接口的具体地址:/api/product/getBaseCategoryList
// 二次封装的axios中曾经设置过基本的请求的前置路径/api
// 每个api接口函数中都需要当前的这个服务器地址,单独的拿出来设置
// 去掉前置的基本路径/api,所以,api接口函数中的地址,可以重新处理
// 由于,当前项目启动后,在浏览器的地址:http://localhost:8080/ ,而要访问的服务器的地址和当前的浏览器地址不是同一个服务器地址
export const reqBaseCategoryList = () => ajax.get(`/product/getBaseCategoryList`)

// 定义mock相关的api接口函数

export const reqBanners = () => ajaxMock.get('/banners')
export const reqFloors = () => ajaxMock.get('/floors')


// 获取商品信息对象的接口
export const reqProductList = (searchParams) => ajax.post(`/list`, searchParams)

// 获取商品的详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 添加商品到购物车的接口函数
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
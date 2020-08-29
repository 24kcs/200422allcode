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

// 获取购物城中的商品列表数据
export const reqShopCartList = () => ajax.get(`/cart/cartList`)
// 设置购物车中商品的选中状态
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车中购物项
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

// 登录的接口
export const reqLogin = (mobile, password) => ajax.post(`/user/passport/login`, { mobile, password })
// 注册的接口
export const reqRegister = (userInfo) => ajax.post(`/user/passport/register`, userInfo)
// 退出的接口
export const reqLogout = () => ajax.get(`/user/passport/logout`)

// 获取订单交易的信息
export const reqTradeInfo = () => ajax.get(`/order/auth/trade`)
// 提交订单
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({
  method: 'POST', // 请求的方式
  url: `/order/auth/submitOrder`, // 请求的地址
  params: { tradeNo }, // 订单的编号参数
  data: orderInfo // 订单中的信息数据
})

// 获取订单列表数据
export const reqOrderList = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)

// 获取订单支付信息
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)

// 获取订单的支付状态
export const reqPayStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 引入mockjs
import Mock from 'mockjs'
// 引入banners轮播图数据
import banners from './banners.json'
// 引入floors楼层数据
import floors from './floors.json'
// 调用方法,拦截ajax请求的指定地址,并响应随机的数据
Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })

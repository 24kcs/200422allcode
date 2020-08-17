// 引入uuid
import UUID from 'uuidjs'
// 函数---产生用户的临时凭证
export function getUUID () {
  // 获取用户临时凭证的
  let uuid = localStorage.getItem('UUID_KEY')
  // 判断数据是否存在
  if(!uuid){
    uuid = UUID.generate()
    // 存储到浏览器的缓存中
    localStorage.setItem('UUID_KEY',uuid)
  }
  return uuid
}
// vue.config.js
module.exports = {
  // 管理eslint语法检查的信息
  lintOnSave:false,
  // 跨域的配置
  devServer: {
    proxy: {
      '/api': {  // api接口函数的地址中的基本的前置路径就是/api,专门负责/api开头的接口地址
        target: 'http://182.92.128.115', // 服务器的目标地址
        changeOrigin: true // 是否进行跨域
      }
    }
  }
}
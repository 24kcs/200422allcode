/*

1. 启动项目:  npm run dev
2. 项目初次运行,直接报错,需要运行:npm rebuild node-sass   (部分同学不会报错,不需要运行这个命令)
3. 需要更改当前项目的服务器地址
  1) vue.config.js  第45行   http://182.92.128.115
  2) src/utils/request.js 第10行 http://182.92.128.115
  3) .env.development文件 第6行 http://182.92.128.115
4. 项目启动后,在浏览器中使用了两个tab打开的界面(直接打开了两个界面),解决:
  1) 先在 vue.config.js 文件中  第37行  open: false 不在浏览器中打开
  2) 然后在package.json文件中 第8行  "dev": "vue-cli-service serve --open", 可以在浏览器中自动的打开了

5. 如果希望打开项目后,地址栏中没有#,去src/router/index.js中 第69行, 设置为 mode: 'history'
6. 在src/views/product/prop目录--->prop改成attr 重启项目

=========以上是旧版的改造过程=============

==========新版==========无需改造=========

1. 项目技术栈: vue-cli3+element-ui组件库+vuex+axios+swagger在线api接口测试工具
2. 当前项目是属于二次开发的项目,并不是从0到1
3. 项目目录说明，src目录下:
  api目录:存放api接口函数的目录(内部有不同模块的api接口函数)
  assets目录:存放静态资源的
  components目录:普通组件
  icons:图标
  layout目录:整体的结构搭建的部分组件
  plugins目录:插件的
  router目录:路由
  store目录:vuex
  styles目录:样式
  utils目录:工具方面的文件,如:axios的二次封装,请求拦截器和响应拦截器,表单验证的东西
  views目录:各个模块的组件
    product目录---我们要开发的目录

  api目录和views目录中product目录---经常使用---进行开发




=======================平台管理模块==============
1. 需要使用到的组件:
  Button按钮/Table表格/Pagination分页组件/Dialog对话框/Upload上传Loading组件

2. 
  1) 首先通过Swagger在线测试接口工具,进行接口的测试
  2) 在api目录/product目录/trademark.js文件 封装各个接口函数
  3) 在api目录/index.js文件中 导入 并 导出 trademark模块
  4) src/views/product/trademark/list.vue中mounted中测试接口


*/
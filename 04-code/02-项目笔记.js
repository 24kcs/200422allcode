/*
1. 通过脚手架3的命令下载 项目
vue create gshop_client
2. 运行项目
npm run serve
3. 打包
npm run build 产生了dist目录
4. 运行打包文件
serve dist 
以上都是测试

src 目录中 有个assets目录 存放组件中需要的静态资源(咱们暂时不用,直接删除)
    components目录 存放普通组件的目录
    main.js文件是程序的主入口文件
    App.vue是所有组件的父级组件文件


项目的笔记内容:
技术栈；vue脚手架+ vue-router + axios  
项目搭建需要安装的插件(包): 
npm install  vue-router  vuex  axios  less less-loader

项目中所需目录:
api---------->存放api接口函数及二次封装的axios的拦截器内容的
components--->存放普通组件的目录
mock--------->存放静态数据及mockjs所需内容
pages-------->存放的路由相关的组件目录
router------->存放的是路由器及注册路由相关的内容
store-------->存放的是vuex相关的内容
utils-------->存放的相关的一些工具的目录

设置项目在浏览器中自动的打开
package.json文件中
"serve": "vue-cli-service serve --open",

组件的名字在定义的时候,通常使用的是大写字母的方式,有的时候为了开发方便,组件的名字可以以index.vue来命名


界面中几个基本的组件
Header组件和Footer组件----普通组件,在components目录中定义,在App.vue中使用
Home组件/Search组件/Login组件/Register组件---路由组件,在pages目录中定义,在router目录中注册路由组件



*/
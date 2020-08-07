/**
 * 
 *  如果电脑中已经有了脚手架2,需要先卸载
 * 
 * npm uninstall vue-cli -g
 * 
 * 
 * 1. 使用脚手架2/脚手架3/4 下载项目
 * 
 * 首先, 安装脚手架3/4 安装桥接工具(可以使用脚手架2下载项目)
 * 
 * npm install -g @vue/cli   安装脚手架3/4 命令
 * 
 * 如果希望电脑中也可以使用脚手架2下载项目
 * 
 * npm install -g @vue/cli-init  桥接工具
 * 
 * 
 * 以上两个命令结束后,电脑中可以使用脚手架2/脚手架3/4 下载项目
 * 脚手架2 如何下载项目
 * vue init webpack 项目名字  一路回车(中间的选项可以暂时都是no) 
 * 最终 命令: cd 项目名字  切换到项目的目录中
 * 执行下面命令可以运行项目
 * npm run dev  运行项目的命令,最终打开窗口看到效果 结束
 * 
 * 脚手架3 如何下载项目
 * vue create 项目名字  一路回车
 * 最终 cd 项目名字  切换到项目的目录中
 * 执行下面命令可以运行项目
 * npm run serve 运行项目的命令,最终打开窗口看到效果 结束
 * 
 * 退出服务： ctrl+c 按两次  输入 y 即可退出 命令窗口当前的服务
 * 
 * 
 * app目录---脚手架2 下载的项目目录
 * app2目录---脚手架3/4 下载的项目目录
 * 
 * 
 * 脚手架2 下载的项目 在vscode终端中 打开运行
 * npm run dev
 * 成功后的地址: http://localhost:8080 此时没有在浏览器中自动打开
 * build目录中webpack.base.conf.js 文件中 第25行代码可以设置当前项目 运行的目录设置(默认的不用改)
 * config目录中index.js文件中 第18行代码改成  true  则表示在浏览器中可以自动打开
 * 以上是运行项目的操作
 * 
 * 对项目进行打包的命令,再次打开一个终端
 * npm run build 
 * 在当前的app目录中会出现一个dist目录(将来你要给其他程序员上线/测试的一个打包目录文件)
 * 运行打包文件
 * serve dist   (如果serve没有,或者运行出错,需要安装serve---->npm install serve)
 * 成功的地址: http://localhost:5000
 * 
 * 
 * 脚手架3/4 下载的项目目录 在vscode终端中 打开运行
 * npm run serve
 * 成功后的地址: http://localhost:8080 此时没有在浏览器中自动打开
 * 在package.json文件中 第6行代码后面加 --open 保存    "serve": "vue-cli-service serve --open",
 * 再次运行
 * npm run serve 可以在浏览器中自动的打开了
 * 对项目进行打包的命令,再次打开一个终端
 * npm run build
 * 在当前的app2目录中会出现一个dist目录(将来你要给其他程序员上线/测试的一个打包目录文件)
 * 运行打包文件
 * serve dist   (如果serve没有,或者运行出错,需要安装serve---->npm install serve)
 * 成功的地址: http://localhost:5000
 * 
 * 
 * 
 * 
 * 脚手架2和脚手架3/4 下载的项目 一些区别问题
 * 目录中的文件个数不同
 * 
 * 
 * 脚手架2中的目录
 * build ----webpack的相关配置的目录---要进行打包的
 * config----浏览器中的配置目录
 * dist----打包后产生的文件目录
 * node_modules----依赖包目录
 * src-----程序运行的主入口目录
 * static-----存放静态资源的目录----index.html文件需要图标字体或者重置样式/图片
 * .babelrc文件-----babel的配置-----element-ui组件库的配置
 * .eslintignore文件---可以配置哪些文件中不需要eslint语法检查
 *    /*.vue  当前的这个目录下的.vue文件中不再有eslint语法检查了
 *    *.vue  所有的.vue文件中都不需要eslint语法检查
 * .eslintrc文件---可以对eslint语法检查进行配置
 *    第23行的位置中,可以一项一项的配置哪个eslint检查不需要了
 * .gitignore文件----可以进行git上传的配置,依赖包的文件不需要上传,可以直接进行配置
 * index.html文件------最终组件会渲染到该文件的div容器中
 * 
 * 脚手架3/4中的目录
 * dist----打包后产生的文件目录
 * node_modules----依赖包目录
 * src-----程序运行的主入口目录
 * .gitignore文件----可以进行git上传的配置,依赖包的文件不需要上传,可以直接进行配置
 * .babel.config.js -------babel的配置-----element-ui组件库的配置
 * public目录-----index.html文件,包括将来可以存放静态资源
 * 
 * 
 * 运行项目的命令不同  2--->npm run dev   3/4----  npm run serve
 * eslint的配置不同
 * 跨域的配置也不同
 * 
 */
































/**
 * 
 * 自定义脚手架工具,实现vue的开发
 * 
 * 用别人已经定义好的脚手架 进行vue的开发
 * 
 * 先安装脚手架3/4版本,再次安装脚手架2桥接工具
 * 电脑可以使用脚手架2进行开发
 * 也可以使用脚手架3/4进行开发
 * 
 * 
 * 
 * 假设电脑中先安装了脚手架2的版本了,那么如果想要使用脚手架3/4 必须要先干掉脚手架2,然后安装脚手架3/4,然后装桥接工具才可以使用脚手架2
 * npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载电脑中的脚手架2的命令
 * 
 * 
 * 所以,
 * 先安装脚手架3/4的版本,再次安装桥接工具,电脑中脚手架2/3/4都可以使用
 * 
 * 安装脚手架3/4的命令
 * npm install -g @vue/cli
 * 还想用到脚手架2
 * 安装一个桥接工具
 * npm install -g @vue/cli-init
 * 电脑中也可以使用的脚手架2/3/4
 * cmd窗口中:  vue -V 查看版本
 * 
 * 执行命令是在自己的cmd窗口中--权限比较高的窗口
 * 
 * 下载的时候 一定要在比较规范目录中(所有的目录最好都是英文的)
 * 
 * 如何通过命令下载vue的项目了
 * 脚手架2的命令
 * vue init webpack 项目名字
 * 脚手架3/4的命令
 * vue create 项目名字
 * 
 * 
 */






/**
 * 
 * 脚手架2的下载命令
 * npm install -g vue-cli
 * 脚手架3的下载命令
 * npm install -g @vue/cli
 * 注意:如果电脑中安装了脚手架2了,不能直接安装脚手架3,必须要先干掉电脑中脚手架2,然后再安装脚手架3
 * npm uninstall vue-cli -g 先干掉脚手架2
 * npm install -g @vue/cli  再安装脚手架3
 * 
 * 通过脚手架2下载模版的命令
 * vue init webpack app-client2
 * 通过脚手架3下载模版的命令
 * vue create app-client3
 * 注意: 我干掉了脚手架2,也安装了脚手架3,但是我就想通过脚手架2的命令下载模版怎么办
 * 先需要全局安装一个桥接工具  命令:  npm install -g @vue/cli-init
 * 至此: 电脑中有可以通过脚手架2的命令下载模版,页可以通过脚手架3的命令下载模版
 * 
 * 脚手架2 启动 的命令和 打包  打包命令
 *  npm start 
 *  npm run build 
 *  serve dist
 *  
 * 脚手架3 启动 的命令和 打包  打包命令
 * npm run serve
 * npm run build 
 * serve dist
 * 
 * 
 * 脚手架2和脚手架3的区别:
 * 1. 目录的文件个数不同
 * 2. 脚手架2中有static目录,用来存储静态资源的,脚手架3中没有这个目录,静态资源可以放在public目录中
 * 3. 在浏览器中自动打开的设置不同
 *    脚手架2在config目录中的index.js文件中18行的位置设置为true,则可以在浏览器中自动的打开
 *    脚手架3中需要在package.json中第6行位置,需要加个--open,即可在浏览器中自动的打开
 * 4. eslint的设置不同
 *    脚手架2中在.eslintignore文件中可以直接设置哪些文件不用eslint检查
 *    脚手架2中在.eslintrc.js文件中可以逐个设置eslint语法检查是否关闭
 *    脚手架3中可以在vue.config.js文件中通过lintOnSave设置布尔类型的值 进行eslint语法检查的设置
 *    vue.config.js文件需要手动的添加到根目录中
 * 5. main.js中的代码不同
 *    脚手架3中的代码和脚手架2的不一样
 * 6. 跨域配置的设置不同----
 * 
 * 
 * 在脚手架中如果想要使用stylus 书写样式,首先需要安装stylus的相关插件
 *  npm install stylus stylus-loader
 * 
 * 
 * 
 * 
 * 
 * 路由传参的方式:
 * 1.params的方式:
 *  在注册路由的时候,需要使用:进行占位,在组件内部可以通过$route路由信息对象.params.xxx的方式获取路由传递的参数数据
 *  如:注册路由的时候
 *   {path:'/about/:id',component:About}
 *   组件中如何获取参数数据
 *   $route.params.id 即可获取
 *  params的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.params.id)
 *  params的传参方式和组件的联系很密切----耦合度比较高
 * 
 * 2.query的方式:
 *  在注册路由的时候,是不需要进行占位的,组件内部可以通过$route路由信息对象.query.xxx的方式获取路由传递的参数数据
 *  如: 注册路由和平时一样
 *   {path:'/about',component:About}
 *  组件中如何获取参数数据
 *  $route.query.id 即可获取
 *  query的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.query.id)
 *  query的传参方式和组件的联系也很密切---耦合度比较高
 * 
 * 3.meta的方式:
 *  在注册路由的时候,需要在组件内部设置meta对象,内部可以书写任何的键值对,组件内部可以通过$route路由信息对象.meta.xxx的方式获取路由传递的参数数据
 *  如:{path:'/about',component:About,meta:{showMsg:true}}
 *  组件中如何获取参数数据
 *  $route.meta.showMsg 即可获取
 * meta的方式传参,很明显想要获取数据离不开路由信息对象$route(是需要当前组件实例对象来获取的this.$route.meta.xxx)
 * meta的传参方式和组件的联系也很密切---耦合度比较高
 * 
 * 总结:params传参和query方式传参和meta方式传参,和组件的耦合度都是很高(以上三种方式传参及获取,离不开组件对象),但是不是很灵活.(组件和$route的关系很密切,高度耦合)
 * props的方式让组件和$route的关系不那么密切了,解耦
 * 
 * 
 * 4.props的方式:
 *  布尔模式: 先在注册路由的时候,使用props并设置为true,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about/:id',component:About,props:true}
 * 组件内部:props:['id'] 直接可以使用id来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 *  对象模式: 先在注册路由的时候,使用props的对象的方式,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about/:id',component:About,props:{msg:'真香'}}
 * 组件内部:props:['msg'] 直接可以使用msg来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 *  函数模式:先在注册路由的时候,使用props的函数模式的方式,则需要在组件内部通过props的方式接收参数,即可使用传递的参数数据
 * 如: {path:'/about',component:About,props:route=>({txt:'真好'})}
 * 组件内部:props:['txt'] 直接可以使用txt来获取参数数据
 * 可以不用$route,此时的组件和$route进行了解耦
 * 
 * 总结:
 *  路由传参,可以使用params的方式,也可以使用query的方式,还可以使用meta的方式,都可以使用props的方式进行解耦操作
 * 
 * 
 *  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
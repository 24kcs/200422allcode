/**
 * 
 * 1.例子:Vue版本的数据操作案例(动态的设置数据的变化)
 *  目的:引出Vuex
 * 
 *  1.组件有父级关系和兄弟关系
 *  2.组件中都有data对象,内部都是状态数据
 *  3.组件要进行通信,无非就是把data对象(暂且)中的数据传入到其他的组件中进行使用或者操作
 *  4.组件之间的通信方式(普通/基本的):
 *   props:父子组件通信
 *   自定义事件:父子
 *   插槽(普通插槽,具名插槽(命名插槽),作用域插槽):父子
 *   Pubsub(消息订阅):任意组件通信
 *   事件总线:任意组件通信
 *   Vuex
 * 
 * 1.Vuex:集中式的管理状态数据,进行任意组件的通信操作
 *  vue的devtools(浏览器的插件中)可以查看Vuex的相关状态数据
 * 
 *  面试题: 说说你对Vue中的组件通信方式的理解(普通/高级)
 *  面试题: 你的项目为什么用到了Vuex----听我们老大的
 *         你的项目为什么不用Vuex
 * 
 * 2. Vuex的使用步骤
 *  1) src目录中创建一个目录vuex,内部有一个store.js文件
 *     或者
 *     src目录中创建一个目录store,内部有一个index.js文件
 *  因个人的习惯,目录的名字可能会有所不同
 *  2) 因Vuex已经被官方集成到了Vue中了,所以,只需要安装vuex的插件,然后引入,声明使用插件,暴露及注册即可
 *    安装: npm install vuex
 *    使用: vuex目录的store.js文件中,引入Vue,引入Vuex,声明使用该插件,实例化Vuex.Store对象,并暴露出去
 *         在main.js(index.js)中引入暴露出来的对象,并注册到Vue的配置对象中即可
 * 
 * 
 * 
 * actions对象中的方法需要使用mutations中的方法的时候
 * 我们不叫做使用对应的mutations的方法,
 * 叫法: 提交mutation
 * 需要在actions中的某个方法中传入一个对象context,
 * 通过context.commit('某个mutations中的方法名字')
 * 
 * 
 * 组件和Vuex之间的联系,是通过main.js中进行了store的注册,才有关系--->组件中可以使用vuex的内容了
 * 如果有了关系
 * 每个组件的对象中都有一个$store的对象属性,就可以使用vuex了
 * 类似于: router注册后,每个组件的对象中都有了$router
 * 
 * 
 * 组件中:
 * 通过$store可以获取state对象中的状态数据
 *      组件中: this.$store.state.count --->可以获取该状态数据
 * 通过$store可以找到actions中某个对应的方法进行使用
 *      组件中: this.$store.dispatch('actions中的某个方法名字')
 * 通过$store可以找到mutations中某个对应的方法进行使用
 *      组件中: this.$store.commit('mutations中的某个方法名字')
 * 通过$store可以找到getters中某个对应的get的计算属性进行使用
 *      组件中: this.$store.getters.evenOrOdd 
 * 
 * 切记: 组件中要找mutations中的某个方法那么就用commit
 *       组件中要找actions中的某个方法那么就用dispatch
 *    
 * 
 * 
 * 
 *
 * 
 * 
 * 
 */
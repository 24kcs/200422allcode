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
 * mutations对象中的方法都可以叫mutation
 * actions对象中的方法都可以叫action
 * 
 * 
 * 组件绑定的辅助函数:该辅助函数可以直接在组件中使用,该辅助函数是为了简化组件中使用状态数据及提交mutation或者action的简化的写法
 * 
 * mutations中的方法名其实就是当前的这个mutation的type名字,type名字可以定义成常量名,在提交mutation的时候,直接使用常量名即可,再也不用担心字符串写错了,这种方式不是必须的(做项目的时候未必一定要定义常量名,也可以不去使用,保证:别人用你能够清楚是什么即可)
 *    
 * 
 * 
 * 
 *
 * 
 * 
 * 
 */


 /**
  * Vuex:管理状态数据一种模式,也是一个工具(插件)，是一个对象
  * Vuex作用: 集中式管理状态数据,可以实现任意组件之间的通信
  * Vuex,如果项目中管理的状态数据非常多,此时使用Vuex,但是也取决于你的老大
  * state:包含了多个状态数据的对象
  * mutations:包含了多个直接修改状态数据的方法的对象
  * actions:包含了多个间接修改状态数据的方法的对象
  * getters:包含了多个状态数据的计算属性的get方法的对象
  * modules(暂且不讲,前台电商项目中讲解,应用场景)
  * 
  * mutations: 内部的每个方法都可以叫mutation,每个mutation都有自己的type,type就是方法的名字,可以单独的使用常量的方式来定义,并使用
  * actions: 内部的每个方法都可以叫action
  * 
  * 使用Vuex的流程:
  * 1. 安装   npm install vuex --save
  * 2. 在一个单独的目录中创建一个文件(vuex目录/store.js文件)/(store目录/index.js文件)---学习中的规范写法
  *    到了公司里面,目录名字/文件名字可能会有变化(顺其自然/入乡随俗)
  * 3. 在js文件中,引入Vue,引入Vuex,同时声明并使用该插件,把Vuex.Store({}) 暴露出去
  * 4. main.js文件中引入暴露出来的store对象,并且在实例化Vue的时候,内部的配置对象进行store的注册
  * 5. 组件中的实例对象中就会出现$store对象属性
  * 
  * 
  * 该组件(应用)中如何使用vuex
  * 1. 一旦在main.js中进行了注册,那么每个组件的实例对象中都有一个$store对象
  * 组件内部想要获取状态数据: 
  *     this.$store.state.xxx  或者  ...mapState(['xxx'])
  * 组件内部想要直接修改状态数据: 
  *     this.$store.commit('mutation的type') 或者 ...mapMutations(['mutation的type'])
  * 组件内部想要间接/异步修改状态数据: 
  *     this.$store.dispatch('action的type') 或者 ...mapActions(['action的名字'])
  * 组件内部想要获取状态数据的计算属性:
  *     this.$store.getters.xxx  或者  ...mapGetters(['xxx'])
  * 如果在html模版中使用状态数据或者计算属性,此时是不需要使用this的
  * 
  * 组件内部如果分发/提交action修改状态数据的思路:
  *  通过dispatch进行提交action,修改状态数据,内部是通过commit找到对应的mutation进行数据的修改
  * 
  * mutations中的每个mutation方法中都可以传入一个state参数
  *   [REQUEST](state,count){state.count=count},第一个参数一定是state,如果需要其他的参数放在第二个位置
  * actions中的每个action方法中都可以传入一个context对象参数---->解构的方式:{commit}
  *   search({commit},searchName){commit('mutation的type'),console.log(searchName)}---第一个参数一定是context对象,如果需要其他的参数也是放在第二个位置
  * 
  * 
  * Vuex和事件总线的区别:
  * Vuex 是一个插件，是一种管理状态数据的模式,集中式的管理状态数据
  * 事件总线是通过原型的方式,让每个组件中都可以访问Vue原型上的某个属性,从而调用Vue实例对象中的$on,$emit,$off方
  * 法
  * 
  * 事件总线没有管理状态数据,分发事件,通过执行该事件中的回调函数,从而做一些操作,实现了任意组件的通信
  * Vuex中有state,mutations,actions,getters,专门管理状态数据,修改状态数据,被集成到了Vue中
  * 
  * 
  * 
  * 
  * 
  * 
  */

  /**
   * 
   * 第二天复习
   * 
   * 1. 伪数组转真数组的方式
   * 2. nodeType--->获取当前节点的类型
   * 3. Object.defineProperty()方法-----为某个对象添加一个属性,并且配置当前这个属性相关的限制
   * 4. Object.keys()方法----获取当前这个对象可以被遍历出来的属性----不包括原型上的属性
   * 5. 对象.hasOwnProperty()方法----判断当前对象是否有这个属性
   * 6. DcoumentFragment----文档碎片对象模型-----通常对大量的DOM树上的元素对象进行操作的时候,可以使用该对象
   * 
   * 7. MVVM源码的分析------>Vue中的一些技术
   *  1) Vue中是有数据代理,data对象中的相关属性数据,可以通过vm实例对象来调用,如何实现,通过遍历data对象中所有的属性+Object.defineProperty()方法,把data对象中的每个属性一个一个的添加到vm上,从而实现数据代理操作,data对象是被代理者,vm是代理者
   *  2) Vue中的html模版中的表达式的解析--->插值语法中的表达式是如何解析,先获取html模版中的html容器(id为app的div),遍历容器中所有的子节点,创建文档碎片对象,把所有的子节点全都放在文档碎片对象中,在内存中遍历所有的节点,判断该节点是文本节点,同时该文本节点要和插值语法的正则匹配上,会通过vm对象获取该表达式在data对象中的这个属性的值,最后通过updater对象中的textUpdater的方法进行文本节点内容的替换操作({{表达式}}整个的插值文本替换成表达式的值),最终把操作好之后的文本碎片对象重新的放在html容器中
   * 
   * 3) Vue中的事件指令和普通指令,先获取html模版中的html容器(id为app的div),遍历容器中所有的子节点,创建文档碎片对象,把所有的子节点全都放在文档碎片对象中,在内存中遍历所有的节点，判断当前的节点是标签节点,获取标签上所有的属性,判断该属性是不是以v-开头的,目的是确定当前的属性是不是指令,如果是指令在判断是不是以on开头的(v-已经干掉后),是不是事件指令,如果是事件指令,获取该属性上的事件类型(click)及对应的表达式(回调函数showMsg),通过vm获取methods对象中的showMsg的函数,通过addEventListener()方法为当前的标签绑定事件及对应的回调函数,即可,最终结束后需要把标签上的属性删除,如果是普通指令,通过vm获取表达式的值,最终通过updater对象中的相关方法进行替换操作,最后也要把标签上的属性移除.这些都是在内存中进行的操作.最终无非就是把文档碎片对象重新放在html容器中
   * 
   * 
   * 
   * 
   * 
   * 
   */


 /**
  * 
  * 1. 模版语法
  *    Vue针对页面中的一些数据进行操作,从而实现页面的效果发生变化,先获取html的容器
  *    通过实例化Vue,然后进行配置对象的设置
  *    const vm = new Vue({}----配置对象)
  *    
  *    el------>设置选择器---->根据选择器获取html的容器对象
  *    data---->数据对象------>数据可以在html标签中使用
  *       data对象中都是属性, 属性如何在html标签中使用 ? 通过插值语法---->{{表达式}}
  *    数据变化---->页面变化
  *    mounted(){} 
  *    computed:{}
  *    watch:{}
  *    
  *    Model变化--->View变化,通过vm来实现,MVVM模式
  *    M-----数据Model
  *    V-----视图View
  *    VM----Vue的实例对象
  *    例子:  <p>{{msg}}</p>  html中使用了msg表达式,一定要在data中定义
  * 
  * 2. Vue中的指令
  *   v-if(v-else,v-else-if):用来控制页面中的某些标签显示或者隐藏(隐藏:DOM树中已经不存在)
  *     什么时候用? 设置一个标签显示或者隐藏,或者如果表达式有数据,则显示这个标签(项目中使用)
  *     里面使用的表达式都是布尔类型
  *     例子:  <p v-if="msg">{{msg}}</p> msg是有值的--->true  此时p就会显示,否则就不显示
  *   v-show,单独使用的,设置当前的html标签显示或者隐藏,v-show指令使用的表达式,也是布尔类型,如果为true则显示,否则隐藏,实际上控制的html标签的style中的display:none,另外,v-show如果隐藏了标签,该标签在DOM树中依然存在
  *     例子: <p v-show="msg">{{msg}}</p> 如果msg是有值的--->true  此时p就会显示,否则就不显示
  * 
  *   v-model:双向数据绑定----获取或者设置表单中的数据
  *   怎么使用? 用在表单标签上,获取标签标签中的数据,或者是设置该标签标签中的数据,此时可以使用v-model指令
  *   例子: <input type="text" v-model="msg" /> 前提是msg在实例化Vue的时候,data对象中定义了
  *    data:{msg:'小红'},如果在文本框中重新输入了内容: 小白,此时msg的值就是小白.
  *    常见表单标签:input标签(文本框,单选框,复选框),select标签,textarea标签
  *    <input type="checkbox" />
  *   <select v-model="3">
  *      <option value="1">北京</option>
  *      <option value="2">上海</option>
  *      <option value="3">天津</option>
  *      <option value="4">重庆</option>
  *      <option value="5">首尔</option>
  *      <option value="6">东京</option>
  *   </select>
  * 
  *   v-bind:强制数据绑定,强行的把一个数据存储到html标签的属性中(能够存储也可以获取)
  *     html标签属性(标签自带的属性或者自己定义的属性(自定义属性)<p class="cls"></p> class属性就属于html的自带属性,<p todo="todo1"></p>,todo属性是自定义属性)
  *  什么时候使用? 如果该标签中的属性是动态的,或者想要在这个标签的某个属性中存储动态的值的时候
  *     例子: <p v-bind:index="myIndex">{{msg}}</p> 此时index属性就可以存储myIndex这个表达式的值,myIndex表达式中存储了数据
  *    v-bind指令可以简化写法----> :属性名字="表达式"  例子: <p :key="id">{{msg}}</p>
  *   <p :class="{active:currentIndex===index}">真好</p>
  *    <Child :age="age" /> 强制数据绑定的方式 向子级组件Child中传入一个age属性,动态的值
  *    <Child :getName="getName"> 强制数据绑定的方式 向自己组件Child中传入一个回调函数,动态的数据
  *  
  *   
  *   v-on:事件绑定指令,为某个标签绑定对应的事件
  *   什么用?如果某个标签需要绑定事件监听,此时可以使用v-on这个指令
  *   例子: <p v-on:click="监听的回调函数"></p>,监听的回调函数需要在methods对象中进行定义
  *      简化的写法----->@事件名字="回调函数"
  *    标签中绑定事件的时候使用的都是浏览器自带的事件(系统事件),也可以绑定自定义事件(在项目中经常使用)
  *    例子:   <Header @addTodo="add"></Header>  addTodo就是自定义事件,add需要在methods对象中进行定义,自定义事件都在是组件中使用
  *       v-on指令绑定事件监听的时候,事件的后面可以直接写代码,不用回调函数也可以的(如果写回调函数,内部的代码很少,或者只有一行)
  * 
  *   原生事件和自定义事件
  *   DOM中,html标签中的事件,都是属于系统已经提前定义好的事件----原生事件
  *   一般情况都是针对组件而言
  *   原生事件:该事件的触发或者分发都是自动的,不需要人为的去分发
  *   原生事件: 在组件标签上使用的事件,是系统自带的,但是需要使用.native进行修饰
  *   自定义事件:自己定义的事件,或者组件上使用的系统自带的事件,没有使用.native进行修改
  *   .native在Vue的后台项目的第二天去讲
  * 组件标签:首先是一种说法, 组件当成标签去使用的时候,是以标签的形式进行使用,又是组件,又以标签的方式来体现,我们就叫:组件标签
  *    <Child />
  * 
  * 
  *   v-for:遍历数据的,可以遍历数组,也可以遍历对象
  *   什么使用? 如果需要把很多数据(数组,或者是对象)展示到页面中,此时可以使用v-for指令进行遍历数据的操作
  *   例子遍历数组: <li v-for="(item,index) in persons" :key="item.id"></li>  persons是一个数组 
  *    为了虚拟DOM遍历数据及展示数据的效率比较高,所以,设置key属性,item.id这个位置最好是唯一的标识(不会经常变化的值)
  *    item--->数组中每一项, index---->索引
  *   例子遍历对象:<li v-for="(value,key,index) in obj" :key="index"></li> obj 是一个对象
  *    value--->对象中属性的值,key---->代表的是对象中的属性名字,index---->索引
  *   
  *   v-for遍历数据的时候,如果只是需要某一项数据,不需要索引,此时可以省略索引的写法
  *   例子:  <li v-for="item in persons"></li>  persons是数组, item是数组中每一项  
  * 
  * 
  * 
  *   v-text: 用来展示数据的指令(普通文本内容,非html标签内容)
  *   什么使用? 一般在某一对标签中间需要展示文本内容的时候,可以使用该指令,相当于DOM操作中的innerText或者textContent属性的使用
  *    例子:  <p v-text="msg"></p>  msg需要在data中定义,并且是文本内容(非html内容) 
  *   v-text="msg"和插值语法{{msg}} 使用后的效果几乎相同
  * 
  *   v-html: 用来展示数据的指令(html标签内容)
  *   什么使用?如果需要在某一对标签中间展示html的相关内容,此时可以使用v-html这个指令
  *    例子: <p v-html="msg"></p> msg需要在data中定义,并且是html内容 ,此时打开页面就会展现a标签的效果,相当于DOM操作中的innerHTML
  *     data:{msg:'<a href="http://www.baidu.com">百度</a>'}
  * 
  *   事件参数对象  如果在标签中绑定了事件监听,同时需要在回调函数使用事件参数对象,那么在vue中可以传入$event(相当于DOM操作中的参数e或者event)
  *   事件修饰符: .prevent--->阻止浏览器的默认行为 .stop 阻止监视冒泡
  *   按键修饰符 .enter---或者----.13  是否按下了回车键,如果按下了回车则会触发该事件的回调函数
  *   事件修饰符和按键修饰符可以一起使用的  .enter.prevent
  *   属性属性符---->项目中讲解
  * 
  * 3. Vue中针对某些标签或者组件的样式操作class或者style
  *   标签的样式操作可以使用class或者style
  *   在vue中 样式的操作可以是动态的
  *    什么时候使用? 如果该标签的样式是动态的,此时可以使用:class或者:style
  *   例子: <p :class="myClass"></p>  myClass需要在data对象中定义 myClass:'cls' cls--->类样式的名字
  *        <p :class="{cls:isCls}"></p>  对象的写法,表示的是p标签是否要应用cls这个类样式,isCls是true,则就是应用,否则就是不应用,isCls是一个表达式,需要在data对象中定义,是一个布尔类型的值
  *        <p :class="[clsA,clsB]"></p> 数组的写法,表示的是p标签应用了多个类样式,clsA和clsB需要在data对象中定义,clsA::'cls1'  clsB:'cls2' 
  *        <p :class="myCls" class="cls2" ></p> 动态类样式和静态类样式一起使用的用法,myCls需要在data对象中定义
  *         myCls:'cls1'  ,最终页面中p标签就一起应用了 cls1 和 cls2 两个类样式
  * 
  *    在vue中,样式的操作不仅可以使用class也可以使用style
  *    什么使用使用style? 样式比较少(三个以下)
  *    例子:
  *         <p :style="{color:myColor,backgroundColor:bgColor}"></p>  myColor需要在data中定义,并且存储的是一个颜色值 myColor:'green'  bgColor:'yellow'
  *         <p :style="[myColor1,myBgColor1]"></p> 需要在data对象中定义,myColor1:{color:'yellow'},myBgColor:{backgroundColor:'red'}
  * 
  *   
  * 4. Vue中的计算属性和监视
  *   计算属性:当某个属性的数据发生变化的时候,如果相关联的数据也会发生变化,此时可以使用计算属性(如果html模版中的表达式可以回涉及到更过的逻辑代码的时候,此时可以通过计算属性操作来简化代码)
  *   监视(侦听器):当数据发生变化,需要做更多的操作的时候,此时使用监视
  *   如果该需求通过计算属性实现起来有些麻烦,此时可以使用监视来实现
  * 
  *  计算属性:需要在创建Vue实例的时候,内部的配置对象中通过computed对象来设置
  *  例子:  实例化Vue的配置对象中, 
  *       computed:{
  *          msg:{  设置(setter)和获取(getter)
  *             get(){ 获取该msg属性值的时候会进来,或者做相关的操作},
  *             set(){ 设置该msg属性值的时候会进来,或者做相关的操作}
  *          }
  *       }
  *       有的时候仅仅需要获取该属性的值,那么上面的代码可以进行简化书写
  *        computed:{ 
  *           msg 这个计算属性只有get,是没有set,如果外部设置了msg的值,报错
  *           msg(){} 相当于上面的代码中的get的书写的简写方式
  *        }
  *  监视(侦听器):当数据发生变化,需要做更多的操作的时候,此时使用监视
  *  watch : 
  *   用法: 可以在实例化Vue的时候在配置对象中设置watch
  *        还可以通过Vue的实例对象.watch() 进行设置
  *   watch:{
  *      msg:(){
  *        如果msg这个数据发生了变化,就会进入到当前的这个方法中,执行一些逻辑的代码
  *        需求: msg数据发生变化,立刻的缓存到浏览器中
  *     }
  *   }
  * 
  *   监视,可以进行深度的监视,涉及到当前的数据如果是数组或者是对象,内部还有其他的深层次的数组或者是对象,如果需要无论多么深的嵌套的数据发生变化,都要进行一系列的操作,此时可以使用deep:true,进行深度监视
  *  watch:{
  *   msg:{
  *      deep:true,
  *      handle:函数(){逻辑操作}
  *    }
  *  }
  *  
  * 
  * 5. Vue中实现异步的操作
  *    需要发送请求和后台进行交互,
  *    插件: vue-resource ---vue2.x之前使用的,需要先安装,再引入,声明使用
  *    main.js中,引入
  *    import VueResource from 'vue-resource'
  *    声明使用插件
  *    Vue.use(VueResource)
  *    每个组件中的组件的实例对象,就有一个$http对象
  *    组件内部: this.$http.get(地址)---->发送请求,配合.then和.catch来进行使用,
  *    vue2.x之后: axios 也可以发送异步请求
  *    npm install axios 先安装
  *    在需要发送请求的组件或者文件引入即可使用
  *    import axios from 'axios'
  *    axios.get(地址)---->发送请求,配合.then和.catch来进行使用,
  *   
  *   解决异常的处理:try-catch
  * 
  * 6. Vue中的路由
  *   通过vue-router实现单页面应用会更加的方便(SPA)
  *   路由器:管理路由的
  *   路由:是指一种映射关系,地址和组件的联系(在浏览器的地址栏中,/add --->显示Add组件内容)
  *   使用步骤:
  *   安装  npm install vue-router
  *    在需要使用路由的配置文件中引入vue-router,然后声明使用插件,暴露该路由器对象
  *    import VueRouter from 'vue-router'   引入
  *    Vue.use(VueRouter)  声明使用插件
  *    创建路由器对象,并暴露出去
  *    export default new VueRouter({
  *       mode:'history',  设置浏览器的地址栏中是否会出现#
  *       routes:[
  *          注册路由对象,设置地址和组件的关系
  *          {
  *             path:'/add',
  *             component:Add   前提是在当前文件中已经引入了Add组件
  *          }
  *       ]
  *    })
  *    // 引入Vue和vue-router已经深度集成了(官方),只要实例化了路由器在创建Vue的实例的时候,把路由器注册进来,组件中都可以正常的使用了
  *   main.js中,注册一下路由器对象(插入进去)
  * 
  *  在组件中使用路由
  *  <router-link> ---路由链接--->最终在页面中变成a标签
  *  <router-view>----路由视图--->最终会把当前这个组件中内容全部的展示到页面中
  *  声明式路由---不需要通过js代码来实现路由的跳转
  *  编程式路由---需要通过js代码来实现路由的跳转
  *  路由可以设置重定向的操作；当我们访问根路径的时候,/--->可以设置重新定向的操作,默认访问/路径,可以显示其他路径的对应组件内容
  * 路由跳转的过程中可以传递参数(params的方式传参)
  * 需要在注册路由的时候,使用:的方式进行占位
  *  例子:
  *    注册路由
  *    {
  *       path:'/地址/:变量名',
  *       component:组件名字
  *    }
  * 
  *    router-link 中的to="/地址/参数值" ---->页面中点击这个链接的时候,路由就会跳转,并且传递参数数据
  * 路由组件中如何获取上面的方式传递过来的参数?
  *  路由一旦注册成功,只要是路由组件,内部的组件的实例对象中必然会出现$router属性和$route属性
  *  $router属性也是一个路由器对象,用来实现编程式路由 .push()或者.replace()实现路由跳转
  *  $route属性也是一个路由信息对象,获取路由跳转的时候相关的信息, .params获取里面的路由跳转的时候传递的参数数据
  * 
  * 路由有级别:一级路由,二级路由,三级路由......
  *   
  * 
  * 
  * 7. 组件通信：组件和组件之间相互传递数据
  *    组件的关系: 父子关系(组件嵌套---直接父子关系---间接父子关系),兄弟关系(平级)
  *    props: 父子组件传递数据
  *    自定义事件: 父子组件传递数据
  *    PubSub(消息订阅和发布) :任意组件之间进行通信的,  是独立的一个插件(和Vue没有关系),需要先安装，引入,使用
  *    事件总线(全局事件总线): 任意组件之间进行通信(原型实现)
  *       把Vue的实例对象存储到了Vue的prototype上的某个属性中,组件和Vue的实例对象关系是一种继承关系
  *    插槽: 父子组件之间传递数据(命名插槽---具名插槽),普通插槽和作用域插槽(项目后期)
  *    Vuex: 任意组件之间传递数据
  * 
  * 8. vuex:是一个工具,是一个插件,是被深度集成到Vue中的一个插件,还是一个专门管理状态数据一种模式
  *    Vuex可以干什么: 统一的集中式的管理状态数据,实现任意组件之间进行通信 (作用)
  *    Vuex怎么用? 
  *       安装: npm install vuex 
  *       引入: import Vuex from 'vuex'
  *       声明使用插件: Vue.use(Vuex)
  *       实例化Store对象,并暴露出去  export default new Vuex.Store({})
  *       需要在main.js进行注册  ,实例化Vue的内容, store 进行注册
  *     注意: 通常情况Vuex的相关的代码会放在一个单独的目录(和路由器的定义很像)
  *     vuex目录中的store.js文件中进行实例化vuex
  *     也可以
  *     store目录中的index.js文件中进行实例化vuex
  *     以上是暂且咱们这么规定的,到了公司里 用的是公司的规范
  *    
  *    Vuex什么时候用? 需要管理的状态数据比较多,很多组件都需要使用这些 状态数据进行通信,老大说什么时候用就什么时候用
  * 
  *   Vuex中的几个重要对象
  *   state: 包含了多个状态数据的对象
  *   mutations:包含了多个直接修改状态数据的方法的对象
  *      mutations中的每个方法都可以叫mutation
  *      每个mutation都有自己的type,当前这个mutation的方法名字就是type,type可以定义成常量
  *      每个mutation中都可以传入一个state参数,用来获取或者修改状态数据
  *   actions: 包含了多个间接修改状态数据的方法的对象
  *     actions中的每个方法都可以叫action
  *     每个action中都可以写比较多的逻辑代码,或者是异步操作的代码
  *     每个action中都可以传入一个context对象,该对象和store对象很像,内部可以调用state,getters,或者commit,或者dispatch
  *    一般情况action中如果要修改状态数据,使用的是commit
  *   getters: 包含了多个状态数据的计算属性的get方法的对象
  * 
  *  外部组件中如果想要修改状态数据,可以直接通过this.$store.commit('mutation的type')
  *  外部组件中如果想要修改状态数据,可以直接通过this.$store.dispatch('action的名字')
  * 
  * 
  * 
  * 
  * 
  */
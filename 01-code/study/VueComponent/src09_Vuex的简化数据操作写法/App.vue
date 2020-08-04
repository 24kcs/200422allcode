<template>
  <div>
    <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <!--加的操作-->
    <button @click="increment">increment</button>
    <!--减的操作-->
    <button @click="decrement">decrement</button>
    <!--奇数的时候加的操作-->
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <!--异步的加的操作-->
    <button @click="incrementAdync">incrementAsync</button>
  </div>
</template>
<script>
// 引入vuex的辅助函数
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'App',
  // 计算属性
  // computed: {
  //   // 简化组件中获取状态数据及相关的计算属性的代码的写法
  //   count() {
  //     // 为了在组件中简化获取状态数据的写法,可以把状态数据的代码通过计算属性的方式来进行简化
  //     return this.$store.state.count
  //   },
  //   // 简化evenOrOdd的写法
  //   evenOrOdd(){
  //     return this.$store.getters.evenOrOdd
  //   }

  // },
  // 计算属性
  computed: {
    // 辅助函数,拆包
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
    // {count:function(){return this.$store.state.count}}
    // count(){return this.$store.state.count}
  },
  methods: {
    // 按钮的回调函数
    // 提交mutation的
    // increment() {
    //   // 通过commit提交对应的mutation
    //   this.$store.commit('INCREMENT')
    // },
    // decrement() {
    //   // 通过commit提交对应的mutation
    //   this.$store.commit('DECREMENT')
    // },
    // 什么时候可以用下面的写法,方法,方法中只有提交的操作的代码
    ...mapMutations({increment:'INCREMENT',decrement:'DECREMENT'}),
    ...mapActions(['incrementOrOdd','incrementAdync'])

    // // 提交action的
    // incrementOrOdd() {
    //   // 通过dispatch提交的action
    //   this.$store.dispatch('incrementOrOdd')
    // },
    // incrementAdync() {
    //   // 通过dispatch提交的action
    //   this.$store.dispatch('incrementAdync')
    // },
  },
}


// 打包和拆包-----三点运算符而言--- es6中代码

// var arr1 = [10,20,30,40]
// // 拆包
// var arr2 =[100,200,...arr1]
// console.log(arr2) 

// var obj1 ={
//   name:'飞哥',
//   age:78
// }
// var obj2 ={
//   gender:'女',
//   ...obj1
// }
// console.log(obj2)

// 打包:
// var arr1 = [10,20,30]
// function f1(...args){
//   console.log(args)
// }
// f1(arr1)

// 拆包
// var obj1 = {
//   sayHi:function(){
//     console.log('哈尼额谁有')
//   },
//   eat:function(){
//     console.log('今天晚上吃油炸臭豆腐')
//   }
// }
// var obj2={
//   ...obj1
// }
// obj2.sayHi()

</script>
<style scoped>
</style>
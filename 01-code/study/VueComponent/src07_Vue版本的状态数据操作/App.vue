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
export default {
  // 设置当前组件的名字,1)标识(很多的组件,每个组件有自己的名字),2)如果涉及到组件要进行全局注册的时候要使用
  name: 'App',
  // 数据(状态会发生变化)----状态数据(当前的这个数据的值会发生变化(状态会发生变化))
  // 该数据的状态会发生变化,从而,我们把data对象中的数据叫:状态数据
  data() {
    return {
      count: 0,
    }
  },
  // 计算属性(当模版中或者data中的数据发生了变化,相关的一些数据的状态也会自动的发生变化)
  computed: {
    // 最终的计算结果会赋值(返回)给evenOrdd
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    },
  },
  // 专门负责书写回调函数(方法)
  methods: {
    // 加的操作
    increment() {
      this.count++
    },
    // 减的操作
    decrement() {
      this.count--
    },
    // 只有数据是奇数的时候,才能够进行加的操作
    incrementOrOdd() {
      // 判断的操作
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    // 异步的加的操作
    incrementAdync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
}
</script>
<style scoped>
</style>
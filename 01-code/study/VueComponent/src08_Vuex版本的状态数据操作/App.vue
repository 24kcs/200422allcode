<template>
  <div>
    <h2>点击次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
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
  name: 'App',
  methods: {
    // 按钮的回调函数
    increment() {
      // 提交了action
      // this.$store.dispatch('increment')
      // 提交mutation的方式修改状态数据
      this.$store.commit('INCREMENT')
    },
    decrement() {
      // 提交了action
      // this.$store.dispatch('decrement')
      // 提交mutation
      this.$store.commit('DECREMENT')
    },
    incrementOrOdd() {
      // 提交action
      this.$store.dispatch('incrementOrOdd')
    },
    incrementAdync() {
       this.$store.dispatch('incrementAdync')
    }
  }
}
</script>
<style scoped>
</style>
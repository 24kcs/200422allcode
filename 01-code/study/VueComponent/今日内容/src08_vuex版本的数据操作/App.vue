<template>
  <div>
    <h2>点击次数{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">increment</button>
    <button @click="incrementOrOdd">increment</button>
    <button @click="incrementAsync">increment</button>
  </div>
</template>
<script>
export default {
  name: 'APP',
  methods: {
    increment() {
      this.$store.commit('INCREMENT')
    },
    // 减得操作
    decrement() {
      this.$store.commit('DECREMENT')
    },
    // 奇数的加操作
    incrementOrOdd() {
      this.$store.dispatch('incrementOrOdd')
    },
    // 异步的加
    incrementAsync() {
       this.$store.dispatch('incrementAsync')
    },

    // 加的操作
    // increment(){
    //   this.count++
    // },
    // // 减得操作
    // decrement(){
    //   this.count--
    // },
    // // 奇数的加操作
    // incrementOrOdd(){
    //   if(this.count%2!==0){
    //     this.count++
    //   }
    // },
    // // 异步的加
    // incrementAsync(){
    //   setTimeout(() => {
    //     this.count++
    //   }, 1000);
    // }
  },
}
</script>
<style scoped>
</style>
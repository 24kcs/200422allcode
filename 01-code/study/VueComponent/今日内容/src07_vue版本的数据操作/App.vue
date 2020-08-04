<template>
  <div>
    <h2>点击次数{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">increment</button>
    <button @click="incrementOrOdd">increment</button>
    <button @click="incrementAsync">increment</button>
  </div>
</template>
<script>
export default {
  name:'APP',
  data () {
    return {
      count:0
    }
  },
  computed: {
    evenOrOdd(){
      return this.count%2===0?'偶数':'奇数'
    }
  },
  methods: {
    // 加的操作
    increment(){
      this.count++
    },
    // 减得操作
    decrement(){
      this.count--
    },
    // 奇数的加操作
    incrementOrOdd(){
      if(this.count%2!==0){
        this.count++
      }
    },
    // 异步的加
    incrementAsync(){
      setTimeout(() => {
        this.count++
      }, 1000);
    }
  }
}
</script>
<style scoped>
</style>
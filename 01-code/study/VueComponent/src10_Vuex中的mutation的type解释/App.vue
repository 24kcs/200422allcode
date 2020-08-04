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
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
// 引入vuex的辅助函数
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
// 引入mutation的types
import {INCREMENT,DECREMENT} from './vuex/mutation-types.js'
export default {
  name: 'App',
  computed: {
    // 获取状态数据
    ...mapState(['count']),
    // 获取计算属性
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    // 提交mutation
    ...mapMutations({increment:INCREMENT,decrement:DECREMENT}),
    // 提交action
    ...mapActions(['incrementOrOdd','incrementAsync'])
  }
}

</script>
<style scoped>
</style>
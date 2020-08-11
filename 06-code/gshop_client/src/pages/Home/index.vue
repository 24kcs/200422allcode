<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入ListContainer 组件
import ListContainer from './ListContainer'
// 引入TodayRecommend 组件
import TodayRecommend from './TodayRecommend'
// 引入Rank 组件
import Rank from './Rank'
// 引入Like 组件
import Like from './Like'
// 引入Floor 组件
import Floor from './Floor'
// 引入Brand 组件
import Brand from './Brand'

export default {
  name: 'Home',
  // 注册组件
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted () {
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
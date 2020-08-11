<template>
  <div class="swiper-container" id="swiper1" ref="sw1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入swiper对象及样式文件
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props:{
    carouselList:Array // 接收的是数组的数据
  },
   // 1. 直接使用定时
  // 2. 监视+定时器的方式完美的解决了swiper的bug
  // 3. 监视+$nextTick(回调)
  watch: {
    carouselList() {
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(() => {
        // DOM更新后,再执行这里的内容
        var mySwiper = new Swiper(this.$refs.sw1, {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      })
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<template>
  <div class="swiper-container" ref="sw2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
// 引入vuex的辅助函数
import { mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  computed: {
    ...mapGetters(['skuImageList']),
  },
  watch: {
    skuImageList: {
      handler: function () {
        // 优化操作---如果数组数据是0的时候,没有必要创建swiper的对象
        if (this.skuImageList.length === 0) return

        // console.log(this.carouselList.length+'=========watch')
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          // DOM更新后,再执行这里的内容
          var mySwiper = new Swiper(this.$refs.sw2, {
            slidesPerView:5, // 当前这一块屏中显示5个图片
            slidesPerGroup:2, // 每次移动2张图片
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
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
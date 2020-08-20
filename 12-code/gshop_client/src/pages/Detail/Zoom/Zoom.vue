<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <!--遮挡层宽度-->
    <div class="event" ref="event" @mousemove="moveHandle"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <!--遮挡层div-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  // 组件加载后的生命周期回调
  mounted() {
    // 获取遮挡层的宽度---400--小图的宽度/2---->200
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    // 鼠标移动的事件
    moveHandle(event) {
      // 获取鼠标移动的时候的横纵坐标
      const { offsetX, offsetY } = event
      // 获取当前的遮挡层的宽度---200
      const maskWidth = this.maskWidth
      // 获取遮挡层的div对象
      const maskDiv = this.$refs.mask
      // 获取大图的div对象
      const bigImg = this.$refs.bigImg
      let left = offsetX - maskWidth / 2
      let top = offsetY - maskWidth / 2
      // 横坐标的限定
      left = left < 0 ? 0 :( left > maskWidth ? maskWidth : left)
      // 纵坐标的限定
      top = top < 0 ? 0 : top > maskWidth ? maskWidth : top
      // 设置遮挡层的left和top
      maskDiv.style.left = left + 'px'
      maskDiv.style.top = top + 'px'
      // 设置大图的移动操作
      bigImg.style.left = -left * 2 + 'px'
      bigImg.style.top = -top * 2 + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background-color: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
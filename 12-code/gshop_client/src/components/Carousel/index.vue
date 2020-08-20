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
  props: {
    carouselList: Array, // 接收的是数组的数据
  },

  /*
    1.
      怀疑当前的轮播图组件Carousel没有加载成功,所以,在mounted回调中测试,如果能够执行三次,那么就说明组件是加载成功了
      为什么会执行三次?
      当前的这个Carousel组件被使用了三次(ListContainer组件一次,Floor组件两次)
    2.
      怀疑轮播图组件在使用的过程中,传入进来的数据有问题,如果把轮播图的数据正常的传入进来,轮播图肯定有效果,否则没有效果,在mounted回调中测试传入进来的数据---数组的长度
      大轮播图的数据是4个,floor楼层组件中的小轮播图的数据是3个和3个
      猜测(具体的分析后) 测试的结果应该是: 4 3 3,
      结论(不知什么原因) 真实的结果竟然是: 0 3 3  出乎意料
      为什么? 要么就是分析的结果是错误,要么就是浏览器执行的结果是错误
      浏览器的执行结果是对的,我们分析的也是没有问题的(忽略监视了)
      原因:
        ListContainer组件在使用Carousel轮播图组件的时候,传入的轮播图的数据数组是4个数据,打印出来的结果应该就是4个,实际上在Carousel组件加载后打印出来的是0个，carouselList.length---->0
        结果通过watch监视,输出carouselList.length 结果竟然是4个

        真实结果是: 0 3 3

        分析结果是: 4 3 3


        分析的结果和浏览器的结果是不同的,通过监视发现数组的数据的长度竟然是4 ,而且watch竟然执行了1次
        需要分析的问题: 
        mounted中的代码什么时候?
          如果当前的组件使用了(其他的组件使用了该组件),当前的组件中的所有的DOM标签全部的加载完毕(渲染完毕),那么此时mounted中的代码才会执行
        watch中的代码什么时候执行?
          如果监视的数据发生了变化,此时watch中的代码才会执行(也就是说如果监视的数据没有发生变化,那么watch中的代码就不会执行)

        ListContainer组件中在使用Carousel组件的时候,传入了一个banners给carouselList,mounted中执行的时候,说明界面已经完毕了,此时,carouselList的数据是0,后来数据肯定是变化了,也就是说一开始的时候carouselList数组的数据是0,后来数据由0个变成了4个,这个时候,watch中的代码会立刻执行，就会创建swiper对象,就说明轮播图有效果了
        为什么一开始的数据是0个?,后来是怎么变成的4个?

        为什么mounted中出现了两次的 3个数据,为什么watch就执行了一次?


        组件到底是如何创建的?组件内部的html都渲染完毕后此时才会执行mounted,然后,组件就是已经加载完毕了
        Home组件中有ListContainer组件,ListContainer组件中有Carousel
        如果父级组件中有子级组件,子级组件渲染完毕后,父级组件才开始渲染,父级组件的mounted中的代码才执行

        大轮播图  0 ------->4 原因
        ListContainer中使用Carousel组件的时候,此时,banners的数据还没有呢(因为外部的父级组件Home的mounted还没有开始执行呢,此时的这个请求,可能正在发送中,也可能正在响应回来的路上,但是,这个轮播图的数据,就是还没有回来呢),既然banners的数据还没有呢,但是Carousel组件也应该在渲染(在加载),加载完毕了,但是此时还没有数据,carouselList数组此时是在没有数据的情况下,Carousel组件就已经渲染完毕,此时这里的mounted中输出carouselList数组的数据就是0个,此时数据也没有变化,watch中就不会执行(swiper对象就不会创建出来),但是,就在那一刹那,发送的ajax的请求,响应回来的数据可能已经有了,那么这个数据有了之后,banners就有了数据,也就意味着carouselList数组的数据就有了,就说明这个数据变化了,变化了之后,watch立刻执行,swiper对象创建出来了,界面中轮播图有了效果了

         <Carousel :carouselList="banners" /> 这个方式,如果banners没有数据,是不会影响Carousel组件的创建的


         小轮播图  3  3 ----原因
         一开始的时候Home组件中 用到了 <Floor v-for="(floor,index) in floors" :key="floor.id" :floor="floor" />
         此时的Home组件的mounted中的异步请求代码还没有执行,因为Floor组件需要渲染完毕后,才能执行mounted中的代码,才能够发送异步的请求,获取相关的数据.Floor组件中用到了v-for指令,问题就在v-for指令上,条件渲染指令,也就是不满足条件,该组件是不会渲染的,也就是说此时floors数组如果没有数据,那么Floor组件就不会渲染,此时的mounted中的异步请求开始执行,正在获取数据,一旦数据获取到了.floors有数据了,那么Floor组件开始渲染,渲染的时候向这个组件内部传递了floor对象,对象中有carousellist数组,那么此时Floor组件内部用到了Carousel组件,并且向carouselList中传递了carousellist数组数据,那么Carousel组件第一次开始被渲染,里面的carouselList数组一开始就有了数据就是3,所以,mounted中显示的数组的长度数据就是3,而且该组件用到了两次,所以,结果是3,3,既然如此这个Carousel组件就渲染了一次(carouselList数组的数据没有变化过),所以,watch中的代码不会执行,所以,mounted中输出的数据是0,3,3,watch中的结果是4,所以,watch中的代码没有执行,那么swiper对象没有创建,所以,小轮播图没有效果

         小总结:mounted中的代码执行三次,结果是0 3 3
               watch中的代码执行一次, 结果是4 
              只有大轮播图在渲染的时候数据变化了
              小轮播图在渲染额时候数据没有变化

        大总结:
          组件在创建的时候(创建的过程中),如果使用的强制数据绑定的方式,绑定的数据有值或者无值,都不会影响组件的创建
          组件中如果使用了v-for条件渲染指令,那么在遍历的时候,如果不满足v-for的条件,该组件是不会被渲染的
          <Carousel :carouselList="banners" />
          <Floor v-for="(floor,index) in floors" :key="floor.id" :floor="floor" />
          组件中的mounted回调只会一次,在该组件渲染完毕后才执行
          组件中的watch中代码如果要执行,前提是监视的数据发生了变化
          轮播图的bug:第一次使用该组件的时候,传入的banners数据是0,后来请求回来后有了数据,banners数据变化,watch中的代码就会执行,创建swiper对象,有轮播图的效果
          第二次和第三次使用该组件的时候,传入的floor.carousellist数据是直接请求后响应回来后已经存在的数据,Carousel组件会直接接渲染,watch中数据没有变化过,所以,没有效果(小轮播图)

          数据变化:渲染组件的时候，请求发送中,没有响应回来数据,渲染了组件,数据回来了,组件中的数据变化了,就会进入监视(Floor组件是一开始就有数据,watch不会执行)


          根据分析及代码执行的结果来解决问题
          大轮播图没有问题,因为数据变化了,watch中的代码执行了   0  4
          小轮播图有了问题,因为数据没变化,watch中的代码没执行   0--->3 0----> 3

          解决: 要么让数据变化,要么让watch代码执行

          归根结底:watch就执行了一次,如果能够多执行几次,就可以解决

          最终:只要能够让watch一开始的就执行一次即可
          immediate：true 即可











    




  
  */
  // 界面加载后的生命周期回调
  mounted() {
    // 界面加载后(这里的代码就执行一次)
    // console.log(this.carouselList.length+'=========mounted')
  },

  // 1. 直接使用定时
  // 2. 监视+定时器的方式完美的解决了swiper的bug
  // 3. 监视+$nextTick(回调)
  watch: {
    carouselList: {
      handler: function () {
        // 优化操作---如果数组数据是0的时候,没有必要创建swiper的对象
        if(this.carouselList.length===0) return
        
        // console.log(this.carouselList.length+'=========watch')
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
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
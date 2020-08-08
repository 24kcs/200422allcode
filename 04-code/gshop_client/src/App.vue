<template>
  <div>
    <!--使用组件-->
    <Header/>
    <!--路由视图,就可以显示对应的路由组件内容-->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>
<script>
// 引入Header
import Header from '@/components/Header'
// 引入Footer
import Footer from '@/components/Footer'
export default {
  name: 'App',
  // 注册组件
  components:{
    Header,
    Footer
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
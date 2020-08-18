<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>谷粒商城欢迎您！</p>
          <!--自己加的-->
          <p v-if="userInfo.name">
            <span>{{userInfo.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <!-- <a href="###" class="register">免费注册</a> -->
            <!--声明式路由跳转,路由链接进行跳转-->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt />
        </a>-->

        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
       
        </form>
      </div>
    </div>
  </header>
</template>
<script>
// 引入vuex的辅助函数
import {mapState} from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      keyword: '', // 文本框中输入的数据
    }
  },
  computed: {
    ...mapState({
      userInfo:state=>state.user.userInfo
    })
  },
  // 方法对象
  methods: {
    // 按钮的点击事件的回调函数,----去Search界面
    toSearch() {
      // 路由跳转
      // 传入一个空的成功回调
      // this.$router.push('/search',()=>{})
      // 传入了一个空的成功和空的失败的回调函数
      // this.$router.push('/search',()=>{},()=>{ })
      // 传入一个空的失败的回调
      // this.$router.push('/search',undefined,()=>{ })
      // 使用.then和.catch
      // this.$router.push('/search').then(()=>{}).catch(()=>{})
      // 使用一个catch页可以解决
      // this.$router.push('/search').catch(()=>{})
      // 以上这些方式虽然都可以解决路由跳转的bug,但是,不方便,所以,都不用

      // 就这么写
      // this.$router.push('/search')

      // 编程式路由跳转及传参
      // 路由跳转的同时把文本框中输入的数据传递到search界面
      //===============================下面的两种方式都是以字符串的写法来进行跳转及传参
      // params的方式传参
      // this.$router.push(`/search/${this.keyword}`)
      // query的方式传参
      // this.$router.push(`/search?keyword=${this.keyword}`)
      //===============================下面的两种方式都是以对象的写法来进行跳转及传参
      // query的方式以对象的写法进行传参
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
      // params的方式以对象的写法进行传参
      // this.$router.push({name:'search',params:{keyword:this.keyword}})

      // 跳转无论是否需要传递参数---params的方式
      // 获取path 和 query 参数
      const { path, query } = this.$route
      if (this.keyword) {
        // 判断当前的路径中是否有/search
        if (path.indexOf('/search') === 0) {
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
            query,
          })
        } else {
          // 有数据
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
          })
        }
      } else {
        // 判断当前的路径中是否有/search
        if (path.indexOf('/search') === 0) {
          this.$router.push({ name: 'search', query })
        } else {
          // 没有数据
          this.$router.push({ name: 'search' })
        }
      }
    },
    // 退出操作
    async logout(){
      // 提示信息
      if(window.confirm('您确定退出吗')){
        try {
          await this.$store.dispatch('logout')
        } catch (error) {
          alert(error.message)
        }
      }
      
    }
  },
  // 界面加载后的生命周期回调
  mounted() {
    // 自定义事件,而且绑定到事件总线中
    this.$bus.$on('removeKeyword', () => {
      this.keyword = ''
    })
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
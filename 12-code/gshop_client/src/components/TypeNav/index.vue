<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="showFirst" @mouseleave="hideFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" @click="toSearch" v-if="isShowFirst">
            <div class="all-sort-list2">
              <!--遍历一级分类-->
              <div
                class="item"
                :class="{item_on:currentIndex===index}"
                @mouseenter="showSubCategorys(index)"
                v-for="(c1,index) in baseCategoryList"
                :key="c1.categoryId"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <a href="javascript:;" @click="toSearch">{{c1.categoryName}}</a> -->
                  <!-- <a href>{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="{path:'/search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <!--遍历二级分类-->
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <a href="javascript:;" @click="toSearch">{{c2.categoryName}}</a> -->
                        <!-- <a href>{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="{path:'/search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <!--遍历三级分类-->
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                          <!-- <a href="javascript:;">{{c3.categoryName}}</a> -->
                          <!-- <a href="javascript:;" @click="toSearch">{{c3.categoryName}}</a> -->
                          <!-- <a href>{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="{path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入lodash
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -2, // 用来存储有高亮显示的分类的索引
      isShowFirst: true, // 表示的是:当前的分类列表默认是显示的
    }
  },
  // 计算属性
  computed: {
    // 获取三级分类列表数据
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  methods: {
    // 鼠标移动的事件
    showSubCategorys: throttle(function (index) {
      // 先判断currentIndex是不是默认值-2,然后再进行赋值操作
      if (this.currentIndex !== -2) {
        this.currentIndex = index
      }
    }, 300),
    // 点击分类信息实现路由跳转操作
    toSearch(event) {
      // console.log(event.target)
      // console.log(event.target.tagName)
      const target = event.target
      if (target.tagName === 'A') {
        // console.log(target.dataset)
        // 必然是点击a标签进行路由的跳转---传递分类的名字数据/1级分类的id/2级分类的id/3级分类的id/
        // console.log('此时点击的就是a标签')
        // 获取分类的名字/1级id/2级id/3级id
        const {
          categoryname,
          category1id,
          category2id,
          category3id,
        } = target.dataset
        const query = { categoryName: categoryname }
        // 判断
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 获取此时的路由的地址及params参数
        const { path, params } = this.$route
        // 判断当前的路由的路径(地址)是否有/search
        if (path.indexOf('/search') === 0) {
          // 此时有/search地址
          this.$router.replace({ path, query, params })
        } else {
          // 此时没有
          // 路由跳转到search界面,同时携带参数数据
          this.$router.replace({ path: '/search', query })
        }

        // 跳转操作---->search界面() ,当前点击的首页中的TypeNav组件, 进入到Search界面,也有TypeNav组件
        this.isShowFirst = false
        this.currentIndex = -2
      }
    },
    // 鼠标进入事件--显示分类列表
    showFirst() {
      this.isShowFirst = true
      this.currentIndex = -1
    },
    // 鼠标离开事件--隐藏分类列表
    hideFirst() {
      this.currentIndex = -2 // 先隐藏右侧的二级分类和三级分类的这一块
      // 先判断是不是首页离开
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    },
  },
  // 界面加载后的生命周期回调
  mounted() {
    // 判断当前的路由的地址是不是/---首页
    if (this.$route.path !== '/') {
      // 此时不是首页来使用该组件---TypeNav,既然不是首页,那么分类列表就隐藏
      this.isShowFirst = false
    }
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.move-enter-active,&.move-leave-active{
        transition: all .3s;
      }
      &.move-enter,&.move-leave-to{
        opacity:0;
        height:0;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
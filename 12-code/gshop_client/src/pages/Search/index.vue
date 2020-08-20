<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="javascript:;">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类的名字-->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!--搜索关键字的名字-->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!--品牌的id和品牌的名字-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>
            <!--平台属性数据-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector组件,内部展示的是品牌和平台属性数据-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--details-->
        <div class="details clearfix">
          <!--显示的是排序的相关操作内容-->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:;">综合{{getOrderIcon('1')}}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">价格{{getOrderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇⬆</a>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <!--多个商品的信息数据-->
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a> -->
                    <!--点击图片有路由跳转的功能,router-link可以实现-->
                   <router-link :to="`/detail/${goods.id}`"> 
                   <!-- <img :src="goods.defaultImg" /> -->
                   <img v-lazy="goods.defaultImg" />
                   </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!--点击连接有路由跳转的功能,router-link可以实现-->
                    <!-- <a href="javascript:;" :title="goods.title">{{goods.title}}</a> -->
                    <router-link :title="goods.title" :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页内容-->
          <!--
            当前的分页组件需要传入的数据
            total: 所有商品的总数量
            productList:对象中有总的商品数量
            goodsList:数组,是当前这个页面中的总的商品数据,该数组中数据的个数是这一页中的商品数量

            showPageNo: 当前的连续页码数,表示的是连续的页码的数量(一般情况连续的页码都是奇数的)

            pageNo: 当前默认的页码,比如: pageNo:1 代表的是当前的第一页

            pageSize: 每页显示的数量(每一页商品的条数),如:当前每一页显示3条数据
          -->
          <Pagination :pageConfig="{total:productList.total,showPageNo:5,pageNo:options.pageNo,pageSize:options.pageSize}" @changeCurrentPage="getproductList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入该组件---品牌的展示及平台属性的展示
import SearchSelector from './SearchSelector/SearchSelector'
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 专门负责api接口函数中需要的参数的
      options: {
        category1Id: '', // 一级分类的id值
        category2Id: '', // 二级分类的id值
        category3Id: '', // 三级分类的id值
        categoryName: '', // 分类的名字
        // trademark: '', // 品牌    '品牌的id:品牌的名字'  如:'246:诺基亚'
        order: '1:desc', // 排序  1--->综合,2--->价格  desc--->降序, asc--->升序
        pageNo: 1, // 当前显示第几页的数据,默认是第一页
        pageSize: 10, // 每页显示几条数据
        keyword: '', // 文本框中输入的搜索关键字
        props: [], // 平台属性数据 ['平台属性的id:平台属性值:平台属性名字'] ,如:['1353:骁龙730G:CPU型号']
      },
    }
  },
  computed: {
    // 状态数据中的商品信息数据productList对象(暂且仅仅是获取过来,暂时不用)
    ...mapState({
      productList: (state) => state.search.productList,
    }),
    // 获取的是商品信息数组数据goodsList数组
    ...mapGetters(['goodsList']),
  },
  // 此时浏览器中参数数据变化了,但是路由没有重新跳转,请求也没有重新的发送,所以,没有效果
  // 路由跳转: a--->b 此时就是跳转了  b---->b 此时不会重新跳转
  // 从当前的b路由跳转到b路由,没有必要重新渲染整个界面
  watch: {
    $route(to, from) {
      // to: 对象$route对象,目标路由信息对象,要去哪里
      // from: 对象$route对象,从哪个路由来的路由信息对象
      const { query, params } = to
      const options = {
        ...this.options,
        category1Id: '', // 重置
        category2Id: '', // 重置
        category3Id: '', // 重置
        categoryName: '', // 重置
        ...query,
        ...params,
      }
      this.options = options
      this.getproductList()
    },
  },

  // 界面加载后的生命周期回调
  mounted() {
    // 获取路由跳转的时候传入进来的参数(有可能是params的方式也有可能是query的方式)
    const { query, params } = this.$route
    // 更新options对象中的参数数据(一级id,二级id,三级id,分类名字,关键字)
    const options = {
      ...this.options,
      ...query,
      ...params,
    }
    this.options = options
    // console.log(params)
    // 提交action-还需要传入对应的参数--目的:获取数据,该界面中会有很多的筛选的条件(参数),条件不同,则就要发送请求获取数据(多次的提交action,来获取不同的数据)
    this.getproductList()
  },
  methods: {
    // 获取商品信息数据
    getproductList(pageNo=1) { // 参数设置一个默认值
      // 更新当前的页码
      this.options.pageNo = pageNo
      this.$store.dispatch('getProductList', this.options)
    },
    // 移除分类信息的名字
    removeCategoryName() {
      // 干掉一级/二级/三级的id值和分类的名字
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 重新获取数据
      // this.getproductList()
      // 上面的方式仅仅是重新获取了数据,但是地址中的参数依然存在
      // 重新跳转并获取数据
      this.$router.replace(this.$route.path)
    },
    // 移除关键字的名字
    removeKeyword() {
      this.options.keyword = ''
      this.$router.replace({ path: '/search', query: this.$route.query })
      // 通过事件总线分发自定义事件,移除文本框的数据
      this.$bus.$emit('removeKeyword')
    },
    // 点击品牌名字,通过子级组件来调用该回调函数,传入品牌的相关信息,并进行保存操作
    setTrademark(trademarkId, trademarkName) {
      // 默认的参数中没有trademark这个属性,为什么点击了品牌后,参数中就有了trademark?
      // 原因:js本身是一门动态类型的语言,对象没有什么属性或者方法,点了(通过点语法)这个属性名字(obj.age=10)并且赋值,那么此时该对象中就有了这个属性

      // 此时通过点语法添加的trademark属性,并非是一个响应式的属性,换言之,这种方式添加的属性,属性值改变了,页面是不会重新渲染的,问题:那为什么下面的写法,页面中就渲染了,而且还能够显示这个属性的数据呢?
      // 引入重新获取数据,重新获取的数据,导致了页面重新的渲染了

      // 保存到品牌的属性中
      // 这种方式添加的数据是非响应式的数据
      // this.options.trademark = `${trademarkId}:${trademarkName}`

      // 希望添加的数据是响应式的,言外之意:添加的数据,数据的值改变了,界面也会渲染

      // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新
      // 响应式对象: 组件中data对象中的数据都是响应式的数据,这里的数据的值发生了变化,界面就会渲染(视图更新)
      // 响应式对象: 组件中data对象中如果有一个数据是对象类型,那么这个数据就是真正的响应式对象
      // 如: data(){return { obj:{}}} obj 就是响应式对象
      // data(){return { obj:{age:10}}} 此时age就是当前响应式对象obj的响应式属性,值改变,界面也会发生渲染(视图更新)
      // data(){return { obj:{}}} 此时obj是响应式对象,但是里面没有任何的属性,如果后期向obj中添加属性,希望是响应式的属性,那么就需要通过Vue.set()方法或者vm.$set()方法来实现
      // this.$set() 参数1:目标对象(响应式对象) 参数2:要添加的属性的名字(字符串类型), 参数3:该属性的默认值

      this.$set(this.options, 'trademark', `${trademarkId}:${trademarkName}`)
      // console.log('今天真热啊')
      // 重新发送请求获取商品信息数据
      this.getproductList()
    },
    // 移除品牌信息
    removeTrademark() {
      // 清理品牌信息
      // 下面的这行代码并不是真正的视图更新操作,仅仅是改变了值,看起来是视图更新,该方法的作用是要干掉这个属性,并不是清空
      // this.options.trademark = ''
      // 移除这个属性，不能实现,响应式的属性,如果想要移除(删除),必须使用对应的方法来实现
      // delete this.options.trademark
      // 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图
      this.$delete(this.options,'trademark')
      // 重新发送请求获取商品信息数据
      this.getproductList()
    },
    // 添加平台属性的操作,并且重新获取商品信息数据
    addProps(propId, propVal, propName) {
      const prop = `${propId}:${propVal}:${propName}`
      // 如果当前平台属性的数据已经存在了,就没有必要再次添加了(只有当前平台属性props中不存在这个数据的时候,可以添加)
      if (this.options.props.indexOf(prop) === -1) {
        // 添加平台属性数据
        this.options.props.push(prop)
        // 重新获取商品信息数据
        this.getproductList()
      }
    },
    // 移除某个平台属性数据
    removeProp(index) {
      this.options.props.splice(index, 1)
      // 重新获取商品信息数据
      this.getproductList()
    },
    // 设置当前的某个排序选项的高亮显示效果
    isActive(flag) {
      return this.options.order.indexOf(flag) === 0
    },
    // 点击排序选项,设置高亮显示操作,同时进行真正排序操作
    setOrder(flag) {
      // 获取默认的排序选项中的排序标识和排序方式('1:desc',1/2排序标识---综合/价格,排序方式---降序desc/升序asc)
      let [orderFlag, orderType] = this.options.order.split(':')
      // 判断传入的排序标识和默认的标识是否一致
      if (flag === orderFlag) {
        // 传入的标识和默认的标识是相同的,如果标识相同,那么改变的应该是排序的方式(默认是降序,现在要改变成升序)
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        // 说明传入进来的标识和默认的标识不一致
        orderFlag = flag
        // 改变排序的方式,默认是降序
        orderType = 'desc'
      }
      // 此时orderFlag 和 orderType 的数据发生了变化---->参数变化了
      this.options.order = orderFlag + ':' + orderType
      // 重新获取商品信息数据
      this.getproductList()
    },
    // 设置当前排序选项的箭头标识
    getOrderIcon(flag) {
      const [orderFlag, orderType] = this.options.order.split(':')
      if (flag === orderFlag) {
        return orderType === 'desc' ? '⬇' : '⬆'
      } else {
        return ''
      }
      // ⬇⬆
    },

    // 分页组件如果改变了页码,那么通知当前的父级组件,页码改变了,那么应该访问对应的页码的商品信息数据,父级的商品的展示要改变
    // changeCurrentPage(pageNo){
    //   // this.options.pageNo =pageNo
    //   // 重新获取商品信息数据
    //   this.getproductList(pageNo)
    // }
  },
}

// var obj1 ={
//   text:'好幸福啊'
// }
// var obj2 ={
//   text:'敲多遍真开心'
// }
// obj2={
//   ...obj1
// }
// console.log(obj2)
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
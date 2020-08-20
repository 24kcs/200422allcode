<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--显示商品列表数据的-->
        <ul class="cart-list" v-for="(item,index) in shopList" :key="item.id">
          <li class="cart-list-con1">
            <!--商品的选中状态,后期要修改-->
            <!--用鼠标点击这个复选框,那么应该改变当前的这个购物项的选中状态
            如果点击了,改变的并不是这个购物项的真正的勾选状态,而是这个购物项对象的isChecked属性,这个操作,并没有真正的改变后台服务器中的购物项的选中状态(仅仅是改变的是本地的勾选状态的数据而已,和后台服务器没关系)
            如果想要改变购物项的选中状态,必须调用api接口来实现
            购物项的isChecked属性值,要么是1,要么是0,而并不是true或者false
            现在的修改isChecked,仅仅是设置了isChecked为true或者是false
            -->
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked" /> -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">国产手机就是好</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <!--针对购物项的数量的操作-->
            <a href="javascript:void(0)" class="mins" @click="changeItemCount(item,-1)">-</a>
            <!--后期也要进行修改-->
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="changeItemCount(item,$event.target.value*1-item.skuNum)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeItemCount(item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <!--当前这个商品一共花了多少钱-->
            <span class="sum">{{item.skuNum*item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!--后期要修改的,-->
        <!-- <input class="chooseAll" type="checkbox" v-model="isCheckAll" /> -->
        <input class="chooseAll" type="checkbox" :checked="isCheckAll" @change="checkAllCartItem" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCartItem">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:;" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      shopList: (state) => state.shopcart.shopList,
    }),
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'isCheckAll',
      'selectedCartItems',
    ]),
  },
  mounted() {
    // 获取购物车的商品信息
    this.getShopCartList()
  },
  methods: {
    // 获取购物车的商品列表信息数据
    getShopCartList() {
      // 分发action
      this.$store.dispatch('getShopCartList')
    },
    // 删除某个购物项
    async deleteCartItem(skuId) {
      // 提示框
      if (window.confirm('您确定要删除吗?')) {
        // 分发action
        // const errorMsg = await this.$store.dispatch('deleteCartItem',skuId)
        // if(!errorMsg){
        //   // 重新获取购物车数据
        //   this.getShopCartList()
        // }else{
        //   alert(errorMsg) // 删除失败了
        // }
        try {
          await this.$store.dispatch('deleteCartItem2', skuId)
          this.getShopCartList()
        } catch (error) {
          alert(errorMsg) // 删除失败了
        }
      }
    },
    // 删除所有选中的购物项
    deleteAllCartItem() {
      // 如果当前的购物项的数组没有数据,那么就没有必要向后执行了
      if(this.selectedCartItems.length===0)return
      // 提示信息
      if (window.confirm('您确定要删除所有选中的购物项吗')) {
        // 获取所有选中的购物项(并没有提送一次性删除多个购物项的接口,正常情况后台是需要提供)
        const promises = [] // 用来收集所有的promise对象
        this.selectedCartItems.forEach((item) => {
          const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
          promises.push(promise)
        })
        // 统一的处理
        Promise.all(promises).then(
          (values) => {
            // 重新获取当前购物车的所有的购物项
            this.getShopCartList()
          },
          (error) => {
            alert(error.message || '删除失败喽')
          }
        )
      }
    },
    // 修改某个购物项的选中效果
    checkCartItem(item) {
      // 获取了改变后的选中状态的值
      const isChecked = item.isChecked === 1 ? 0 : 1
      const { skuId } = item
      // 分发action,修改状态
      this.$store
        .dispatch('checkCartItem', {
          skuId,
          isChecked,
        })
        .then(
          () => {
            // 重新获取购物项列表数据
            this.getShopCartList()
          },
          (error) => {
            alert(error.message)
          }
        )
    },
    // 修改全选/全不选的操作
    async checkAllCartItem(event) {
      // 转数字类型
      const isChecked = event.target.checked * 1
      // 后台也没有提供可以一次性修改所有购物项的选中状态的api接口,所以,还是要调用每次只能修改一个购物项的选中状态的api接口函数
      // 方式1:forEach方法实现
      // const promises = []
      // 遍历所有购物项进行一个一个的修改状态的操作
      // this.shopList.forEach(item=>{
      //   const promise = this.$store.dispatch('checkCartItem',{
      //     skuId:item.skuId,
      //     isChecked
      //   })
      //   // 把当前的每个promise对象存放在一个promises的数组中,最终进行统一的处理
      //   promises.push(promise)
      // })
      // 方式2: reduce方法实现
      // const promises = this.shopList.reduce((pre, item) => {
      //   const promise = this.$store.dispatch('checkCartItem', {
      //     skuId: item.skuId,
      //     isChecked,
      //   })
      //   pre.push(promise)
      //   return pre
      // }, [])
      // 方式3: map方法实现
      const promises = this.shopList.map((item) => {
        return this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked,
        })
      })

      try {
        await Promise.all(promises)
        // 处理后重新购物项
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改购物项的数量
    async changeItemCount2(item, changeNum) {
      const { skuId } = item
      // 判断,变化的值和skuNum的值相加的结果是否大于0,才有意义
      if (changeNum + item.skuNum > 0) {
        const errorMsg = await this.$store.dispatch('addToCart', {
          skuId,
          skuNum: changeNum,
        })
        if (!errorMsg) {
          // 重新获取数据
          this.getShopCartList()
        } else {
          alert(errorMsg)
        }
      }
    },
    changeItemCount(item, changeNum) {
      const { skuId } = item
      // 判断,变化的值和skuNum的值相加的结果是否大于0,才有意义
      if (changeNum + item.skuNum > 0) {
        this.$store.dispatch('addToCart3', {
          skuId,
          skuNum: changeNum,
        })
      }
    },
    // 去结算
    toTrade(){
      // 跳转到订单的界面()
      this.$router.push('/trade')
    }
  },
}

</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
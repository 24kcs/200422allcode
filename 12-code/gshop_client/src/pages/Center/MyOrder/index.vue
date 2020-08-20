<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item" v-for="(order,index) in orders" :key="order.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">
                {{order.createTime}} 订单编号：{{order.outTradeNo}}
                <span class="pull-right delete">
                  <!--删除的小图标-->
                  <img src="./images/delete.png" />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in order.orderDetailList" :key="item.id">
            <td width="60%">
              <div class="typographic">
                <img :src="item.imgUrl" />
                <a href="javascript:;" class="block-text">包邮 {{item.skuName}}</a>
                <span>x{{item.skuNum}}</span>
                <a href="javascript:;" class="service">{{item.orderPrice}}</a>
              </div>
            </td>
            <!--
              div标签在表格中使用的时候,影响了结构及布局样式,虽然效果实现,但是不美观
              template---模版标签,最终在页面中这个标签也不会产生,而且不会影响结构及布局的样式
            -->
            <template v-if="index===0">
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
              >{{order.consignee}}</td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}</li>
                  <li>{{order.paymentWay==='ONLINE'?'在线支付':'货到付款'}}</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                <a href="javascript:;" class="btn">{{order.orderStatus==='PAID'?'已支付':'未支付'}}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="javascript:;">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <!--分页组件-->
    <Pagination
      :pageConfig="{total:total,showPageNo:5,pageNo:page,pageSize:limit}"
      @changeCurrentPage="getOrderList"
    />
  </div>
</template>
<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      page: 1, // 页码,默认是第一页
      limit: 10, // 每页的数据条数
      total: 0, // 数据总条数
      orders: [], // 所有的订单的对象数组数据
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    // 获取当前页的订单列表信息数据
    async getOrderList(page = 1) {
      this.page = page
      // 调用api接口获取订单的相关数据
      const result = await this.$API.reqOrderList(this.page, this.limit)
      if (result.code === 200) {
        const { total, records } = result.data
        // 更新总条数数据
        this.total = total
        // 更新订单数组数据
        this.orders = records
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
            width: 100px;
            height: 100px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }

  // 分页
}
</style>
<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：
            <em>{{payInfo.orderId}}</em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">￥{{payInfo.totalFee}}</em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持
            <span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，
          <span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <img src="./images/pay2.jpg" />
            </li>
            <li>
              <img src="./images/pay3.jpg" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li>
                <img src="./images/pay10.jpg" />
              </li>
              <li>
                <img src="./images/pay11.jpg" />
              </li>
              <li>
                <img src="./images/pay12.jpg" />
              </li>
              <li>
                <img src="./images/pay13.jpg" />
              </li>
              <li>
                <img src="./images/pay14.jpg" />
              </li>
              <li>
                <img src="./images/pay15.jpg" />
              </li>
              <li>
                <img src="./images/pay16.jpg" />
              </li>
              <li>
                <img src="./images/pay17.jpg" />
              </li>
              <li>
                <img src="./images/pay18.jpg" />
              </li>
              <li>
                <img src="./images/pay19.jpg" />
              </li>
              <li>
                <img src="./images/pay20.jpg" />
              </li>
              <li>
                <img src="./images/pay21.jpg" />
              </li>
              <li>
                <img src="./images/pay22.jpg" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="toPay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span>
              <a href="javascript:;">微信支付</a>
            </span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入QRCode插件对象
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  props: ['orderId'],
  computed: {
    ...mapState({
      payInfo: (state) => state.order.payInfo,
    }),
  },
  mounted() {
    // 获取当前这个订单的id
    // const {orderId} = this.$route.query
    // 获取支付的信息
    this.$store.dispatch('getPayInfo', this.orderId)
  },
  methods: {
    // 支付的操作
    toPay() {
      // console.log(this.payInfo)
      // codeUrl: "weixin://wxpay/bizpayurl?pr=5uLMnwK" 帮助我们在产生二维码的时候所需要的地址
      // 路由的跳转---/paysuccess
      // qrcode---插件---帮助我们产生一个二维码
      // element-ui 组件库中的部分组件---产生比较好看的对话框(相对于alert)

      // 产生二维码

      QRCode.toDataURL(this.payInfo.codeUrl)
        .then((imgUrl) => {
          // 用来展示图片的
          // console.log(imgUrl)
          this.$alert(`<img src="${imgUrl}">`, '请使用微信扫码支付', {
            dangerouslyUseHTMLString: true, // 这里的代码就会以html的方式进行解析
            showClose: true, // 对话框是否显示右上角的x
            showCancelButton: true, // 是否显示取消按钮
            showConfirmButton: true, // 是否显示确定按钮
            cancelButtonText: '支付中遇到了问题', // 设置取消按钮中的文本内容
            confirmButtonText: '我已成功支付', // 设置确定按钮中的文本内容
            center: true, // 是否居中显示
          })
            .then(() => { // 这个是点击了对话框的确定按钮
              // 清除定时器
              clearInterval(this.timeId)
              // 关闭二维码
              this.$msgbox.close()
              // 提示消息
              this.$message({
                message: '支付成功了',
                type: 'success',
              })
              // 路由的跳转
              this.$router.push('/paysuccess')
            })
            .catch((error) => { // 点击了对话框的取消
              this.$message.error('请联系前台的客服妹妹')
            })

          // 调用获取支付状态的接口---目的:不停的获取当前的支付状态-----才能够知道支付成功还是失败
          // 定时器
          this.timeId = setInterval(() => {
            console.log('嘎嘎')
            // 定时器中每隔3秒就获取一次支付的状态
            this.$API
              .reqPayStatus(this.payInfo.orderId)
              .then((result) => {
                // 判断支付是否成功
                if (result.code === 200) {
                  // 清除定时器
                  clearInterval(this.timeId)
                  // 关闭二维码
                  this.$msgbox.close()
                  // 提示消息
                  this.$message({
                    message: '支付成功了',
                    type: 'success',
                  })
                  // 路由的跳转
                  this.$router.push('/paysuccess')
                }
              })
              .catch((error) => {
                this.$message({
                  message: '获取订单失败了',
                  type: 'warning',
                })
              })
          }, 3000)
        })
        .catch((error) => {
          this.$message.error('生成二维码失败了')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
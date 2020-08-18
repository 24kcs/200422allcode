<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go">
        我有账号，去
        <!-- <a href="login.html" target="_blank">登陆</a> -->
        <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input
        type="text"
        placeholder="请输入你的手机号"
        v-model="mobile"
        name="mobile"
        v-validate="'required|checkMobile'"
      />
      <span style="color:red">{{ errors.first('mobile') }}</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="'required|checkCode'" />
      <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode" />
      <span style="color:red">{{ errors.first('code') }}</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input
        type="text"
        placeholder="请输入你的登录密码"
        v-model="password"
        name="password"
        v-validate="'required'"
      />
      <span style="color:red">{{ errors.first('password') }}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input
        type="text"
        placeholder="请输入确认密码"
        v-model="password2"
        name="password2"
        v-validate="'required'"
      />
      <span style="color:red">{{ errors.first('password2') }}</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="isAgree" />
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>
    <div class="btn">
      <a href="javascript:" @click="register">完成注册</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      mobile: '19000009999', // 手机号码
      code: '', // 图形码
      password: '111111', // 密码
      password2: '111111', // 确认密码
      isAgree: true, // 是否同意协议
    }
  },
  methods: {
    // 更新图形码的
    updateCode() {
      this.$refs.code.src = '/api/user/passport/code?time=' + Date.now()
    },
    // 注册操作
    async register() {
      const { mobile, code, password, password2, isAgree } = this
      // 1.校验输入的数据----表单验证
      // 判断是否同意协议了
      if (!isAgree) return
      // 判断两次密码是否一致
      if (password !== password2) {
        alert('两次密码不一致')
        return
      }
      // 实现表单的校验,只有所有要校验的表单通过了验证,才能返回true,否则返回false
      const names = ['mobile', 'code', 'password', 'password2']
      const success = await this.$validator.validateAll(names)
      if (success) {
        try {
          // 分发actioon,实现注册
          await this.$store.dispatch('register', { mobile, code, password })
          // 成功则跳转
          this.$router.push('/login')
        } catch (error) {
          alert(error.message || '注册失败了')
        }
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;
    span {
      font-size: 14px;
      float: right;
      a {
        color: #e1251b;
      }
    }
  }
  div:nth-of-type(1) {
    margin-top: 40px;
  }
  .content {
    // text-align: center;
    padding-left: 390px;
    margin-bottom: 18px;
    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }
    img {
      vertical-align: sub;
    }
  }
  .controls {
    text-align: center;
    input {
      vertical-align: middle;
    }
  }
  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;
    a {
      text-decoration: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
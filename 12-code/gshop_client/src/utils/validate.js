// 引入Vue
import Vue from 'vue';
// 引入VeeValidate对象
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  // 提示中文的信息
  messages: zh_CN.messages,
  // 属性的设置操作
  attributes: {
    mobile: '手机号', // 针对表单验证的字段的翻译
    code: '图形码', // 
    password: '密码', // 
    password2: '确认密码', // 
  }
})

// 增加了校验的方法
VeeValidate.Validator.extend('checkMobile', {
  // 校验失败的时候的提示信息
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => /^[1]\d{10}$/.test(value)
});

// 增加一个图形码的校验方法

VeeValidate.Validator.extend('checkCode', {
  // 校验失败的时候的提示信息
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => /^\d{4}$/.test(value)
});


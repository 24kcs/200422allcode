<template>
  <div>
    <!--添加按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="isShowAdd">添加</el-button>
    <!--表格-->
    <el-table :data="trademarks" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="logo" width="100" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--
          slot-scope---作用域插槽
          scope:对象----{row,$index}
          row:当前这一行的对象,row.tmName--品牌名字,row.logoUrl--品牌的图片路径
          $index:索引值---每一行都有自己的索引
        -->
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" icon="el-icon-edit" @click="isShowUpdate(row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!--
      current-page:当前的第几页---页码数
      page-sizes: 每页可以显示多少条数据--每页的条数可以进行调节
      page-size: 每页固定的显示多少条数据
      total: 总的数据条数
            总条数  每页的条数    上一页   页码      下一页     跳转到第几页
      layout:total,   sizes,     prev,   pager,    next,      jumper
      @current-change: 改变当前页码后改事件就触发了
      @size-change: 每页的条数发生变化就触发了
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3,6,9,12]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      style="text-align:center;margin-top:20px"
      background
    ></el-pagination>

    <!--对话框组件-->
    <!--
      1. 不使用.sync修饰符, 使用before-close属性,内部嵌入回调,回调中设置表达式的值,可以点击x关闭对话框
      2. label-width 设置当前的表单项的宽度
      3. el-form标签中 model="动态的数据"---对象
    -->
    <el-dialog
      :title="`${formTrademark.id?'修改':'添加'}品牌`"
      :visible="isShowDialog"
      :before-close="()=>isShowDialog=false"
    >
      <!--表单-->
      <el-form :model="formTrademark" style="width:80%" :rules="rules" ref="ruleForm">
        <!--表单项-->
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="formTrademark.tmName" autocomplete="off" placeholder="请输入品牌的名字"></el-input>
        </el-form-item>
        <!--表单项-->
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
          <!--上传图片的东西-->
          <!--
            action属性: 可以上传图片的地址
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formTrademark.logoUrl" :src="formTrademark.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      trademarks: [], // 用来存储获取到的品牌列表数据的数组
      page: 1, // 当前的页码,默认是第一页
      limit: 3, // 每页的条数,默认是每页显示3条数据
      total: 0, // 总条数,默认是0条
      isShowDialog: false, // 设置当前的对话框显示/隐藏
      formLabelWidth: '100px', // 设置当前的表单项的前面文字的宽度
      formTrademark: {
        tmName: '', // 品牌名称
        logoUrl: '', // 品牌的LOGO
      }, // 当前的某个品牌对象
      // 表单验证的规则(有需要要进行验证的字段)
      rules: {
        tmName: [
          // required--->必须的,trigger--->触发器--->什么时候校验这个字段---进行表单的验证
          { required: true, message: '请输入品牌名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
          },
        ],
        logoUrl: [
          { required: true, message: '请上传品牌LOGO', trigger: 'change' },
        ],
      },
    }
  },
  mounted() {
    // 调用方法获取品牌列表
    this.getTrademarkList()
  },
  methods: {
    // 根据页码和每页的条数来获取品牌信息列表数据
    async getTrademarkList(page = 1) {
      // 更新页码
      this.page = page
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      )
      if (result.code === 200) {
        // 更新数据
        const { records, total } = result.data
        this.total = total
        this.trademarks = records
      } else {
        // 提示
        this.$message.error('很抱歉,获取品牌列表信息数据失败了')
      }
    },
    // 分页组件需要的两个回调函数
    handleSizeChange(val) {
      // 更新每页显示的条数
      this.limit = val
      console.log(this.limit)
      // 立刻重新获取数据
      this.getTrademarkList()
    },
    // 改变页码会触发的事件的回调函数
    // handleCurrentChange(val) {
    //   // 更新页码
    //   this.page = val
    //   // 立刻重新获取数据
    //   this.getTrademarkList()
    // },

    // 上传图片的两个回调函数
    // res 是对象---response--->响应的对象数据
    // file 是对象---->获取上传的图片的相关的详细信息
    handleAvatarSuccess(res, file) {
      // res.data  ----> 上传图片成功后的图片的地址
      // 图片上传成功了,立刻更新图片的地址
      this.formTrademark.logoUrl = res.data
      // 移除图片的表单验证
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
    // 上传图片的时候对图片的限制操作
    beforeAvatarUpload(file) {
      // 限制图片的类型
      // const isJPG = file.type === 'image/jpeg'
      // 上传的图片的类型是否在数组中包含
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      // 限制图片的大小,小于2M
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 点击确定按钮,进行添加品牌的操作
    addOrUpdateTrademark() {
      // const formName='ruleFomr'
      // this.$refs['ruleFomr']
      // 1.校验表单的数据
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 表单验证全都成功了
          let result
          if (this.formTrademark.id) {
            // 修改
            result = await this.$API.trademark.updateTrademark(
              this.formTrademark
            )
          } else {
            // 添加
            result = await this.$API.trademark.addTrademark(this.formTrademark)
          }
          if (result.code === 200) {
            // 提示
            this.$message.success(
              `${this.formTrademark.id ? '修改' : '添加'}品牌成功了`
            )
            // 重新获取数据
            this.getTrademarkList(this.formTrademark.id ? this.page : 1)
            // 关闭对话框
            this.isShowDialog = false
          } else {
            this.$message.error(
              `${this.formTrademark.id ? '修改' : '添加'}品牌失败了`
            )
          }
        }
      })
    },
    // 点击添加按钮,显示添加品牌的对话框
    isShowAdd() {
      this.isShowDialog = true
      // 设置当前品牌名称和品牌的图片为空
      this.formTrademark = {
        tmName: '', // 清空品牌
        logoUrl: '', // 清空品牌的图片
      }
      // 当这个添加品牌的对话框出现的时候,先把所有的表单验证的提示信息清理掉
      // 当前是让对话框渲染出来,但是里面的DOM元素还有渲染完毕,此时直接获取ruleForm是获取不到的,所以,使用$nextTick()解决
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 点击修改按钮,显示修改品牌的对话框
    isShowUpdate(trademark) {
      // 显示对话框
      this.isShowDialog = true
      // 更新表单中绑定的数据
      this.formTrademark = { ...trademark }
      // console.log(trademark)
    },
    // 点击删除按钮,删除品牌信息数据
    deleteTrademark(trademark) {
      this.$confirm(`确定删除 ${trademark.tmName} 吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 调用接口
          const result = await this.$API.trademark.deleteTrademarkById(
            trademark.id
          )
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            // 重新获取数据
            this.getTrademarkList(
              this.trademarks.length === 1 ? this.page - 1 : this.page
            )
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}

// var obj ={
//   age:10,
//   name:'强哥'
// }
// console.log(obj.name)
// const nm = 'name'
// console.log(obj[nm])
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
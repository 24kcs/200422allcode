<template>
  <el-form v-show="visible" label-width="100px">
    <!--SPU名称-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
    </el-form-item>
    <!--SPU的品牌-->
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option
          v-for="(tm,index) in trademarkList"
          :key="tm.id"
          :label="tm.tmName"
          :value="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <!--SPU描述-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="4" placeholder="请输入描述信息" v-model="spuInfo.description"></el-input>
    </el-form-item>
    <!--SPU的图片-->
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="spuImageList"
        multiple
      >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-select
        v-model="attrIdAttrName"
        :placeholder="`${unSelectedSaleAttrList.length>0?`还有${unSelectedSaleAttrList.length}个未选择`:'没有啦'}`"
      >
        <el-option
          v-for="(attr,index) in unSelectedSaleAttrList"
          :label="attr.name"
          :value="attr.id"
          :key="attr.id"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAttrName">添加销售属性</el-button>
      <!--表格-->
      <el-table :data="spuInfo.spuSaleAttrList" style="width: 100%;margin-top:20px" border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="150"></el-table-column>
        <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表">
          <!--显示的是每个销售属性对象中每个属性值的-->
          <template slot-scope="{row,$index}">
            <el-tag
              :key="value.id"
              v-for="(value,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row.spuSaleAttrValueList,index)"
            >{{value.saleAttrValueName}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row,$index}">
            <HintButton title="删除" type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr($index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--two 个 按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  props: ['visible'],
  data() {
    return {
      dialogImageUrl: '', // 预览图片的地址
      dialogVisible: false, // 是否预览
      spuId: null, // 用来存储spu的id的
      spuInfo: {
        spuSaleAttrList: [], // 当前的spuInfo中的销售属性数组
      }, // 保存spu商品信息对象
      trademarkList: [], // 保存所有品牌列表信息数据
      saleAttrList: [], // 保存所有的销售属性列表信息数据
      spuImageList: [], //  保存当前Spu的图片列表信息数据
      attrIdAttrName: '', // 用来保存销售属性数据的id

      // 当前的属性值列表中需要的表达式
      // inputVisible: false,
      // saleAttrValueName: '',
    }
  },
  computed: {
    unSelectedSaleAttrList() {
      // 先获取所有的销售属性和spuInfo中的销售属性
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList },
      } = this
      // 筛选spuInfo对象中的不存在的销售属性
      const result = saleAttrList.filter(
        (sa) => !spuSaleAttrList.some((ssa) => ssa.saleAttrName === sa.name)
      )
      return result
    },
  },
  methods: {
    // 初始化发送请求的方法---发送4个请求
    initSpuFormData(spuId) {
      // 先把spuId保存起来
      this.spuId = spuId
      // 根据spu的id获取对应的spuInfo对象
      this.getSpuInfoById()
      // 获取所有的品牌信息列表数据
      this.getTrademarkList()
      // 获取所有的销售属性列表数据
      this.getSaleAttrList()
      // 获取当前的spuInfo对象中已经存在的所有的图片列表数据
      this.getSpuImageList()
    },
    // 根据spu的id获取对应的spuInfo对象
    async getSpuInfoById() {
      const result = await this.$API.spu.getSpuInfoBySpuId(this.spuId)
      if (result.code === 200) {
        this.spuInfo = result.data
      }
    },
    // 获取所有的品牌信息列表数据
    async getTrademarkList() {
      const result = await this.$API.trademark.getTrademarkList()
      if (result.code === 200) {
        this.trademarkList = result.data
      }
    },
    // 获取所有的销售属性列表数据
    async getSaleAttrList() {
      const result = await this.$API.spu.getBaseSaleAttrList()
      if (result.code === 200) {
        this.saleAttrList = result.data
      }
    },
    // 获取当前的spuInfo对象中已经存在的所有的图片列表数据
    async getSpuImageList() {
      const result = await this.$API.sku.getSpuImageListBySpuId(this.spuId)
      if (result.code === 200) {
        const spuImageList = result.data
        spuImageList.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = spuImageList
      }
    },

    // 取消
    back() {
      // this.visible = false
      // 分发update事件
      this.$emit('update:visible', false)
    },
    // 删除上传的图片的操作
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 上传图片成功
    handleSuccess(response, file, fileList) {
      // 把上传成功的图片列表数组重新的更新到之前保存图片列表数组中
      this.spuImageList = fileList
    },
    // 显示预览的效果
    handlePictureCardPreview(file) {
      // 预览图片的地址
      this.dialogImageUrl = file.url
      // 是否预览
      this.dialogVisible = true
    },

    // 点击列表中的tag标签的X,移除这个销售属性值(从当前这一行的销售属性列表数组中移除这个属性值对象操作)
    handleClose(valueList, index) {
      valueList.splice(index, 1)
    },
    // 进入编辑模式
    showInput(attr) {
      // 判断当前的这个对象中有没有edit标识
      if (attr.hasOwnProperty('edit')) {
        attr.edit = true
      } else {
        // 没有,要添加
        this.$set(attr, 'edit', true)
      }
      this.$nextTick(() => {
        // 点击按钮的时候,设置文本框自动的获取焦点
        this.$refs.saveTagInput.focus()
      })
    },
    // 添加属性值操作(未完成)
    handleInputConfirm(attr) {
      // 获取文本框中输入的数据了
      const saleAttrValueName = attr.saleAttrValueName
      // 判断数据是否输入了
      if (saleAttrValueName) {
        // 筛选有没有重复的数据
        const isRepeat = attr.spuSaleAttrValueList.some(
          (item) => item.saleAttrValueName === saleAttrValueName
        )
        // 判断数据是否重复
        if (!isRepeat) {
          // 向当前的数组中添加一个对象
          attr.spuSaleAttrValueList.push({
            baseSaleAttrId: attr.baseSaleAttrId, // 当前的销售属性的id
            saleAttrValueName, // 属性值内容
          })
        } else {
          this.$message.warning('不能添加重复的数据')
          return
        }
      }
      // 查看模式
      attr.edit = false
      // 清空文本框的数据
      attr.saleAttrValueName = ''
    },
    // 删除当前这一行的这个销售属性对象
    deleteAttr(index){
      this.spuInfo.spuSaleAttrList.splice(index,1)
    }
  },
}

// const arr1 = [1,2,3,4]
// const result = arr1.some(item=>item%2===0)
// console.log(result)

// const arr2 = [1,2,3,4]
// const arr3 = arr2.filter(item=>item%2===0)
// console.log(arr3)
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
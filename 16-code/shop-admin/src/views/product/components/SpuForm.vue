<template>
  <el-form v-show="visible" label-width="100px">
    <!--SPU名称-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <!--SPU的品牌-->
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option v-for="(tm,index) in trademarkList" :key="tm.id" :label="tm.tmName" :value="tm.id"></el-option>
      </el-select>
    </el-form-item>
    <!--SPU描述-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="4" placeholder="请输入描述信息"></el-input>
    </el-form-item>
    <!--SPU的图片-->
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
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
      <el-select value="2">
        <el-option label="选择版本" value="1"></el-option>
        <el-option label="选择颜色" value="2"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" disabled>添加销售属性</el-button>
      <!--表格-->
      <el-table :data="saleAttrList" style="width: 100%;margin-top:20px" border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop label="属性名" width="150"></el-table-column>
        <el-table-column prop label="属性值名称列表"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row,$index}">
            <HintButton title="删除" type="danger" icon="el-icon-delete" size="mini" />
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
      spuInfo: {}, // 保存spu商品信息对象
      trademarkList: [], // 保存所有品牌列表信息数据
      saleAttrList: [], // 保存所有的销售属性列表信息数据
      spuImageList: [], //  保存当前Spu的图片列表信息数据
    }
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
        this.spuImageList = result.data
      }
    },

    // 取消
    back() {
      // this.visible = false
      // 分发update事件
      this.$emit('update:visible', false)
    },
    // 上传图片所需要的回调函数
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
  },
}
</script>
<style scoped>
</style>
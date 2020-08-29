<template>
  <div>
    <!--第一个卡片-->
    <el-card>
      <CategorySelector @changeCategory="changeCategory" ref="cs" />
    </el-card>
    <!--第二个卡片-->
    <el-card style="margin-top:20px;">
      <!--展示平台属性列表的界面-->
      <div v-show="!isShowSpuForm&&!isShowSkuForm">
        <!--按钮-->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="showAddSpuForm"
        >添加SPU</el-button>
        <!--表格-->
        <el-table :data="spuInfoList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称"></el-table-column>
          <el-table-column prop="description" label="SPU描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <!--添加SKU-->
              <HintButton
                title="添加SKU"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="showAddSkuForm(row)"
              />
              <!--修改SPU-->
              <HintButton
                title="修改SPU"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdateSpuForm(row.id)"
              />
              <!--查看所有的SKU列表-->
              <HintButton
                title="查看SKU列表"
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="showSkuList(row)"
              />
              <!--气泡对话框-->
              <el-popconfirm :title="`确定要删除吗?`" @onConfirm="deleteSpu(row.id)">
                <HintButton
                  slot="reference"
                  title="删除SPU"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuInfoList"
          :current-page="page"
          :page-sizes="[3,6,9,12]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          style="text-align:center;margin-top:20px"
          background
        ></el-pagination>
      </div>
      <!--修改Spu的SpuForm组件-->
      <SpuForm :visible.sync="isShowSpuForm" ref="spuForm" @saveSuccess="saveSuccess" />
      <SkuForm
        v-show="isShowSkuForm"
        ref="skuForm"
        @success="()=>isShowSkuForm=false"
        @cancel="()=>isShowSkuForm=false"
      />
    </el-card>

    <el-dialog :title="`${spuName} => SKU列表`" :visible.sync="isShowSkuList">
      <el-table :data="skuList">
        <el-table-column property="skuName" label="名称" width="150"></el-table-column>
        <el-table-column property="price" label="价格(元)" width="200"></el-table-column>
        <el-table-column property="weight" label="重量(千克)"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="suibian" width="100" height="100" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
// 引入SpuForm组件
import SpuForm from '../components/SpuForm'
import SkuForm from '../components/SkuForm'
export default {
  name: 'SpuList',
  components: {
    SpuForm, // 注册组件
    SkuForm,
  },
  data() {
    return {
      spuInfoList: [], // 用来存储spu列表数据的
      page: 1, // 默认第一页
      limit: 3, // 默认每页3条
      total: 0, // 总条数数据
      category1Id: '', // 用来存储一级分类的id
      category2Id: '', // 用来存储二级分类的id
      category3Id: '', // 用来存储三级分类的id
      isShowSpuForm: false, // 设置当前SpuForm组件界面显示或者隐藏
      spuId: '', // 点击修改按钮的时候保存的spuId
      isShowSkuForm: false, // 设置当前SkuForm组件界面显示或者隐藏
      spuName: '', // 保存当前的Sku列表对应的spu商品的名字
      skuList: [], // 保存的是当前的spu中对应的所有的sku列表数据--数组
      isShowSkuList: false, // 显示或者隐藏当前spu对应的sku列表
    }
  },
  methods: {
    // 获取spu的列表数据
    async getSpuInfoList(page = 1) {
      // 用来更新页码
      this.page = page
      const { limit, category3Id } = this
      const result = await this.$API.spu.getSpuInfoList(
        page,
        limit,
        category3Id
      )
      if (result.code === 200) {
        // 解构出总条数和获取到的spu列表的数据数组
        const { total, records } = result.data
        // 更新总条数数据----目的:分页组件中要使用这个总条数
        this.total = total
        // 更新spu列表的数组数据
        this.spuInfoList = records
      }
    },
    // 由子级组件(三级分类组件)分发该事件,传递过来三个级别的分类的id和分类的级别标识
    changeCategory({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        // 清空数据
        this.category2Id = null
        this.category3Id = null
        this.spuInfoList = []
        this.total = 0
      } else if (level === 2) {
        this.category2Id = categoryId
        // 清空数据
        this.category3Id = null
        this.spuInfoList = []
        this.total = 0
      } else if (level === 3) {
        this.category3Id = categoryId
        // 获取spu列表数据
        this.getSpuInfoList()
      }
    },
    // 分页组件的回调---改变每页的条数
    handleSizeChange(val) {
      // 更新每页显示的条数
      this.limit = val
      // 立刻重新获取数据
      this.getSpuInfoList()
    },
    // 点击删除按钮,干掉spu对象
    async deleteSpu(id) {
      const result = await this.$API.spu.deleteSpuInfoBySpuId(id)
      if (result.code === 200) {
        this.$message.success('删除spu成功了')
        // 重新获取spu列表数据
        this.getSpuInfoList(
          this.spuInfoList.length === 1 ? this.page - 1 : this.page
        )
      } else {
        this.$message.error('删除spu失败了')
      }
    },
    // 点击修改按钮,显示修改SpuForm组件界面
    showUpdateSpuForm(spuId) {
      // 保存spuId
      this.spuId = spuId
      // 设置SpuForm组件显示
      this.isShowSpuForm = true
      // 调用SpuForm组件中的方法----发送4个请求(获取SpuInfo对象,获取所有的品牌列表信息数据,获取所有的销售属性列表数据,获取当前的spuInfo对象对应的图片列表数据)
      this.$refs.spuForm.initSpuFormData(spuId)
    },
    // 子级组件中需要分发的这个父级组件中的自定义事件---目的:刷新界面(重新获取数据)
    saveSuccess() {
      if (this.spuId) {
        this.getSpuInfoList(this.page)
      } else {
        this.getSpuInfoList()
      }
    },
    // 点击按钮实现添加SPU操作
    showAddSpuForm() {
      this.isShowSpuForm = true
      this.$refs.spuForm.initSpuFormAddData(this.category3Id)
    },
    // 点击按钮添加Sku操作
    showAddSkuForm(spuInfo) {
      spuInfo = {
        ...spuInfo,
        category1Id: this.category1Id,
        category2Id: this.category2Id,
      }
      // 显示SkuForm界面
      this.isShowSkuForm = true
      // 直接调用SkuForm组件对象中的相关初始化数据的方法,从而实现获取所有的平台属性、销售属性、图片列表数据
      this.$refs.skuForm.initAddData(spuInfo)
    },
    // 显示或者隐藏当前的spu对应的sku列表对话框
    async showSkuList(spuInfo) {
      this.spuName = spuInfo.spuName
      this.isShowSkuList = true
      const result = await this.$API.sku.getSkuInfoListBySpuId(spuInfo.id)
      if (result.code === 200) {
        this.skuList = result.data
      }
    },

    // 自定义事件---在SkuForm组件中保存成功调用的事件的回调函数
    // success(){
    //   this.isShowSkuForm = false
    // }
  },
}
</script>
<style >
</style>
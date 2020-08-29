<template>
  <el-form label-width="120px">
    <!--Spu名称-->
    <el-form-item label="SPU 名称">
      <span>{{spuName}}</span>
    </el-form-item>
    <!--SKU 名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="请输入SKU名称" v-model="skuInfo.skuName" />
    </el-form-item>
    <!--价格-->
    <el-form-item label="价格(元)">
      <el-input type="number" placeholder="请输入SKU价格" v-model="skuInfo.price"></el-input>
    </el-form-item>
    <!--重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="请输入SKU重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <!--规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="请输入SKU描述信息" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>

    <!--平台属性-->
    <el-form-item label="平台属性">
      <el-form inline label-width="80px">
        <el-form-item
          :label="attr.attrName"
          v-for="(attr,index) in attrList"
          :key="attr.id"
          style="margin-bottom:10px"
        >
          <el-select v-model="attr.attrIdValueId">
            <el-option
              v-for="(attrVal,index) in attr.attrValueList"
              :key="attrVal.id"
              :label="attrVal.valueName"
              :value="attr.id+'_'+attrVal.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-form inline label-width="80px">
        <el-form-item
          :label="attr.saleAttrName"
          v-for="(attr,index) in saleAttrList"
          :key="attr.id"
          style="margin-bottom:10px"
        >
          <el-select v-model="attr.valueId">
            <el-option
              v-for="(value,index) in attr.spuSaleAttrValueList"
              :key="value.id"
              :label="value.saleAttrValueName"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--图片列表-->
    <el-form-item label="图片列表">
      <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="嘎嘎" style="width:100px;height:100px" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-tag type="success" v-if="row.isDefault==='1'">默认</el-tag>
            <el-button type="primary" v-else @click="setDefault(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      skuInfo: {
        // 当前这个界面出现的时候就可以收集到的数据
        category3Id: '', // 三级分类的id
        tmId: '', // 当前spu商品对象中的品牌的id
        spuId: '', // spu的id

        // 下面的四个数据是通过当前界面的表单进行收集的
        skuName: '', // 当前sku的名字
        price: '', // 当前的sku的价格
        skuDesc: '', // 当前的sku的描述信息
        weight: '', // 当前的sku的重量

        // 下面的三个数组的数据,是在点击保存按钮的时候进行数据的收集及过滤操作
        skuAttrValueList: [], // 平台属性
        skuImageList: [], // 当前的sku的图片列表
        skuSaleAttrValueList: [], // 销售属性

        // 设置某个sku的图片为默认图片的时候进行收集的
        skuDefaultImg: '', // 当前的sku中的默认的图片
        // 默认的
        isSale: 0, // 上下架的标识
      },
      spuInfo: {}, // 保存spu商品对象
      attrList: [], // 存储平台属性
      saleAttrList: [], // 存储销售属性
      spuImageList: [], // 存储图片列表
      spuName: '', // 保存当前spu的名字的
      selectedImageList: [], // 保存表格中选中的图片的数组
    }
  },
  methods: {
    initAddData(spuInfo) {
      // 先保存当前的spuInfo对象
      this.spuInfo = spuInfo
      // 当前方法调用的时候(当前这个界面出现的时候)需要收集的三个数据
      this.skuInfo.category3Id = spuInfo.category3Id
      this.skuInfo.tmId = spuInfo.tmId
      this.skuInfo.spuId = spuInfo.id
      // 用来在当前界面中显示的名字
      this.spuName = spuInfo.spuName

      // 调用方法,发送三个请求,获取平台属性、销售属性、图片列表数据
      this.getSpuInfoInitData()
    },
    // 发送三个请求,获取平台属性、销售属性、图片列表数据
    async getSpuInfoInitData() {
      const { category1Id, category2Id, category3Id, id } = this.spuInfo
      // 获取所有的平台属性--数组----三级分类的id
      const promise1 = await this.$API.attr.getAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      )
      // 获取当前spu的销售属性---数组---spuId
      const promise2 = await this.$API.sku.getSpuSaleAttrList(id)
      // 获取当前spu的图片列表数据---数组---spuId
      const promise3 = await this.$API.sku.getSpuImageListBySpuId(id)
      // 统一处理promise
      const result = await Promise.all([promise1, promise2, promise3])
      // 更新数据(保存当前获取到的所有的数据)
      this.attrList = result[0].data
      this.saleAttrList = result[1].data
      // 把获取到的数据先保存在spuImageList变量中
      const spuImageList = result[2].data
      spuImageList.forEach((item) => (item.isDefault = '0'))
      // 把修改后的数据重新的更新到数组中
      this.spuImageList = spuImageList
      // console.log(this.spuImageList)
      // console.log(this.attrList)
      // console.log(this.saleAttrList)
      // console.log(this.spuImageList)
    },
    // 点击   设为默认   的按钮  实现当前这一行的这个图片是默认选择的图片操作的回调函数
    setDefault(img) {
      // 这个是不可以的,因为当前的这个img对象是响应式的对象,isDefault是自己添加的属性(是一个非响应式的属性)
      // img.isDefault = '1'
      // 设置为响应式的属性--界面就可以渲染了
      // this.$set(img,'isDefault','1')
      // 排他的效果
      // 先把每个图片设置为非默认的
      this.spuImageList.forEach((item) => (item.isDefault = '0'))
      // 设置的这个图片对象为默认的
      img.isDefault = '1'
      // 收集默认选中的图片
      this.skuInfo.skuDefaultImg = img.imgUrl
    },
    // 当表格中选择的图片发生变化的时候会触发
    handleSelectionChange(val) {
      this.selectedImageList = val
    },
    // 保存操作
    async save() {
      // 获取skuInfo对象,平台属性数据数组,销售属性数据,选择了哪些图片的图片数组
      const { skuInfo, attrList, saleAttrList, selectedImageList } = this
      // attrList数组---数据是需要过滤的
      skuInfo.skuAttrValueList = attrList.reduce((pre, item) => {
        // 获取每个平台属性对象下的attrIdValueId这个属性(如果该属性有值,就说明这个平台属性被选中了)
        const attrIdValueId = item.attrIdValueId
        // 判断
        if (attrIdValueId) {
          // 就说明这个平台属性被选中了
          const [attrId, valueId] = attrIdValueId.split('_')
          // 保存当前的对象数据
          pre.push({
            attrId,
            valueId,
          })
        }
        return pre
      }, [])

      // 过滤选中的销售属性数据
      // saleAttrList数组---所有的销售属性对象----每个对象item中有值的valueId属性,这个销售属性值被选中了
      // skuSaleAttrValueList数组---所有选中的销售属性值对象
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((pre, item) => {
        // 获取带有valueId的销售属性对象
        const saleAttrValueId = item.valueId
        // 判断该id值是否存在,如果存在说明这个销售属性被选中了
        if (saleAttrValueId) {
          pre.push({
            saleAttrValueId, // 选中的某个销售属性值的id,最终以对象的方式存储到数组中
          })
        }
        return pre
      }, [])
      // 收集选中的图片
      skuInfo.skuImageList = selectedImageList.map((item) => ({
        imgName: item.imgName,
        imgUrl: item.imgUrl,
        isDefault: item.isDefault,
        spuImgId: item.id,
      }))

      // 调用接口
      const result = await this.$API.sku.saveOrUpdateSkuInfo(skuInfo)
      if (result.code === 200) {
        this.$message.success('保存SKU成功了')
        // 重置数据
        this.resetData()
        // 关闭当前界面,显示主界面
        this.$emit('success')
      } else {
        this.$message.error('保存SKU失败了')
      }
    },
    // 重置数据的方法

    resetData() {
      this.skuInfo = {
        // 当前这个界面出现的时候就可以收集到的数据
        category3Id: '', // 三级分类的id
        tmId: '', // 当前spu商品对象中的品牌的id
        spuId: '', // spu的id

        // 下面的四个数据是通过当前界面的表单进行收集的
        skuName: '', // 当前sku的名字
        price: '', // 当前的sku的价格
        skuDesc: '', // 当前的sku的描述信息
        weight: '', // 当前的sku的重量

        // 下面的三个数组的数据,是在点击保存按钮的时候进行数据的收集及过滤操作
        skuAttrValueList: [], // 平台属性
        skuImageList: [], // 当前的sku的图片列表
        skuSaleAttrValueList: [], // 销售属性

        // 设置某个sku的图片为默认图片的时候进行收集的
        skuDefaultImg: '', // 当前的sku中的默认的图片
        // 默认的
        isSale: 0, // 上下架的标识
      }
      this.spuInfo = {} // 保存spu商品对象
      this.attrList = [] // 存储平台属性
      this.saleAttrList = [] // 存储销售属性
      this.spuImageList = [] // 存储图片列表
      this.spuName = '' // 保存当前spu的名字的
      this.selectedImageList = [] // 保存表格中选中的图片的数组
    },
    back() {
      this.$emit('cancel')
    },
  },
}

// const obj1 ={
//   name:'小明'
// }
// const obj3 = obj1
// obj3.age='18'
// const obj2 = obj3
// console.log(obj2)
</script>
<style scoped>
</style>

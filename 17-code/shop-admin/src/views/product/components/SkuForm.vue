<template>
  <el-form label-width="120px">
    <!--Spu名称-->
    <el-form-item label="SPU 名称">
      <span>小背心</span>
    </el-form-item>
    <!--SKU 名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="请输入SKU名称" />
    </el-form-item>
    <!--价格-->
    <el-form-item label="价格(元)">
      <el-input type="number" placeholder="请输入SKU价格"></el-input>
    </el-form-item>
    <!--重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="请输入SKU重量"></el-input>
    </el-form-item>
    <!--规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="请输入SKU描述信息"></el-input>
    </el-form-item>

    <!--平台属性-->
    <el-form-item label="平台属性">
      <el-form inline label-width="80px">
        <el-form-item label="CPU型号" style="margin-bottom:10px">
          <el-select value="1">
            <el-option label="强哥" value="1"></el-option>
            <el-option label="飞哥" value="2"></el-option>
            <el-option label="刘哥" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风格">
          <el-select value="2">
            <el-option label="简约" value="1"></el-option>
            <el-option label="清新" value="2"></el-option>
            <el-option label="复古" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-form inline label-width="80px">
        <el-form-item label="选择颜色" style="margin-bottom:10px">
          <el-select value="1">
            <el-option label="红色" value="1"></el-option>
            <el-option label="绿色" value="2"></el-option>
            <el-option label="蓝色" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择版本">
          <el-select value="2">
            <el-option label="联通" value="1"></el-option>
            <el-option label="移动" value="2"></el-option>
            <el-option label="电信" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!--图片列表-->
    <el-form-item label="图片列表">
      <el-table border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop label="图片">
          <template slot-scope="{row,$index}"></template>
        </el-table-column>
        <el-table-column prop label="名称"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="{row,$index}"></template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button >取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm',
}
</script>
<style scoped>
</style>

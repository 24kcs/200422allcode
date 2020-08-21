<template>
  <div></div>
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
    }
  },
  mounted() {
    // 调用方法获取品牌列表
    this.getTrademarkList()
  },
  methods: {
    // 根据页码和每页的条数来获取品牌信息列表数据
    async getTrademarkList() {
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
  },
}
</script>
<style >
</style>
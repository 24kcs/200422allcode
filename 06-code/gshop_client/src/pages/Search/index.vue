<template>
  <div>
    <TypeNav />Search
  </div>
</template>
<script>
export default {
  name: 'Search',
  mounted () {
    this.$store.dispatch('getProductList',{})
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
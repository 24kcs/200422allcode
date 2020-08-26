<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // async mounted () {
  //   const result = await this.$API.spu.getSpuInfoList(1,3,61)
  //   console.log(result)
  // }
}
</script>

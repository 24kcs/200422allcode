<template>
  <div class="container">
   <Search/>
   <Main/>
   <h2>真好</h2>
  </div>
</template>

<script>
  import Search from './components/Search'
  import Main from './components/Main'
  export default {
    name: 'App',

    components: {
      Search,
      Main
    }
  }
</script>

<style scoped>


</style>
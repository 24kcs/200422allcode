<template>
  <div>
    <h2 v-if="firstView">输入名称进行搜索</h2>
    <h2 v-else-if="loading">正在请求加载中...</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="user in users" :key="user.id">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
// 引入vuex中的辅助函数
import {mapState} from 'vuex'
export default {
  name: 'Main',
  computed: {
    // 获取状态数据
    ...mapState(['firstView','loading','users','errorMsg'])
  }
}
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>

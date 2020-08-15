<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrenPage(currentPage-1)">上一页</button>
    <!--第一页-->
    <button v-if="startOrEnd.start>1" @click="changeCurrenPage(1)">1</button>
    <!--第一个省略号-->
    <button disabled v-if="startOrEnd.start>2">...</button>
    <!--连续页码,动态的产生-->
    <button
      :class="{active:currentPage===num}"
      v-for="(num) in startOrEnd.end"
      :key="num"
      v-if="num>=startOrEnd.start"
      @click="changeCurrenPage(num)"
    >{{num}}</button>
    <!--第二个省略号-->
    <button disabled v-if="startOrEnd.end<totalPages-1">...</button>
    <!--最后一页-->
    <button v-if="startOrEnd.end<totalPages" @click="changeCurrenPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrenPage(currentPage+1)">下一页</button>
    <!--总条数的显示-->
    <button disabled style="margin-left:30px">共{{pageConfig.total}}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 用来接收外部组件传入进来的动态数据的,由于要传入的数据比较多,所以,定义成对象的方式
    pageConfig: {
      type: Object, // 传入的数据必然是对象类型
      // 设置传入进来的数据有个默认值(如果没传进来,起码有默认值)
      default: {
        total: 0, // 所有商品的总条数
        pageNo: 1, // 默认显示的是第一页的数据
        pageSize: 3, // 默认每页显示3条数据
        showPageNo: 5, // 连续的页码数
      },
    },
  },
  data() {
    return {
      // 当前的页码数(因为按钮的点击操作,修改显示不同数据的页码数)
      currentPage: this.pageConfig.pageNo, // 可以直接从接收的外部组件传入进来的数据中获取当前的页码数
    }
  },
  // 根据传入进来的总的数据条数和每页显示的数据条数,计算总的页码数(计算一共有多少页)
  computed: {
    // 计算总页码数(一共有多少页)
    totalPages() {
      // 获取总的数据条数,每页显示数据的条数
      const { total, pageSize } = this.pageConfig
      // 总的数据条数和每页显示的数据条数  他们的数据都要有意义才能进行计算(数据的值大于0)
      if (total <= 0 || pageSize < 0) return
      // 51条数据 ,每页10条数据---->总页:
      return Math.ceil(total / pageSize)
    },
    // 连续页码是需要进行计算的(要计算出来),是根据当前的页码进行计算,还需要知道连续的页码数
    // 要计算出连续页码的开始页码和结束页码
    startOrEnd() {
      // 获取总页码数,当前页码数,连续页码数
      // 解构的方式
      const {
        totalPages,
        currentPage,
        pageConfig: { showPageNo },
      } = this
      // 计算开始页码
      let start = 0
      start = currentPage - Math.floor(showPageNo / 2)
      // 当前页码 2 ,计算出来的开始页码就是0 ,根本就没有0这一页
      // 限定开始页码
      if (start < 1) {
        start = 1
      }
      // 计算结束页码
      let end = 0
      end = start + showPageNo - 1
      // 限定结束页码
      if (end > totalPages) {
        end = totalPages
        // 重新校验一下开始的页码
        start = end - showPageNo + 1
        // 再次限定一下开始页码 ,如果页码一共有4 个  1  2  3   4
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    },

    // startOrEnd() {
    //   // 获取总页码数,当前页码数,连续页码数
    //   // const totalPages = this.totalPages
    //   // const currentPage = this.currentPage
    //   // const showPageNo = this.pageConfig.showPageNo
    //   // 解构的方式
    //   const {
    //     totalPages,
    //     currentPage,
    //     pageConfig: { showPageNo },
    //   } = this

    //   // 计算开始页码
    //   let start = 0
    //   // 当前的页码 是  7
    //   // 连续页码  是  5
    //   // 开始页码  是 5
    //   // 开始页码 = 当前页码 - 向下取整(连续页码/2)
    //   start = currentPage - Math.floor(showPageNo / 2)
    //   // 当前页码 2 ,计算出来的开始页码就是0 ,根本就没有0这一页
    //   // 限定开始页码
    //   if (start < 1) {
    //     start = 1
    //   }
    //   // 计算结束页码
    //   let end = 0
    //   // 当前页码  9  结束页码 11
    //   // 结束页码 = 当前页码 + 向下取整(连续页码/2)
    //   // end = currentPage + Math.floor(showPageNo/2)
    //   // 结束页码 = 开始页码+ 连续页码 -1
    //   // 结束页码 = 7 +5 -1  = 11
    //   end = start + showPageNo - 1
    //   // 当前的页码是11 一共有 12页 ,连续页码是 5
    //   // 9  10  11  12  13
    //   // 结束页码: 12 开始页码向前移动一个 8
    //   // 限定结束页码
    //   if (end > totalPages) {
    //     end = totalPages
    //     // 重新校验一下开始的页码
    //     start = end - showPageNo + 1
    //     // 再次限定一下开始页码 ,如果页码一共有4 个  1  2  3   4
    //     if (start < 1) {
    //       start = 1
    //     }
    //   }
    //   return { start, end }
    // },
  },
  // 父级组件中重新获取数据的时候,确实是pageNo的页码数改变了,父级组件的页码数改变了,但是子级组件的页码数没有及时的改变过来
  watch: {
    // 如果你要监视的数据是对象中的某个属性值,那么请用成对的单引号可以括起来
    'pageConfig.pageNo'(val){
      // 立刻的更新当前的选中的页码数
      this.currentPage = val
    }
  },

  methods: {
    changeCurrenPage(pageNo) {
      // 修改当前的页码
      this.currentPage = pageNo
      // 通知父级组件,当前的页码改变了
      this.$emit('changeCurrentPage', pageNo)
    },
  },
}
</script>


<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      // cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

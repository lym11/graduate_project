<template>
    <div class="collect-wrap">
      <page-title title="我的收藏"/>
      <ul class="collect-list">
        <li v-for="(data, index) in data" :key="index">
          <sellers-list :data="data"/>
        </li>
      </ul>
    </div>
</template>

<script>
  import PageTitle from '../../components/page_title/PageTitle'
  import SellersList from '../../components/sellers_list/SellersList'
  import * as types from '../../store/mutationTypes'
  import { mapGetters } from 'vuex'
    export default {
      data () {
          return {
            data: []
          }
      },
      components: {
        PageTitle,
        SellersList
      },
      created () {
        this.$store.dispatch(types.GET_SELLERS_DATA)
        this.getCollectData()
      },
      computed: {
        ...mapGetters(['sellersData'])
      },
      methods: {
        getCollectData () {
          let id = localStorage.getItem('userId')
          let that = this
          this.$axios.get(`get_user_collect?id=${id}`)
            .then(res => {
              let arr = res.data.data
              let sellersArr = that.$store.getters.sellersData
              for (let i = 0; i < sellersArr.length; i++) {
                let data = sellersArr[i]
                for (let j = 0; j < arr.length; j++) {
                  if (data._id === arr[j]) {
                    that.data.push(data)
                  }
                }
              }
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .collect-wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    font-size 12px
    color #333
    background #F2F2F2
    .collect-list
      margin-top 40px
      & > li
        margin-bottom 2px
        padding 14px 10px
        border-bottom-1px(#ccc)
        font-size 10px
        background #fff
</style>

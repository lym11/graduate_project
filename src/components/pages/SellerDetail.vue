<template>
    <div class="wrap">
      <page-title :title="sellersData.name"/>
      <seller-detail-header :data="sellersData"/>
      <nav class="border-bottom-1px">
        <div @click="selectNav('Goods')" :class="{'active': current==='Goods'}">商品</div>
        <div @click="selectNav('Ratings')" :class="{'active': current==='Ratings'}">评价</div>
        <div @click="selectNav('Sellers')" :class="{'active': current==='Sellers'}">商家</div>
      </nav>
      <div :is="current">
      </div>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  import SellerDetailHeader from '../seller_detail_header/SellerDetailHeader'
  import Goods from '../pages/Goods'
  import Sellers from '../pages/Sellers'
  import Ratings from '../pages/Ratings'
  import * as types from '../../store/mutationTypes'
    export default {
      data () {
          return {
            current: 'Goods'
          }
      },
      computed: {
        sellersData () {
          let data = this.$store.getters.sellersData.find(item => item._id === this.$route.query.id)
          return data
        }
      },
      components: {
        PageTitle,
        SellerDetailHeader,
        Goods,
        Sellers,
        Ratings
      },
      created () {
        this.$store.dispatch(types.GET_SELLERS_DATA)
      },
      methods: {
        selectNav (nav) {
          this.current = nav
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    background #fff
    & > nav
      display flex
      height 40px
      line-height 40px
      border-bottom-1px(#ccc)
      & > div
        flex 1
        text-align center
        &.active
          color rgb(240, 20, 20)
</style>

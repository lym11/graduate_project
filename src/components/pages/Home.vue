<template>
    <div id="home-wrap">
      <div class="home-header">
        <router-link to="/my_app/location">
          <span class="icon-location"></span>
          <span><span v-if="!currentPosition.position">正在定位...</span>
            {{currentPosition.position}}</span>
        </router-link>
      </div>
      <ul class="list-nav border-bottom-1px">
        <li @click="selectNav('recommend')">
          <span :class="{active: currentNav === 'recommend'}">推荐商家</span>
        </li>
        <li @click="selectNav('nearBy')">
          <span :class="{active: currentNav === 'nearBy'}">附近商家</span>
        </li>
      </ul>
      <div>
        <ul>
          <li class="seller-list" v-for="(data, index) in sellersData"
              :key="index">
            <sellers-list :data="data"/>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import SellersList from '../sellers_list/SellersList'
  import { mapGetters } from 'vuex'
  import * as types from '../../store/mutationTypes'
    export default {
      data () {
          return {
            currentNav: 'recommend'
          }
      },
      components: {
        SellersList
      },
      created () {
        this.$store.dispatch(types.LOCATION)
        this.$store.dispatch(types.GET_SELLERS_DATA)
        this.$store.dispatch(types.GET_ORDER_DATA)
        this.$store.dispatch(types.GET_ADDRESS_DATA)
        // 由于未做用户登录功能，所以把用户的验证id保存在localStorage里面，当然这种做法是不好的
        localStorage.setItem('userId', '5ad1df59f34bdd2e3c0459c4')
      },
      computed: {
        ...mapGetters(['sellersData']),
        currentPosition () {
          return this.$store.state.location.currentPosition
        }
      },
      methods: {
        selectNav (nav) {
          this.currentNav = nav
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home-header
    padding 0 10px
    height 40px
    line-height 40px
    font-size 12px
    background-color #1D77FD
    & > a
      display flex
      color #fff
      .icon-location
        flex 0 0 20px
        line-height 40px
        font-size 16px
      & > span:nth-of-type(2)
        flex 1
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .list-nav
    display flex
    height 40px
    line-height 40px
    font-size 14px
    border-bottom-1px(#ccc)
    color #333
    background #fff
    & > li
      flex 1
      text-align center
      & > span
        display inline-block
        padding 0 20px
        height 100%
        border-bottom 2px solid transparent
        &.active
          border-bottom 2px solid #1D77FD
  .seller-list
    margin-bottom 2px
    padding 14px 10px
    font-size 10px
    background #fff
    & > a
      display flex
      color #222
      & > div:nth-of-type(1)
        flex 0 0 56px
        margin-right 14px
      & > div:nth-of-type(2)
        flex 1
        & > span
          display block
          margin-bottom 2px
        .seller-name
          display block
          font-size 13px
          font-weight 800
          color #000
      & > div:nth-of-type(3)
        flex 0 0 80px
        text-align right
        & > div
          display table
          width 100%
          height 100%
          & > span
            display table-cell
            vertical-align middle
</style>

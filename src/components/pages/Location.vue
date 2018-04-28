<template>
    <div class="location-wrap">
      <page-title title="选择收货地址"/>
      <router-link to="/my_app/my_address">地址管理</router-link>
      <div class="search-position-wrap">
        <span class="icon-search" @click="searchPosition"></span>
        <input id="search-position" type="text" placeholder="请输入地址" v-model="keyword" @input="searchPosition(keyword)"/>
        <span class="icon-close" v-if="keyword" @click="clearKeyWords"></span>
      </div>
      <div>当前位置</div>
      <div id="current-position">
        <span><span v-if="!currentPosition.position">正在定位...</span>
            {{currentPosition.position}}</span>
        <span @click="location()">重新定位</span>
      </div>
      <ul class="position-lists">
        <li v-for="(data, index) in positionsData.tips"
            :key="index"
            @click="selectPosition(data)">
          <span>{{data.name}}</span>
          <span style="margin-left:6px;font-size:13px;color:#bbb">({{data.district}})</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  import * as types from '../../store/mutationTypes'
  import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
              keyword: '',
              reLocation: false
            }
        },
        components: {
          PageTitle
        },
        computed: {
          ...mapGetters(['positionsData']),
          currentPosition () {
            return this.$store.state.location.currentPosition
          }
        },
        mounted () {
        },
        methods: {
          goBack () {
            this.$router.go(-1)
          },
          searchPosition (keyWords) {
            this.$store.dispatch(types.SEARCH_POSITION, keyWords)
          },
          clearKeyWords () {
            this.keyword = ''
          },
          selectPosition (position) {
            this.$store.dispatch(types.SELECT_POSITION, position)
            this.keyword = this.$store.getters.positionsData.tips.name
            this.$router.go(-1)
          },
          location () {
            this.$store.dispatch(types.LOCATION)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .location-wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    font-size 12px
    color #333
    background #F2F2F2
    & > a
      position absolute
      top 0
      right 10px
      height 40px
      line-height 40px
      color #fff
    .search-position-wrap
      display flex
      margin-top 40px
      padding 10px 8px
      font-size 12px
      background #fff
      & > input
        flex 1
        padding 6px 4px
        border none
        outline none
        background #F2F2F2
      .icon-search, .icon-close
        flex 0 0 20px
        text-align center
        line-height 34px
        background #F2F2F2
      .icon-close
        color #1D77FD
    & > div:nth-of-type(3)
      padding 12px 0 6px 12px
      font-size 13px
      color #333
    #current-position
      display flex
      padding 0 6px
      height 36px
      line-height 36px
      background #fff
      & > span:nth-of-type(1)
        flex 1
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        font-weight 600
      & > span:nth-of-type(2)
        flex 0 0 80px
        text-align center
        color #1D77FD
    .position-lists
      margin-top 20px
      & > li
        margin-bottom 4px
        padding 8px 10px
        font-size 14px
        color #222
        background #fff
</style>

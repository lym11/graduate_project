<template>
    <div class="self-wrap">
      <page-title title="我的"/>
      <div class="self-msg">
        <div>
          <img src="../../common/img/my_pic.jpg" width="60"/>
        </div>
        <div>
          <p>稀****客</p>
          <p>185***1548</p>
        </div>
      </div>
      <div class="my-address border-top-1px">
        <router-link to="/my_app/my_address">
          <span class="icon-location"></span>
          <span>我的收货地址</span>
          <span class="icon-keyboard_arrow_right"></span>
        </router-link>
      </div>
      <div class="my-collect border-top-1px">
        <router-link to="/my_app/my_collect">
          <span class="icon-favorite"></span>
          <span>我的收藏</span>
          <span class="icon-keyboard_arrow_right"></span>
        </router-link>
      </div>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
    export default {
      data () {
          return {}
      },
      components: {
        PageTitle
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .self-wrap
    font-size 0
    .self-msg
      display flex
      margin 50px 0 10px
      padding 6px 10px
      background #fff
      & > div:nth-of-type(1)
        flex 0 0 60px
        margin-right 16px
        & > img
          width 60px
          height 60px
          border-radius 50%
      & > div:nth-of-type(2)
        flex 1
        font-size 14px
        color #333
        & > p
          line-height 24px
    .my-address, .my-collect
      padding 0 10px
      height 40px
      line-height 40px
      font-size 13px
      background #fff
      border-bottom-1px(#ccc)
      & > a
        display flex
        color #333
        & > span:nth-of-type(1)
          flex 0 0 30px
          line-height 40px
          font-size 18px
          color #1D77FD
        & > span:nth-of-type(2)
          flex 1
          font-weight 600
        .icon-keyboard_arrow_right
          flex 0 0 30px
          line-height 40px
          font-size 20px
    .my-collect
      border-none()
</style>

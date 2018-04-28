<template>
    <div class="header">
      <div class="content-wrap">
        <div class="avatar-wrap" >
          <img :src="data.avatar" width="64" height="64"/>
        </div>
        <div>
          <div class="content-title">
            <span class="brand"></span>
            <h2>{{data.name}}</h2>
          </div>
          <p>{{data.description}}<span v-if="data.description">&nbsp;/&nbsp;</span>{{data.deliveryTime}}分钟送达</p>
          <support-slide v-if="data.supports" :classMap="classMap" :support="data.supports"/>
          <div v-if="data.supports.length>0" class="support-count">
            <span class="count">{{data.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="bullet-wrap">
        <span></span>
        <p>{{data.buttein}}</p>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="background">
        <img :src="data.avatar" width="100%"/>
      </div>
    </div>
</template>

<script>
  import SupportSlide from './SupportSlide'
    export default {
      data () {
          return {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
          }
      },
      props: {
        data: {
          required: true
        }
      },
      computed: {
      },
      components: {
        SupportSlide
      },
      created () {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    margin-top 40px
    overflow hidden
    color #fff
    background rgba(7, 17, 27, 0.5)
    .content-wrap
      display flex
      position relative
      padding 20px 28px 18px 14px
      font-size 0
      .avatar-wrap
        flex 0 0 64px
        margin-right 6px
        & > img
          border-radius 4px
      & > div:nth-of-type(2)
        flex 1
        margin-right 20px
        .content-title
          display flex
          .brand
            flex 0 0 30px
            height 18px
            margin-top 2px
            bg-image("../../common/img/brand")
            background-size 30px 18px
          & > h2
            flex 1
            margin-left 4px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 16px
            font-weight 600
        & > p
          margin 6px 0
          font-size 12px
        .support-count
          position absolute
          right 12px
          bottom 20px
          padding 0 8px
          height 24px
          text-align center
          border-radius 12px
          background rgba(0, 0, 0, 0.2)
          .count
            vertical-align top
            font-size 10px
            line-height 24px
          .icon-keyboard_arrow_right
            margin-left 2px
            font-size 10px
            line-height 24px

    .bullet-wrap
      display flex
      padding 0 6px
      height 28px
      line-height 29px
      background rgba(7, 17, 27, 0.2)
      & > span:nth-of-type(1)
        flex 0 0 22px
        bg-image("../../common/img/bulletin")
        background-size 22px 12px
        background-repeat no-repeat
        background-position center center
      & > p
        flex 1
        margin-left 10px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 10px
      .icon-keyboard_arrow_right
        flex 0 0 20px
        line-height 29px
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
</style>

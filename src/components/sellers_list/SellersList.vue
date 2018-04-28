<template>
    <div class="content-wrap">
      <router-link  :to="{path: '/my_app/home/seller_detail', query:{id: data._id}}">
        <div>
          <div>
            <img class="seller-pic" :src="data.avatar"/>
          </div>
          <div class="border-bottom-1px">
            <h1 class="seller-name">{{data.name}}</h1>
            <p>
              <start size="24" :score="data.score"/>
              <span class="score" style="margin-right: 6px;color:#f90;">{{data.score}}</span>
              <span class="month-sold">月售{{data.sellCount}}单</span>
            </p>
            <p>
              <span class="min-price" style="margin-right:2px">起送￥{{data.minPrice}}</span>|<span class="delivery-price" style="margin-left:2px">配送￥{{data.deliveryPrice}}</span>
            </p>
          </div>
          <div class="border-bottom-1px">
            <p><span>预计送达时间<br/>{{data.deliveryTime}}分钟</span></p>
          </div>
        </div>
        <ul>
          <li v-for="support in data.supports" :key="support.name">
            <span class="supp-icon" :class="iconMap[support.type]"></span>
            <span class="support-description">{{support.description}}</span>
          </li>
          <li class="support-count">
          </li>
        </ul>
      </router-link>
    </div>
</template>

<script>
  import Start from '../../components/start/Start'
    export default {
      data () {
          return {
            iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            isFold: false
          }
      },
      props: {
        data: {
          required: true
        }
      },
      components: {
        Start
      },
      methods: {
        foldList () {
          this.isFold = !this.isFold
        }
      },
      created () {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .content-wrap
    & > a
      display block
      color #333
      & > div:nth-of-type(1)
        display flex
        line-height 14px
        & > div:nth-of-type(1)
          flex 0 0 56px
          margin-right 14px
        & > div:nth-of-type(2)
          flex 1
          border-bottom-1px(#ccc)
          .seller-name
            margin-bottom 6px
            font-size 13px
            font-weight 800
            color #000
        & > div:nth-of-type(3)
          flex 0 0 70px
          border-bottom-1px(#ccc)
          & > p
            display table
            width 100%
            height 100%
            & > span
              display table-cell
              vertical-align middle
              text-align center
      & > ul
        position relative
        padding-left 70px
        margin-top 10px
        height 36px
        overflow hidden
        & > li
          height 18px
          line-height 18px
          .supp-icon
            display inline-block
            width 14px
            height 14px
            margin-right 6px
            vertical-align top
            background-repeat no-repeat
            background-position center center
            background-size 14px 14px
          .decrease
            bg-image("../../common/img/decrease_4")
          .discount
            bg-image("../../common/img/discount_4")
          .special
            bg-image("../../common/img/special_4")
          .invoice
            bg-image("../../common/img/invoice_4")
          .guarantee
            bg-image("../../common/img/guarantee_4")
        .support-count
           position absolute
           top 0
           right 0
           height 100%
           .icon
             display inline-block
             margin-left 2px
             vertical-align middle
             font-size 14px
           .icon-close
             font-size 10px
</style>

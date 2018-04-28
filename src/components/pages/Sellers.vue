<template>
    <div class="seller-wrap">
      <div class="border-bottom-1px">
        <h2>{{sellersData.name}}</h2>
        <p>
          <start size="36" :score="sellersData.score"/>
          <span>{{sellersData.score}}</span>
          <span>月售{{sellersData.sellCount}}单</span>
        </p>
        <p>
          <span class="icon-favorite"
                :class="{collected:isCollected}"
                @click="toggleCollect(sellersData._id)"></span>
          <span>{{collectTips}}</span>
        </p>
      </div>
      <ul>
        <li>
          <span class="list-title">起送价</span>
          <b>{{sellersData.minPrice}}</b>
          <span>元</span>
        </li>
        <li>
          <span class="list-title">商家配送</span>
          <b>{{sellersData.deliveryPrice}}</b>
          <span>元</span>
        </li>
        <li>
          <span class="list-title">平均送达时间</span>
          <b>{{sellersData.deliveryTime}}</b>
          <span>分钟</span>
        </li>
      </ul>
      <split/>
      <div class="bulletin">
        <h2>公告与活动</h2>
        <p>{{sellersData.bulletin}}</p>
        <ul>
          <li class="support-item border-top-1px" v-for="support in sellersData.supports" :key="support.type">
            <span class="supp-icon" :class="iconMap[support.type]"></span>
            <span>{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split/>
      <div class="seller-msg">
        <h2>商家信息</h2>
        <ul>
          <li class="infos-item border-top-1px" v-for="infos in sellersData.infos" :key="infos">{{infos}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Start from '../start/Start'
  import Split from '../split/Split'
    export default {
      data () {
          return {
            iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            isCollected: false,
            collect: false
          }
      },
      computed: {
        sellersData () {
          let data = this.$store.getters.sellersData.find(item => item._id === this.$route.query.id)
          return data
        },
        collectTips () {
          let str = ''
          if (this.isCollected) {
            str = '已收藏'
          } else {
            str = '收藏'
          }
          return str
        }
      },
      components: {
        Start,
        Split
      },
      created () {
        this.hasCollected()
      },
      methods: {
        toggleCollect (id) {
          this.collect = !this.collect
          if (this.collect) {
            this.$axios.post('/add_collect', {
              userId: localStorage.getItem('userId'),
              sellerId: id
            })
              .then(res => {
                if (res.data.success) {
                  this.isCollected = true
                }
              })
          } else {
            this.$axios.post('del_collect', {
              userId: localStorage.getItem('userId'),
              sellerId: id
            })
              .then(res => {
                if (res.data.success) {
                  this.isCollected = false
                }
              })
          }
        },
        hasCollected () {
          this.$axios.get(`/get_user_collect?id=${localStorage.getItem('userId')}`)
            .then(res => {
              let collectData = res.data.data
              collectData.find(item => {
                if (item === this.sellersData._id) {
                  this.isCollected = true
                }
              })
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .seller-wrap
    background #fff
    h2
      margin 18px 18px 8px 18px
      line-height 14px
      font-size 14px
      color rgb(7,  17, 27)
    & > div:nth-of-type(1)
      position relative
      margin 0 18px
      padding 18px 0
      font-size 0
      border-bottom-1px(#ccc)
      color rgb(7, 17, 27)
      & > h2
        margin 0 0 8px 0
        line-height 14px
        font-size 14px
      & > p:nth-of-type(1)
        color #4d555d
        & > span:nth-of-type(1)
          margin 0 12px 0 8px
          font-size 14px
          color #f90
        & > span:nth-of-type(2)
          font-size 11px
      & > p:nth-of-type(2)
        position absolute
        top 18px
        right -30px
        width 100px
        text-align center
        color #4d555d
        & > span:nth-of-type(2)
          display block
          margin-top 4px
          line-height 10px
          font-size 10px
        .icon-favorite
          font-size 24px
          color #E6E7E8
          &.collected
            color #F01414
    & > ul
      display flex
      padding 18px 0
      & > li
        flex 1
        text-align center
        font-size 0
        border-right 1px solid #ccc
        color rgb(7, 17, 27)
        & > span
          font-size 12px
        & > b
          display inline-block
          margin-top 4px
          line-height 24px
          font-size 24px
          font-weight 200
        .list-title
          display block
          line-height 10px
          font-size 10px
          color #93999f
      & > li:last-of-type
        border-right none
    .bulletin
      & > p
        margin 0 30px
        padding-bottom 16px
        line-height 24px
        font-size 12px
        font-weight 200
        color #f01414
      .support-item
        margin 0 30px
        padding 16px 0
        font-size 12px
        font-weight 200
        color rgb(7, 17, 27)
        border-top-1px(#ccc)
        .supp-icon
          display inline-block
          width 16px
          height 16px
          margin-right 6px
          vertical-align top
          background-repeat no-repeat
          background-position center center
          background-size 16px 16px
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
    .seller-msg
      .infos-item
        margin 0 30px
        padding 16px 0
        font-size 12px
        font-weight 200
        color rgb(7, 17, 27)
        border-top-1px(#ccc)
</style>

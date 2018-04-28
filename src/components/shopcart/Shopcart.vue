<template>
  <div class="shop-cart-wrapper">
    <div class="shop-cart" @click="toggleList()">
      <span class="shop-cart-left">
        <span class="logoWrap">
          <span><i class="icon-shopping_cart"></i></span>
          <span v-show="num">{{num}}</span>
        </span>
        <span :class="{highlight: totalPrice}">￥{{totalPrice}}</span>
        <span>另需配送费￥{{deliveryPrice}}元</span>
      </span>
      <span class="shop-cart-right" :class="{'enough': totalPrice>=minPrice}">
      <span @click="submitOrder">{{payMsg}}</span>
      </span>
    </div>
    <transition name="fold">
      <div class="shop-cart-list" v-show="listShow">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="empty" @click="empty()">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-bottom-1px" v-for="food in shopCartGood" :key="food.name">
              <span class="name">{{food.name}}</span>
              <div class="price">¥{{food.price}}</div>
              <div class="cart-control-wrapper">
                <add-des :name="food.name"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="list-mask" v-show="listShow" @click="toggleList()"></div>
  </div>
</template>

<script>
  import AddDes from '../addDes/AddDes'
  import IScroll from 'iscroll'
  import * as types from '../../store/mutationTypes'
  export default {
    props: {
      minPrice: Number,
      deliveryPrice: Number,
      foods: Array
    },
    data () {
      return {
        fold: true
      }
    },
    components: {
      AddDes
    },
    computed: {
      num () {
        let num = 0
        this.shopCartGood.forEach(item => {
          num += item.count
        })
        return num
      },
      totalPrice () {
        let total = 0
        this.shopCartGood.forEach(item => {
          total += (item.count * item.price)
        })
        return total
      },
      payMsg () {
        let str = ``
        if (!this.num) {
          str = `￥${this.minPrice}起送`
        } else if (this.minPrice > this.totalPrice) {
          str = `还差￥${this.minPrice - this.totalPrice}起送`
        } else if (this.minPrice <= this.totalPrice) {
          str = '去结算'
        }
        return str
      },
      listShow () {
        if (!this.num) {
          // eslint-disable-next-line
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // eslint-disable-next-line
              this.scroll = new IScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      },
      shopCartGood () {
        let id = this.$route.query.id
        let arr = []
        this.$store.state.home.shopCartGood.forEach(item => {
          if (item.sellerId === id) {
            arr.push(item)
          }
        })
        return arr
      }
    },
    methods: {
      toggleList () {
        if (!this.num) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.$store.dispatch(types.EMPTY)
      },
      submitOrder () {
        let id = this.$route.query.id
        this.$store.dispatch(types.GET_SELLER_ID, id)
        if (this.minPrice < this.totalPrice) {
          let time = new Date().valueOf()
          this.$store.dispatch(types.GET_ORDER_TIME, time)
          this.$router.push('/my_app/confirm_order')
        }
      }
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .shop-cart
    position fixed
    bottom 0
    left 0
    z-index 50
    display flex
    width 100%
    height 48px
    font-size 0
    background #141d27
    .shop-cart-left
      flex 1
      padding 12px 0
      & > span:nth-of-type(1)
        position absolute
        left 12px
        top -12px
        z-index 10
        width 56px
        height 56px
        padding 6px
        border-radius 50%
        background #141d27
        @media only screen and (max-width:320px)
          left 2px
        & > span:nth-of-type(1)
          display inline-block
          width 100%
          height 100%
          line-height 44px
          vertical-align top
          text-align center
          font-size 24px
          border-radius 50%
          background #2B333B
          color rgba(255, 255, 255, 0.4)
          &.highlight
            color #fff
            background rgb(0, 160, 220)
        & > span:nth-of-type(2)
          position absolute
          top 0
          right 0
          width 20px
          height 20px
          line-height 20px
          padding 0 6px
          border-radius 50%
          text-align center
          font-size 9px
          font-weight 700
          color #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      & > span:nth-of-type(2)
        margin 0 12px 0 80px
        padding-right 12px
        line-height 24px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 24px
        font-weight 700
        color rgba(255, 255, 255, 0.4)
        @media only screen and (max-width: 320px)
          margin  0 4px 0 56px
          font-size 18px
        &.highlight
          color #fff
      & > span:nth-of-type(3)
        line-height 24px
        font-size 12px
        color rgba(255, 255, 255, 0.4)
        vertical-align top
    .shop-cart-right
      flex  0 0 105px
      width 105px
      padding 12px 4px
      line-height 24px
      text-align center
      font-size 14px
      font-weight 700
      background #2B333B
      color rgba(255, 255, 255, 0.4)
      @media only screen and (max-width: 320px)
        flex 0 0 100px
      &.enough
        background #00c850
        color #fff
  .shop-cart-list
    position absolute
    bottom 48px
    left 0
    z-index 45
    width 100%
    transition all 0.5s
    &.fold-enter, &.fold-leave-to
      opacity 0
      transform translateY(100%)
    .list-header
      padding: 0 18px
      height 40px
      background #f3f5f7
      line-height 40px
      border-bottom rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        font-weight 200
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        display flex
        padding 12px 0
        border-bottom-1px(rgba(7, 17, 27, 0.1))
        .name
          flex 1
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          flex 0 0 24px
          width 24px
          margin-left 18px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cart-control-wrapper
          flex 0 0 72px
          margin-left 12px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background-filter: blur(10px)
    background rgba(7, 17, 27, 0.6)
</style>

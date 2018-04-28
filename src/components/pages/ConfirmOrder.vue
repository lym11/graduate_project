<template>
    <div class="wrap">
      <page-title title="确认订单"/>
      <div class="add-address">
        <router-link to="/my_app/my_address">
          <div class="add" v-if="!currentAddressData.addressLabel">
            <span class="icon-add_circle"></span>
            <span>添加收货地址</span>
          </div>
          <div class="address" v-if="currentAddressData.addressLabel">
            <p>订单配送至<span>{{currentAddressData.addressLabel}}</span></p>
            <p>{{currentAddressData.address}}{{currentAddressData.detailAddress}}</p>
            <p><span>{{currentAddressData.name}}({{currentAddressData.sexLabel}})</span>{{currentAddressData.tel}}</p>
            <p><span class="icon-keyboard_arrow_right"></span></p>
          </div>
        </router-link>
      </div>
      <split/>
      <ul>
        <li class="border-bottom-1px">
          <span>送达时间</span>
          <span>尽快送达({{deliveryTime}}送达)</span>
        </li>
        <li>
          <span>支付方式</span>
          <span>在线支付</span>
        </li>
      </ul>
      <split/>
      <div class="seller-msg">
        <h2>{{sellersData.name}}</h2>
        <ul class="border-top-1px">
          <li class="border-bottom-1px shop-cart-good" v-for="(good, index) in shopCartGood" :key="index">
            <img :src="good.icon" width="30" height="30"/>
            <span>{{good.name}}</span>
            <span>x{{good.count}}</span>
            <span>￥{{good.price * good.count}}</span>
          </li>
          <li class="border-bottom-1px delivery-price">
            <span>配送费</span>
            <span>￥{{sellersData.deliveryPrice}}</span>
          </li>
          <li class="total">
            <span>小计￥</span>
            <span style="font-size:18px">{{totalPrice}}</span>
          </li>
        </ul>
      </div>
      <div class="submit" @click="confirmOrder()">提交订单</div>
    </div>
</template>

<script>
  import PageTitle from '../../components/page_title/PageTitle'
  import Split from '../../components/split/Split'
  import { mapGetters } from 'vuex'
  import { deliveryTimeStr } from '../../common/js/date'
    export default {
      data () {
          return {
            orderTime: this.$store.state.home.orderTime
          }
      },
      components: {
        PageTitle,
        Split
      },
      computed: {
        ...mapGetters(['currentAddressData', 'sellersData']),
        deliveryTime () {
          return deliveryTimeStr(this.orderTime, this.sellersData.deliveryTime)
        },
        totalPrice () {
          let price = 0
          this.shopCartGood.forEach(item => {
            price += (item.count * item.price)
          })
          price += this.sellersData.deliveryPrice
          return price
        },
        sellersData () {
          let data = this.$store.getters.sellersData.find(item => item._id === this.$store.state.home.currentSellerId)
          return data
        },
        shopCartGood () {
          let id = this.$store.state.home.currentSellerId
          let arr = []
          this.$store.state.home.shopCartGood.forEach(item => {
            if (item.sellerId === id) {
              arr.push(item)
            }
          })
          return arr
        }
      },
      created () {
      },
      methods: {
        confirmOrder () {
          // 确认订单，需要传递的参数如下：
          // userId, sellerId addressId orderTime totalPrice foods_list
          let that = this
          this.$axios.post(`add_order`, {
            userId: localStorage.getItem('userId'),
            sellerId: that.sellersData._id,
            addressId: that.$store.getters.currentAddressData._id,
            orderTime: that.orderTime,
            totalPrice: that.totalPrice,
            foods_list: that.shopCartGood,
            status: '订单正在派送中...'
          })
            .then(res => {
              if (res.data.success) {
                this.$router.push('/my_app/order')
              }
            })
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
    bottom 40px
    left 0
    font-size 14px
    background #fff
    .add-address
      margin-top 40px
      padding 18px 0
      text-align center
      & > a
        display block
        padding 0 10px
        text-align left
        color #999
        .add
          display block
          margin 0 auto
          width 140px
          height 32px
          line-height 32px
          text-align center
          color #2395ff
          border 1px solid #2395ff
          border-radius 20px
          .icon-add_circle
            vertical-align middle
            font-size 18px
        .address
          position relative
          font-size 12px
          & > p:nth-of-type(1)
            line-height 18px
            & > span:nth-of-type(1)
              display inline-block
              margin-left 2px
              width 28px
              height 14px
              line-height 14px
              text-align center
              border 1px solid #01D762
              font-size 10px
              color #01D762
          & > p:nth-of-type(2)
            margin-right 10px
            line-height 24px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 14px
            font-weight 600
            color #333
          & > p:nth-of-type(3)
            color #333
            & > span:nth-of-type(1)
              margin-right 6px
          & > p:nth-of-type(4)
            position absolute
            top 21px
            right 0
            font-size 16px
            color #333
    & > ul:nth-of-type(1)
      padding 0 10px
      & > li
        display flex
        height 40px
        line-height 40px
        border-bottom-1px(#ccc)
        & > span:nth-of-type(1)
          flex 0 0 100px
        & > span:nth-of-type(2)
          flex 1
          text-align right
          color #2395ff
      & > li:last-of-type
        border-none()
    .seller-msg
      padding 0 10px
      background #fff
      & > h2
        height 40px
        line-height 40px
        font-weight 600
        color #333
      & > ul
        border-top-1px(#ccc)
        & > li
          display flex
          height 40px
          line-height 40px
          border-bottom-1px(#ccc)
        .shop-cart-good
          & > img
            flex 0 0 30px
            margin 5px 10px 5px 0
          & > span:nth-of-type(1)
            flex 1
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 12px
          & > span:nth-of-type(2)
            flex 0 0 30px
            margin-left 6px
            font-size 10px
          & > span:nth-of-type(3)
            flex 0 0 50px
            text-align right
            color red
        .total
          display block
          text-align right
          border-none()
        .delivery-price
          display flex
          & > span:nth-of-type(1)
            flex  0 0 100
          & > span:nth-of-type(2)
            flex 1
            text-align right
    .submit
      margin 20px auto 20px
      width 280px
      height 40px
      line-height 40px
      text-align center
      border none
      border-radius 8px
      color #fff
      background #00E067
</style>

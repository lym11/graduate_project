<template>
    <div class="order-detail-wrap">
      <page-title title="订单详情"/>
      <div class="order-title">
        <div>
          <img :src="sellerData.avatar"/>
        </div>
        <h2>{{orderData.status}}<span class="icon-keyboard_arrow_right"></span></h2>
        <p>感谢您对店家的信任，请耐心等待...</p>
      </div>
      <ul class="pay-detail">
        <li class="border-bottom-1px">
          <router-link :to="{path:'/my_app/home/seller_detail', query:{id: orderData.seller}}">
            <img :src="sellerData.avatar"/>
            <h3 v-if="sellerData.name">{{sellerData.name}}</h3>
            <span class="icon-keyboard_arrow_right"></span>
          </router-link>
        </li>
        <li class="border-bottom-1px" v-for="(food, index) in orderData.foods_list" :key="index">
          <span>{{food.name}}</span>
          <span>x{{food.count}}</span>
          <span>￥{{food.count * food.price}}</span>
        </li>
        <li class="border-bottom-1px">
          <span>配送费</span>
          <span>x1</span>
          <span>￥{{sellerData.deliveryPrice}}</span>
        </li>
        <li class="border-bottom-1px">
          <span>实付<span style="font-size:15px">￥{{totalPrice}}</span></span>
        </li>
      </ul>
      <ul class="delivery-detail">
        <li class="border-bottom-1px">
          <h3>配送信息</h3>
        </li>
        <li class="border-bottom-1px">
          <span>送达时间：</span>
          <span>尽快送达[{{deliveryTime}}]</span>
        </li>
        <li class="border-bottom-1px">
          <span>送货地址：</span>
          <span>
            <span id="name">{{addressData.name}}({{addressData.sexLabel}})</span>
            <span id="tel">{{addressData.tel}}</span>
            <span id="address">{{addressData.detailAddress}}{{addressData.address}}</span>
          </span>
        </li>
        <li class="border-bottom-1px">
          <span>配送方式：</span>
          <span>商家配送</span>
        </li>
      </ul>
      <ul class="order-detail">
        <li class="border-bottom-1px">
          <h3>订单信息</h3>
        </li>
        <li class="border-bottom-1px">
          <span>订单号：</span>
          <span>{{orderData.orderTime}}</span>
        </li>
        <li class="border-bottom-1px">
          <span>支付方式：</span>
          <span>在线支付</span>
        </li>
        <li class="border-bottom-1px">
          <span>下单时间：</span>
          <span>{{parseInt(orderData.orderTime )| formDate}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  import {formDate, deliveryTimeStr} from '../../common/js/date'
  import * as types from '../../store/mutationTypes'
    export default {
      data () {
          return {}
      },
      components: {
        PageTitle
      },
      computed: {
        orderData () {
          let data
          data = this.$store.getters.orderData.find(item => item._id === this.$route.query.orderId)
          return data
        },
        sellerData () {
          let data
          let orderData = this.$store.getters.orderData.find(item => item._id === this.$route.query.orderId)
          let sellersData = this.$store.getters.sellersData
          console.log(orderData, sellersData)
          for (let i = 0; i < sellersData.length; i++) {
           if (orderData.seller === sellersData[i]._id) {
             data = Object.assign({}, sellersData[i])
           }
          }
          return data
        },
        totalPrice () {
          return this.orderData.totalPrice + this.sellerData.deliveryPrice
        },
        deliveryTime () {
          return deliveryTimeStr(parseInt(this.orderData.orderTime), parseInt(this.sellerData.deliveryTime))
        },
        addressData () {
          return this.$store.getters.addressData.find(item => item._id === this.orderData.user_address)
        }
      },
      filters: {
        // 显示特定格式的时间
        formDate (time) {
          let date = new Date(time)
          return formDate(date, 'yyyy-MM-dd hh:mm')
        }
      },
      created () {
        this.$store.dispatch(types.GET_ADDRESS_DATA)
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-detail-wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    font-size 12px
    color #333
    background #F2F2F2
    .order-title
      margin 40px 0 2px
      padding 20px 0
      background #fff
      & > div
        margin 0 auto 6px
        width 80px
        height 80px
        border-radius 50%
        & > img
          width 100%
          height 100%
          border-radius 50%
      & > h2
        text-align center
        font-size 16px
        font-weight 800
        color #000
      & > p
        margin-top 4px
        text-align center
        font-size 12px
        color #999
    .pay-detail
      padding 0 10px
      background #fff
      & > li
        display flex
        height 40px
        line-height 40px
        border-bottom-1px(#ccc)
        & > span
          flex 0 0 40px
        & > span:nth-of-type(1)
          flex 1
      & > li:nth-of-type(1)
        display block
        & > a
          display flex
          color #333
          & > img
            flex 0 0 20px
            margin 10px 10px 10px 0
            height 20px
          & > h3
            flex 1
            font-size 13px
            font-weight 600
          & > span
            flex 0 0 30px
            line-height 36px
            font-size 20px
      & > li:last-of-type
        display block
        height 60px
        line-height 60px
        text-align right
    .delivery-detail, .order-detail
      padding 0 10px
      margin-bottom 14px
      background #fff
      & > li
        display flex
        padding 14px 0
        border-bottom-1px(#ccc)
        & > h3
          font-size 13px
          font-weight 600
        & > span:nth-of-type(1)
          flex 0 0 60px
        & > span:nth-of-type(2)
          flex 1
        #name, #tel, #address
          display block
          margin-bottom 4px
          color #6e6e6e
      & > li:last-of-type
        border-none()
</style>

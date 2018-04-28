<template>
    <div class="order-wrap">
      <page-title title="我的订单"/>
      <div class="order-list-wrap">
        <ul>
          <li class="order-lists" v-for="(order, index) in orderData" :key="index">
            <router-link class="list-top" :to="{path:'/my_app/order/order_detail', query:{orderId: order._id}}">
              <div class="list-top">
                <router-link to="/my_app/home/seller_detail">
                  <img :src="order.avatar"/>
                </router-link>
                <div class="border-bottom-1px">
                  <h2>{{order.name}}</h2>
                  <time>{{parseInt(order.orderTime) | formDate}}</time>
                </div>
                <div class="border-bottom-1px">
                  <span>{{order.status}}</span>
                </div>
              </div>
              <div class="list-bottom border-bottom-1px">
                <span><span
                  v-for="(food, index) in order.foods_list" :key="index">{{food.name}}</span>
                </span>
                <span v-if="order.foods_list.length>1">等{{order.foods_list.length}}件商品</span>
                <span>￥{{order.totalPrice}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  import * as types from '../../store/mutationTypes'
  import {formDate} from '../../common/js/date'
    export default {
      data () {
          return {
            data1: ''
          }
      },
      components: {
        PageTitle
      },
      computed: {
        orderData () {
          // 因为查询订单接口关于商家的数据只有商家的id，所以需要获取所有商家数据和订单数据，如果订单中商家id与商家数据的id相同就拿出商家名和图片加到订单数据中
          let data = []
          let orderData = this.$store.getters.orderData
          let sellersData = this.$store.getters.sellersData
          for (let i = 0; i < orderData.length; i++) {
            let o = {}
            for (let j = 0; j < sellersData.length; j++) {
              if (sellersData[j]._id === orderData[i].seller) {
                o = Object.assign({}, orderData[i], sellersData[j], {_id: orderData[i]._id})
                data.push(o)
              }
            }
          }
          return data
        }
      },
      created () {
        // 获取所有订单数据
        this.$store.dispatch(types.GET_ORDER_DATA)
      },
      methods: {
        test () {
          let data = []
          let orderData = this.$store.getters.orderData
          let sellersData = this.$store.getters.sellersData
          for (let i = 0; i < orderData.length; i++) {
            let o = {}
            for (let j = 0; j < sellersData.length; j++) {
              if (sellersData[j]._id === orderData[i].seller) {
                o = Object.assign({}, orderData[i], {name: sellersData[i].name, avatar: sellersData[i].avatar})
                data.push(o)
              }
            }
          }
          console.log(data)
        }
      },
      filters: {
        // 显示特定格式的时间
        formDate (time) {
          let date = new Date(time)
          return formDate(date, 'yyyy-MM-dd hh:mm')
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .order-list-wrap
    margin 50px 0 80px
    font-size 11px
    .order-lists
      margin-bottom 10px
      padding 14px 10px
      background #fff
      & > a
        color #333
        .list-top
          display flex
          & > a
            flex 0 0 34px
            margin-right 14px
          & > div:nth-of-type(1)
            flex 1
            padding-bottom 14px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            border-bottom-1px(#eee)
            & > h2
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              font-size 16px
              color #222
            & > time
              font-size 10px
              color #999
          & > div:nth-of-type(2)
            flex 0 0 100px
            padding-bottom 14px
            text-align right
            border-bottom-1px(#eee)
        .list-bottom
          display flex
          height 40px
          line-height 40px
          border-bottom-1px(#eee)
          & > span:nth-of-type(1)
            flex 1
            margin-left 34px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          & > span:nth-of-type(2)
            flex 0 0 60px
          & > span:last-of-type
            flex 0 0 100px
            text-align right
            font-size 12px
            font-weight 600
            color #000
</style>

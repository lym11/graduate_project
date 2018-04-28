<template>
    <div class="goods-wrap">
      <div class="goods-menu" ref="goodsMenu">
        <ul  class="menu-list" >
          <li v-for="(goods, index) in goodsData" :key="index"  @click="chooseMenu(index)" :class="{active: current === index}">
            <span class="border-bottom-1px">
              <span class="support-icon"
                        :class="iconMap[goods.type]"
                        v-show="goods.type>1"></span>{{goods.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-list" ref="goodsList">
        <ul>
          <li class="goods-item border-bottom-1px"
              v-for="(item, index) in goodsData"
              :key="index" ref="goodsItem"
          >
            <h2>{{item.name}}</h2>
            <ul>
              <li class="food-item" v-for="food in item.good_foods" :key="food.name">
                <div><img :src="food.icon" width="57" height="57"/></div>
                <div>
                  <h3>{{food.name}}</h3>
                  <p v-if="food.descirption">{{food.descirption}}</p>
                  <p><span style="margin-right: 4px">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>%</p>
                  <p><span style="margin-right:8px;font-size:14px;color:#f01414;">￥{{food.price}}</span><span v-if="food.oldPrice" style="text-decoration:line-through">￥{{food.oldPrice}}</span></p>
                  <p class="count-control">
                    <add-des :name="food.name"/>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart class="shop-cart" ref="shopCart"
                 :deliveryPrice="sellersData.deliveryPrice"
                 :minPrice="sellersData.minPrice"
      />
    </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import ShopCart from '../shopcart/Shopcart'
  import AddDes from '../addDes/AddDes'
    export default {
      data () {
        return {
          iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
          heightArr: [],
          scrollY: 0,
          shopCartGood: [],
          goodsData: []
        }
      },
      components: {
        ShopCart,
        AddDes
      },
      computed: {
        current () {
          for (let i = 0; i < this.heightArr.length - 1; i++) {
            let height1 = this.heightArr[i]
            let height2 = this.heightArr[i + 1]
            if (this.scrollY >= height1 && this.scrollY < height2) {
              return i
            }
          }
          return 0
        },
        sellersData () {
          let data = this.$store.getters.sellersData.find(item => item._id === this.$route.query.id)
          return data
        }
      },
      created () {
        this.$axios.get(`get_seller?id=${this.$route.query.id}`)
          .then(res => {
            this.goodsData = res.data.data[0].goods
            this.$nextTick(() => {
              this._initIScroll()
              this._calculateHeight()
            })
          })
      },
      updated () {
      },
      methods: {
        _initIScroll () {
          this.goodsMenu = new IScroll(this.$refs.goodsMenu, {
            click: true
          })
          this.goodsList = new IScroll(this.$refs.goodsList, {
            click: true,
            probeType: 3
          })
          let self = this
          this.goodsList.on('scroll', function () {
            self.scrollY = Math.abs(Math.round(this.y))
          })
        },
        _calculateHeight () {
          let goodsItem = this.$refs.goodsItem
          let hei = 0
          this.heightArr.push(0)
          goodsItem.forEach(item => {
            hei += item.clientHeight
            this.heightArr.push(hei)
          })
        },
        chooseMenu (index) {
          let toHeight = this.heightArr[index]
          this.goodsList.scrollTo(0, -toHeight, 500)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods-wrap
    display flex
    position absolute
    top 210px
    bottom 46px
    width 100%
    overflow hidden
    .goods-menu
      flex 0 0 80px
      width 80px
      height 100%
      background #f3f5f7
      .menu-list
        font-size 0
        color #4d555d
        & > li
          display table
          width 100%
          height 54px
          padding 0 12px
          & > span
            display table-cell
            text-align center
            vertical-align middle
            line-height 12px
            font-size 12px
            border-bottom-1px(#ccc)
            .support-icon
              display inline-block
              width 12px
              height 12px
              vertical-align top
              background-size 12px 12px
              background-repeat no-repeat
              background-position center center
              &.decrease
                bg-image('../../common/img/decrease_3')
              &.discount
                bg-image('../../common/img/discount_3')
              &.special
                bg-image('../../common/img/special_3')
              &.invoice
                bg-image('../../common/img/invoice_3')
              &.guarantee
                bg-image('../../common/img/guarantee_3')
          &.active
            position relative
            top -1px
            z-index 10
            background #fff
            & > span
              font-weight 600
              color rgb(7, 17, 27)
              border-none()
        & > li:last-of-type
          & > span
            border-none()
    .goods-list
      flex 1
      height 100%
      .goods-item
        font-size 0
        & > h2
          padding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color #93999f
          background #f3f5f7
        .food-item
          position relative
          display flex
          margin 0 18px
          padding 18px 0
          border-bottom-1px(#ccc)
          &:last-of-type
            border-none()
          & > div:nth-of-type(1)
            flex 0 0 57px
            margin-right 10px
          & > div:nth-of-type(2)
            flex 1
            & > h3
              margin 2px 0 8px
              line-height 13px
              font-size 13px
              color #07111b
            & > p
              line-height 12px
              font-size 10px
              color #93999f
            & > p:nth-of-type(2)
              margin 8px 0
              & > span:nth-of-type(1)
                margin-right 4px
            .count-control
               position absolute
               bottom 18px
               right 18px
               @media only screen and (max-width:320px)
                 right -14px
</style>

<template>
  <div class="wrapper">
    <transition name="move">
    <span class="cart-dec icon-remove_circle_outline"
          v-show="food.count>0"
          @click.stop="decFromCart()"
    ></span>
    </transition>
    <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
    <span class="cart-add icon-add_circle" @click.stop="addToCart()"></span>
  </div>
</template>

<script>
  import * as types from '../../store/mutationTypes'
  export default {
    props: {
      name: String
    },
    data () {
      return {
        id: this.$route.query.id
      }
    },
    computed: {
      food () {
        let food = this.$store.state.home.shopCartGood.find(item => item.name === this.name)
        if (!food) {
          food = {name: this.name, count: 0}
        }
        return food
      }
    },
    created () {
      this.$store.dispatch(types.GET_GOODS_DATA, this.$route.query.id)
    },
    methods: {
      addToCart () {
        this.$store.dispatch(types.ADD_TO_CART, {name: this.name, data: this.$store.getters.goodsData, id: this.id})
      },
      decFromCart () {
        this.$store.dispatch(types.DEC_FROM_CART, this.name)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .wrapper
    font-size 0
    .cart-dec
      display inline-block
      line-height 24px
      vertical-align top
      font-size 24px
      color rgb(0, 160, 220)
      transition all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity  0
        transform translateX(24px) rotate(180deg)
    .cart-count
      display inline-block
      width 24px
      line-height 24px
      vertical-align top
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      line-height 24px
      vertical-align top
      font-size 24px
      color rgb(0, 160, 220)
</style>

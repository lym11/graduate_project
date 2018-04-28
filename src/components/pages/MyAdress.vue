<template>
    <div class="my-address-wrap">
      <page-title title="我的地址"/>
      <ul class="address-list">
        <li  class="active border-bottom-1px"
             v-for="(data, index) in addressData"
             :key="index" v-if="data.name"
            >
          <div @click="chooseAddress(index)">
            <span
              :class="{active: selectedIndex === index}" class="icon-check_circle "></span>
          </div>
          <div>
            <p>
              <span id="name">{{data.name}}</span>
              <span id="sex-label">{{data.sexLabel}}</span>
              <span id="tel">{{data.tel}}</span>
            </p>
            <p>
              <span id="address-label">{{data.addressLabel}}</span>
              <span id="address">{{data.detailAddress}}{{data.address}}</span>
            </p>
          </div>
          <div @click="edit(index)">
            <router-link to="/my_app/edit_address" style="color: #ccc">
              <span class="icon-edit"></span>
            </router-link>
          </div>
        </li>
      </ul>
      <div class="add-address">
        <router-link to="/my_app/add_address">
          <span class="icon-add_circle"></span>增加收货地址
        </router-link>
      </div>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  import * as types from '../../store/mutationTypes'
  import { mapGetters } from 'vuex'
    export default {
      data () {
          return {
            selectedIndex: -1
          }
      },
      components: {
        PageTitle
      },
      computed: {
        ...mapGetters(['addressData'])
      },
      created () {
        this.$store.dispatch(types.GET_ADDRESS_DATA)
      },
      methods: {
        edit (index) {
          this.$store.dispatch(types.GET_EDIT_INDEX, index)
        },
        chooseAddress (index) {
          this.selectedIndex = index
          let address = this.$store.getters.addressData[index]
          this.$store.dispatch(types.CHOOSE_CURRENT_ADDRESS, address)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .my-address-wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    background #F2F2F2
    .address-list
      margin-top 40px
      color #555
      & > li
        position relative
        display flex
        padding 10px
        border-bottom-1px(#ccc)
        background #fff
        & > div:nth-of-type(1)
          flex 0 0 30px
          & > span
            display table-cell
            width 30px
            height 36px
            vertical-align middle
            font-size 20px
            color #ccc
            &.active
              color #01D762
        & > div:nth-of-type(2)
          flex 1
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          & > p
            font-size 12px
            line-height 18px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            #name
              margin-right 2px
              font-size 14px
              font-weight 600
              color #000
            #sex-label, #tel
              font-size 13px
            #tel
              margin-left 8px
            #address-label
              display inline-block
              margin-right 2px
              width 28px
              height 14px
              line-height 14px
              text-align center
              border 1px solid #01D762
              font-size 10px
              color #01D762
            #address
              margin-right 20px
              font-size 12px
        & > div:nth-of-type(3)
          flex 0 0 40px
          text-align center
    .add-address
      position absolute
      bottom 0
      left 0
      width 100%
      height 40px
      line-height 40px
      text-align center
      font-size 12px
      background #fff
      & > a
        display block
        color #1D77FD
        .icon-add_circle
          margin-right 6px
          vertical-align top
          font-size 14px
</style>

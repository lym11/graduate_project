<template>
  <div class="edit-address-wrap">
    <page-title title="添加地址"/>
    <ul class="edit-list">
      <li class="border-bottom-1px">
        <span class="list-title">联系人</span>
        <input id="name" class="border-bottom-1px" type="text" v-model="addressData.name"/>
      </li>
      <li class="border-bottom-1px">
          <span class="label"
                :class="{'active': addressData.sexLabel==='先生'}"
                @click="selectSexLabel('先生')">先生</span>
        <span class="label"
              :class="{'active': addressData.sexLabel==='女士'}"
              @click="selectSexLabel('女士')">女士</span>
      </li>
      <li  class="border-bottom-1px">
        <span class="list-title">电话</span>
        <input id="tel" type="tel" v-model="addressData.tel"/>
      </li>
      <li  class="border-bottom-1px">
        <span class="list-title">位置</span>
        <router-link id="address" to="/my_app/location">
          <span>{{addressData.address}}</span>
          <span class="icon-keyboard_arrow_right"></span>
        </router-link>
      </li>
      <li  class="border-bottom-1px">
        <span class="list-title">详细地址</span>
        <textarea id="detailed-address" v-model="addressData.detailAddress"></textarea>
        <span class="icon-edit"></span>
      </li>
      <li  class="border-bottom-1px">
        <span class="list-title">标签</span>
        <span class="label"
              :class="{'active': addressData.addressLabel==='家'}"
              @click="selectAddressLabel('家')">家</span>
        <span class="label"
              :class="{'active': addressData.addressLabel==='学校'}"
              @click="selectAddressLabel('学校')">学校</span>
        <span class="label"
              :class="{'active': addressData.addressLabel==='公司'}"
              @click="selectAddressLabel('公司')">公司</span>
      </li>
    </ul>
    <div class="button-wrap">
      <span @click="addAddress()">确定</span>
    </div>
  </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
  export default {
    data () {
      return {
        addressData: {
          id: localStorage.getItem('userId'),
          name: '廖艳民',
          sexLabel: '先生',
          tel: 18579431548,
          address: '',
          detailAddress: '',
          addressLabel: '家'
        }
      }
    },
    components: {
      PageTitle
    },
    methods: {
      selectSexLabel (label) {
        this.addressData.sexLabel = label
      },
      selectAddressLabel (label) {
        this.addressData.addressLabel = label
      },
      addAddress () {
        let that = this
        this.$axios.post(`/add_address`, that.addressData)
          .then(res => {
            that.$router.go(-1)
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created () {
      this.addressData.address = localStorage.getItem('currentPos')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .edit-address-wrap
    position absolute
    z-index 10
    top 0
    right 0
    bottom 0
    left 0
    background #F2F2F2
    .edit-list
      margin-top 40px
      font-size 0
      background #fff
      & > li
        display flex
        height 40px
        line-height 40px
        padding 0 10px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 0
        border-bottom-1px(#ccc)
        & > a
          flex 0 0 20px
          font-size 26px
          color #888
        .list-title
          flex 0 0 60px
          font-size 13px
          color #111
          font-weight 800
        #name, #tel, #address, #detailed-address
          flex 1
          height 100%
          border none
          outline none
          font-size 13px
          color #444
        #address
          position relative
          padding-right 20px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          .icon-keyboard_arrow_right
            position absolute
            top 10px
            right 0
            font-size 20px
        #detailed-address
          resize none
          padding 10px 4px
        .icon-edit
          flex 0 0 20px
          line-height 80px
          font-size 16px
          color #999
        .label
          display inline-block
          margin 7px 10px 0
          width 60px
          height 24px
          line-height 24px
          text-align center
          font-size 13px
          border 1px solid #ccc
          border-radius 2px
          color #444
          &.active
            background #01D762
            border 1px solid #01D762
            color #fff
      & > li:nth-of-type(2)
        padding 0 10px 0 70px
      & > li:nth-of-type(5)
        height 80px
    .button-wrap
      margin 20px 10px 0
      height 34px
      line-height 34px
      text-align center
      font-size 18px
      & > span
        display inline-block
        width 100%
        height 100%
        font-weight 600
        color #fff
        background #01D762
</style>

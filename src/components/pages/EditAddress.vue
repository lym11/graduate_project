<template>
    <div class="edit-address-wrap">
      <page-title title="编辑地址"/>
      <div class="delete" @click="deleteAction()">删除</div>
      <ul class="edit-list">
        <li class="border-bottom-1px">
          <span class="list-title">联系人</span>
          <input id="name" class="border-bottom-1px" type="text" v-model="currentAddressData.name"/>
        </li>
        <li class="border-bottom-1px">
          <span class="label"
                :class="{'active': currentAddressData.sexLabel==='先生'}"
                @click="selectSexLabel('先生')">先生</span>
          <span class="label"
                :class="{'active': currentAddressData.sexLabel==='女士'}"
                @click="selectSexLabel('女士')">女士</span>
        </li>
        <li  class="border-bottom-1px">
          <span class="list-title">电话</span>
          <input id="tel" type="tel" v-model="currentAddressData.tel"/>
        </li>
        <li  class="border-bottom-1px">
          <span class="list-title">位置</span>
            <input id="address" type="text" v-model="currentAddressData.address"/>
            <router-link to="/my_app/location">
              <span class="icon-keyboard_arrow_right"></span>
            </router-link>
        </li>
        <li  class="border-bottom-1px">
          <span class="list-title">详细地址</span>
          <textarea id="detailed-address" v-model="currentAddressData.detailAddress"></textarea>
          <span class="icon-edit"></span>
        </li>
        <li  class="border-bottom-1px">
          <span class="list-title">标签</span>
          <span class="label"
                :class="{'active': currentAddressData.addressLabel==='家'}"
                @click="selectAddressLabel('家')">家</span>
          <span class="label"
                :class="{'active': currentAddressData.addressLabel==='学校'}"
                @click="selectAddressLabel('学校')">学校</span>
          <span class="label"
                :class="{'active': currentAddressData.addressLabel==='公司'}"
                @click="selectAddressLabel('公司')">公司</span>
        </li>
      </ul>
      <div class="button-wrap">
        <span @click="editAddress()">确定</span>
      </div>
      <transition name="show">
        <div class="mask" v-show="tipsShow">
          <div class="deleteTips">
            <p>是否删除该地址？</p>
            <p><span @click="deleteAddress()">是</span><span @click="cancelDelete()">否</span></p>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import PageTitle from '../page_title/PageTitle'
    export default {
      data () {
          return {
            tipsShow: false,
            currentAddressData: []
          }
      },
      components: {
        PageTitle
      },
      computed: {
      },
      created () {
        this.getAddressData()
      },
      methods: {
        getAddressData () {
          let that = this
          let index = this.$store.state.user.editIndex
          let id = localStorage.getItem('userId')
          this.$axios.get(`/get_user_address?id=${id}`)
            .then(res => {
              that.currentAddressData = res.data.data[index]
            })
            .catch(err => {
              console.log(err)
            })
        },
        selectSexLabel (label) {
          this.currentAddressData.sexLabel = label
        },
        selectAddressLabel (label) {
          this.currentAddressData.addressLabel = label
        },
        deleteAction () {
          this.tipsShow = true
        },
        cancelDelete () {
          this.tipsShow = false
        },
        editAddress () {
          let that = this
          console.log(that.currentAddressData)
          this.$axios.post(`/ud_address`, that.currentAddressData)
            .then(res => {
              console.log(res)
            })
        },
        deleteAddress () {
          let id = this.currentAddressData._id
          let that = this
          this.$axios.post(`/del_address`, {addressId: id, userId: localStorage.getItem('userId')})
            .then(res => {
              that.$router.go(-1)
            })
        }
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
    .delete
      position absolute
      top 10px
      right 10px
      z-index 20
      font-size 14px
      color #fff
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
    .mask
      position fixed
      top 0
      left 0
      z-index 60
      width 100%
      height 100%
      background-filter blur(10px)
      background rgba(7, 17, 27, 0.7)
      transition all 0.14s linear
      &.show-enter
        opacity 0
        transform scale(0)
      .deleteTips
        margin 140px auto
        padding 20px 10px
        width 220px
        height 100px
        overflow hidden
        text-align center
        border 1px solid #fff
        border-radius 6px
        background #fff
        & > p
          font-weight 600
          color #000
        & > p:nth-of-type(2)
          display flex
          margin-top 10px
          & > span
            flex 1
            margin 0 20px
            font-size 14px
            text-align left
          & > span:nth-of-type(1)
            text-align right
</style>

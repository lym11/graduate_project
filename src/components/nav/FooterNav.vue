<template>
    <div class="nav-wrap border-top-1px">
      <ul>
        <li class="nav-items">
          <router-link to="/my_app/home">
            <span>
              <span class="icon-pacman"></span>
              <span>首页</span>
            </span>
          </router-link>
        </li>
        <li class="nav-items">
          <router-link to="/my_app/order">
            <span>
              <span class="icon-file-text2"></span>
              <span>订单</span>
            </span>
          </router-link>
        </li>
        <li class="nav-items">
          <router-link to="/my_app/self">
            <span>
              <span class="icon-user-o"></span>
              <span>我的</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .nav-wrap
    position fixed
    left 0
    bottom 0
    z-index 1
    width 100%
    height 60px
    background-color #fff
    & > ul
      display flex
      width 100%
      height 100%
      border-top-1px(rgba(7, 17, 27, 0.1))
      .nav-items
        flex 1
        height 100%
        text-align center
        & > a
          display table
          width 100%
          height 100%
          font-size 12px
          color rgba(7, 17, 27, 0.6)
          transition all linear 0.2s
          & > span
            display table-cell
            vertical-align middle
            & > span
              display block
            & > span:nth-of-type(1)
               font-size 16px
               margin-bottom 5px
          &.active
            color #1D77FD
            transform scale(1.06)
</style>

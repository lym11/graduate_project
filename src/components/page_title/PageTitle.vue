<template>
    <div class="title-wrap">
      <span class="icon-arrow_lift" @click="goBack()"></span>
      <h1>{{title}}</h1>
    </div>
</template>

<script>
    export default {
      data () {
          return {}
      },
      props: {
        title: {
          type: String,
          required: true
        }
      },
      methods: {
        goBack () {
          this.$router.go(-1)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .title-wrap
    position fixed
    top 0
    left 0
    z-index 20
    display flex
    padding 0 10px
    width 100%
    height 40px
    line-height 40px
    font-size 14px
    color #fff
    background #1D77FD
    .icon-arrow_lift
      flex 0 0 20px
      height 40px
      line-height 40px
      text-algin center
    & > h1
      flex 1
      text-align center
</style>

<template>
  <div id="app">
    <router-view/>
    <page/>
  </div>
</template>

<script>
  import Page from './components/nav/Nav'
export default {
  name: 'App',
  components: {
    Page
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  background-color #F0F0F0
</style>

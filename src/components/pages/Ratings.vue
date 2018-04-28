<template>
    <div class="ratings-wrap">
      <div>
        <div>
          <h2>{{sellersData.score}}</h2>
          <p>综合评分</p>
          <p>高于周边商家{{sellersData.rankRate}}%</p>
        </div>
        <ul>
          <li>
            <span class="list-title">服务态度</span>
            <start size="36" :score="sellersData.serviceScore"/>
            <span  class="score">{{sellersData.serviceScore}}</span>
          </li>
          <li>
            <span class="list-title">菜品评价</span>
            <start size="36" :score="sellersData.foodScore"/>
            <span class="score">{{sellersData.foodScore}}</span>
          </li>
          <li>
            <span class="list-title">送达时间</span>
            <span>{{sellersData.deliveryTime}}分钟</span>
          </li>
        </ul>
      </div>
      <split/>
      <div class="ratings-type border-bottom-1px">
        <span class="all"
              :class="{active: current === 'all'}"
              @click="selectRatingType('all')"
        >全部{{all.length}}</span>
        <span class="positive"
              :class="{active: current === 'positive'}"
              @click="selectRatingType('positive')"
        >满意{{positive.length}}</span>
        <span class="negative"
              :class="{active: current === 'negative'}"
              @click="selectRatingType('negative')"
        >不满意{{negative.length}}</span>
      </div>
      <div class="only-content border-bottom-1px">
        <span class="icon-check_circle"
              :class="{on: isOnlyContent}"
              @click="selectOnlyContent()"
        ></span>
        <span>只看有内容的评价</span>
      </div>
      <ul class="ratings-content">
        <li class="border-bottom-1px" v-for="(rating, index) in ratingsData" :key="index">
          <div>
            <img :src="rating.avatar" width="28" height="28"/>
          </div>
          <div>
            <h3>{{rating.username}}</h3>
            <p>
              <start size="24" :score="rating.score"/>
              <span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </p>
            <p>{{rating.text}}</p>
            <p>
              <span class="icon-thumb_up" v-if="rating.recommend.length>0"></span>
              <span class="recommend-list" v-for="(recommend, index) in rating.recommend" :key="index">{{recommend}}</span>
            </p>
            <p>{{rating.rateTime | formdate}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import * as types from '../../store/mutationTypes'
  import Start from '../start/Start'
  import Split from '../split/Split'
  import {formDate} from '../../common/js/date'
  const POSITIVE = 0
  const NEGATIVE = 1
    export default {
      data () {
        return {
          current: 'all',
          isOnlyContent: false
        }
      },
      computed: {
        all () {
          return this.$store.getters.ratingsData
        },
        positive () {
          let ratingsData = this.$store.getters.ratingsData
          return ratingsData.filter(item => {
            return item.rateType === POSITIVE
          })
        },
        negative () {
          let ratingsData = this.$store.getters.ratingsData
          return ratingsData.filter(item => {
            return item.rateType === NEGATIVE
          })
        },
        ratingsData () {
          let data
          if (this.current === 'all') {
            data = this.all
          } else if (this.current === 'positive') {
            data = this.positive
          } else if (this.current === 'negative') {
            data = this.negative
          }
          if (this.isOnlyContent) {
            data = data.filter(item => {
              return item.text.length > 0
            })
          }
          return data
        },
        sellersData () {
          let data = this.$store.getters.sellersData.find(item => item._id === this.$route.query.id)
          return data
        }
      },
      components: {
        Start,
        Split
      },
      methods: {
        selectRatingType (type) {
          this.current = type
        },
        selectOnlyContent () {
          this.isOnlyContent = !this.isOnlyContent
        }
      },
      created () {
        this.$store.dispatch(types.GET_RATINGS_DATA)
      },
      filters: {
        formdate (time) {
          let date = new Date(time)
          return formDate(date, 'yyyy-MM-dd hh:mm')
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .ratings-wrap
    background #fff
    & >div:nth-of-type(1)
      display flex
      padding 18px 0
      font-size 0
      & > div:nth-of-type(1)
        flex 0 0 146px
        text-align center
        border-right 1px solid #ccc
        & > h2
          line-height 28px
          font-size 24px
          color #f90
        & > p:nth-of-type(1)
          margin 6px 0 8px
          line-height 12px
          font-size 12px
          color #07111b
        & > p:nth-of-type(2)
          margin-bottom 6px
          line-height 10px
          font-size 10px
          color #93999f
      & > ul
        flex 1
        padding 0 8px
        & > li
          margin-bottom 8px
          .list-title
            margin-right 12px
            font-size 12px
            color #07111b
          & > span
            font-size 12px
          .score
            color #f90
    .ratings-type
      margin 0 18px
      padding 18px 0
      border-bottom-1px(#ccc)
      & > span
        display inline-block
        margin-right 8px
        padding 8px 12px
        line-height 16px
        text-align center
        border-radius 2px
        font-size 12px
        color #4d555d
      .all, .positive
         background rgba(0, 160, 220, 0.2)
         &.active
          background #00a0dc
          color #fff
      .negative
        margin-right 0
        background rgba(77, 85, 93, 0.2)
        &.active
          color #fff
          background rgb(77, 85, 93)
    .only-content
      padding 12px 18px
      font-size 0
      color #93999f
      border-bottom-1px(#ccc)
      & > span
        line-height 24px
        vertical-align top
        font-size 12px
      .icon-check_circle
        margin-right 4px
        font-size 22px
        &.on
          color #00c850
    .ratings-content
      & > li
        display flex
        position relative
        margin 0 18px
        padding 18px 0
        border-bottom-1px(#ccc)
        font-size 0
        & > div:nth-of-type(1)
          flex 0 0 28px
          margin-right 12px
        & > div:nth-of-type(2)
          flex 1
          & > h3
            line-height 24px
            font-size 12px
            color #07111b
          & > p:nth-of-type(1)
            margin 4px 0 6px
            line-height 12px
            font-size 10px
            font-weight 200
            color #93999f
          & > p:nth-of-type(2)
            margin-bottom 8px
            line-height 18px
            font-size 12px
            color #07111b
          & > p:nth-of-type(3)
            & > span
              display inline-block
            .icon-thumb_up
              margin-right 8px
              line-height 16px
              font-size 12px
              color #00a0dc
            .recommend-list
              margin 0 8px 2px 0
              padding 0 6px
              line-height 16px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              font-size 9px
              color #93999
          & > p:nth-of-type(4)
            position absolute
            top 18px
            right 0
            line-height 12px
            font-size 10px
            font-weight 200
            color #93999f
</style>

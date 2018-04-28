import * as types from '../mutationTypes'
import axios from 'axios'
const state = {
  sellers: [],
  goods: [],
  ratings: [],
  shopCartGood: [],
  orderTime: 0,
  currentSellerId: ''
}
const getters = {
  sellersData: state => state.sellers,
  goodsData: state => state.goods,
  ratingsData: state => state.ratings
}
const mutations = {
  [types.GET_SELLERS] (state, sellers) {
    state.sellers = sellers
  },
  [types.GET_GOODS] (state, goods) {
    state.goods = goods
  },
  [types.GET_RATINGS] (state, ratings) {
    state.ratings = ratings
  },
  addToCart (state, {name, data, id}) {
    let food = state.shopCartGood.find(item => item.name === name)
    if (!food) {
      let o
      for (let i = 0; i < data.length; i++) {
        let foods = data[i].good_foods
        for (let j = 0; j < foods.length; j++) {
          if (foods[j].name === name) {
            o = foods[j]
          }
        }
      }
      food = Object.assign({}, o, {count: 1, sellerId: id})
      state.shopCartGood.push(food)
    } else {
      food.count += 1
    }
  },
  decFromCart (state, name) {
    let food = state.shopCartGood.find(item => item.name === name)
    if (food.count <= 1) {
      let index = state.shopCartGood.indexOf(food)
      state.shopCartGood.splice(index, 1)
    } else {
      food.count--
    }
  },
  empty (state) {
    state.shopCartGood.splice(0, state.shopCartGood.length)
  },
  getOrderTime (state, time) {
    state.orderTime = time
  },
  getSellerId (state, id) {
    state.currentSellerId = id
  }
}
const actions = {
  [types.GET_SELLERS_DATA] ({commit}) {
    axios.get('/get_all_seller')
      .then(res => {
        commit(types.GET_SELLERS, res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  [types.GET_GOODS_DATA] ({commit}, id) {
    axios.get(`get_seller?id=${id}`)
      .then(res => {
        commit(types.GET_GOODS, res.data.data[0].goods)
      })
  },
  [types.GET_RATINGS_DATA] ({commit}) {
    axios.get('/api/ratings')
      .then(res => {
        res = res.data
        if (res.errorNum === 0) {
          commit(types.GET_RATINGS, res.data)
        }
      })
  },
  [types.ADD_TO_CART] ({commit}, {name, data, id}) {
    commit('addToCart', {name, data, id})
  },
  [types.DEC_FROM_CART] ({commit}, name) {
    commit('decFromCart', name)
  },
  [types.EMPTY] ({commit}) {
    commit('empty')
  },
  [types.GET_ORDER_TIME] ({commit}, time) {
    commit('getOrderTime', time)
  },
  [types.GET_SELLER_ID] ({commit}, id) {
    commit('getSellerId', id)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

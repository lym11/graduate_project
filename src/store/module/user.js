import * as types from '../mutationTypes'
import axios from 'axios'
const state = {
  address: [],
  currentAddress: {},
  editIndex: 0,
  order: []
}
const getters = {
  addressData: state => state.address,
  currentAddressData: state => state.currentAddress,
  orderData: state => state.order
}
const mutations = {
  [types.GET_ADDRESS] (state, address) {
    state.address = address
  },
  getEditIndex (state, index) {
    state.editIndex = index
  },
  chooseAddress (state, address) {
    state.currentAddress = address
  },
  getOrder (state, order) {
    state.order = order
  }
}
const actions = {
  // 获取收货地址数据
  [types.GET_ADDRESS_DATA] ({commit}) {
    let id = localStorage.getItem('userId')
    axios.get(`/get_user_address?id=${id}`)
      .then(res => {
        commit(types.GET_ADDRESS, res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  [types.GET_EDIT_INDEX] ({commit}, index) {
    commit('getEditIndex', index)
  },
  [types.CHOOSE_CURRENT_ADDRESS] ({commit}, address) {
    commit('chooseAddress', address)
  },
  [types.GET_ORDER_DATA] ({commit}) {
    let userId = localStorage.getItem('userId')
    axios.get(`get_user_order?id=${userId}`)
      .then(res => {
        commit('getOrder', res.data.data)
      })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

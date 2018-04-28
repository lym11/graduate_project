import * as types from '../mutationTypes'
import AMap from 'AMap'
const state = {
  positions: [],
  currentPosition: {
    position: '',
    lng: 0,
    lat: 0
  }
}
const getters = {
  positionsData: state => state.positions
}
const mutations = {
  [types.GET_POSITIONS] (state, positions) {
    state.positions = positions
  },
  [types.GET_CURRENT_POSITION] (state, position) {
    state.currentPosition.position = position.formattedAddress
    state.currentPosition.lng = position.position.lng
    state.currentPosition.lat = position.position.lat
  },
  [types.CHANGE_CURRENT_POSITION] (state, position) {
    state.currentPosition.position = position.district + position.name
    state.currentPosition.lng = position.location.lng
    state.currentPosition.lat = position.location.lat
    localStorage.setItem('currentPos', position.name)
  }
}
const actions = {
  // 调用高德地图的输入提示插件
  [types.SEARCH_POSITION] ({commit}, keyWords) {
     AMap.plugin(['AMap.Autocomplete'], function () {
      let autoOptions = {
        city: ''
      }
      let autocomplete = new AMap.Autocomplete(autoOptions)
      autocomplete.search(keyWords, function (status, result) {
        commit(types.GET_POSITIONS, result)
      })
    })
  },
  // 选择搜索的地点为当前地点
  [types.SELECT_POSITION] ({commit}, position) {
    commit(types.CHANGE_CURRENT_POSITION, position)
  },
  // 定位
  [types.LOCATION] ({commit}) {
    let geolocation
    AMap.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000
      })
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)
    })
    function onComplete (data) {
      commit(types.GET_CURRENT_POSITION, data)
    }
    function onError () {
      alert('定位失败')
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

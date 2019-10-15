import { getFloorListRequest, getcateGoryList, getTableList } from '@/api/sticky'

const state = {
  floorList: [],
  cateGoryList: [],
  tableList: []
}

const mutations = {
  setFloorList(state, payload) {
    //console.log(payload)
    state.floorList = payload
  },
  setCateGoryList(state, payload) {
   // console.log(payload)
    state.cateGoryList = payload
  },
  setTableList(state, payload) {
    console.log(payload)
    state.tableList = payload
  }
}

const actions = {
  async  getFloorList({ commit }) {
    const result = await getFloorListRequest()
    const data = result.data.list
    commit('setFloorList', data)
  },
  async getCateGoryList({ commit }) {
    const result = await getcateGoryList()
    const data = result.data
    commit('setCateGoryList', data)
  },
  async getTableList({ commit }, params) {
    const result = await getTableList(params)
    const data = result.data.list
    commit('setTableList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

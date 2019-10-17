import { getAttrStoreListRequest, getAttrListRequest, getCateGoryListRequest ,getThreeLevelListRequest } from '@/api/table/inline-edit-table'

const state = {
  attrStoreList: [],
  attrList: [],
  cateGoryList: [],
  threeLevelList:[]
}

const mutations = {
  setAttrStoreList(state, payload) {
    state.attrStoreList = payload
  },
  setAttrList(state, payload) {
    state.attrList = payload
  },
  setCateGoryList(state, payload) {
    console.log(payload)
    state.cateGoryList = payload
  },
  setThreeLevelList(state,payload){
    state.threeLevelList = payload
  }
}

const actions = {
  async getAttrStoreListAction({ commit }) {
    const result = await getAttrStoreListRequest()
    const data = result.data.list
    commit('setAttrStoreList', data)
  },
  async getAttrListAction({ commit }) {
    const result = await getAttrListRequest()
    const data = result.data.list
    commit('setAttrList', data)
  },
  async getCateGoryListAction({ commit }, params) {
    const result = await getCateGoryListRequest(params)
    const data = result.data.list
    commit('setCateGoryList',data)
  },
  async getThreeLevelListAction({ commit }){
    const result = await getThreeLevelListRequest()
    const data = result.data
    commit('setThreeLevelList',data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

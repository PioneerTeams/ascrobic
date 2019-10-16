import { getAttrStoreListRequest, getAttrListRequest, getCateGoryListRequest } from '@/api/table/inline-edit-table'

const state = {
  attrStoreList: [],
  attrList: [],
  cateGoryList: []
}

const mutations = {
  setAttrStoreList(state, payload) {
    state.attrStoreList = payload
  },
  setAttrList(state, payload) {
    state.attrList = payload
  },
  setCateGoryList(state, payload) {
    state.cateGoryList = payload
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
    commit('')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

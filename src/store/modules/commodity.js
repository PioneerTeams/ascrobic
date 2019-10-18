import { lookList } from '@/api/commodity'

const state = {
  formInline: {},
  page: 1,
  activeName: 4,
  list: []
}

const mutations = {
  setForm: (state, payload) => {
    state.formInline = payload
  },
  setActive: (state, payload) => {
    state.activeName = payload
  },
  setPage: (state, payload) => {
    state.page = payload
  },
  setTable: (state, payload) => {
    state.list = payload
  }
}

const actions = {
  async getFormTable({ commit, state }, payload) {
    const result = await lookList(state.activeName, state.page, payload)
    commit('setTable', result.data.list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


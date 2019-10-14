import { getFloorListRequest } from '@/api/sticky'

const state = {
  floorList: []
}

const mutations = {
  setFloorList(state, payload) {
    state.floorList = payload
  }
}

const actions = {
  async  getFloorList({ commit }) {
    const result = await getFloorListRequest()
    console.log(result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

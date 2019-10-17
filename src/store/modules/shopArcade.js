import { getUserList, getStoreInfo } from '../../api/shopArcade'
const state = {
  userlist: []
}
const mutations = {}

const actions = {
  async getuserlist({ commit }, data) {
    const result = await getUserList(data)
    return result.list
  },
  async getStoreInfos({ commit }, data) {
    const result = await getStoreInfo(data)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

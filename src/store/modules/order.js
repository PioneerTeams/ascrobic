
import { requestSubOrderInfo } from '@/api/order'
const state = {

}

const mutations = {

}

const actions = {
  async subOrderInfoAction({ commit }, data) {
    const result = await requestSubOrderInfo(data)
    if (result.code === 200) {
      return result.data
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

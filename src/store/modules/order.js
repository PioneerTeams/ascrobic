
import { requestSubOrderInfo, requestSubOrderList, requestReturnList } from '@/api/order'
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
  },
  async subOrderListAction({ commit }, data) {
    const result = await requestSubOrderList(data)
    if (result.code === 200) {
      return result.data
    }
  },
  async returnListAction({ commit }, data) {
    const result = await requestReturnList(data)
    console.log(result, 'requestReturndata')
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

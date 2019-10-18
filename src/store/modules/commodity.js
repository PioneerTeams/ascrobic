import { lookList, storeList } from '@/api/commodity'

const state = {
    formInline:{},
    page:1,
    activeName:4,
    storeNum:1,
    list:[],
    storeList:[]
}

const mutations = {
    setForm: (state, payload) => {
        state.formInline=payload
    },
    setActive: (state, payload) => {
        state.activeName=payload
    },
    setPage: (state, payload) => {
        state.page=payload
    },
    setTable: (state, payload) => {
        state.list=payload
    },
    setStore: (state, payload) => {
        state.storeList=payload
    },
    setStoreNum: (state, payload) => {
        state.storeNum=payload
    },
}

const actions = {
    async getFormTable({ commit,state },payload) {
        const result = await lookList(state.activeName,state.page,payload)
        commit('setTable',result.data)
    },
    async getStoreList({ commit,state },payload) {
        const result = await storeList(state.storeNum,state.page,payload)
        commit('setStore',result.data)
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


import { getAttrStoreListRequest,getAttrListRequest,getCateGoryListRequest } from "@/api/table/inline-edit-table"

const state={
     attrStoreList:[],
     attrList:[],
     cateGoryList:[]
}

const mutations={
     setAttrStoreList(state,payload){
         state.attrStoreList=payload
     },
     setAttrList(state,payload){
         state.attrList=payload
     },
     setCateGoryList(state,payload){
         state.cateGoryList=payload
     }
}

const actions={
    async getAttrStoreListAction({commit}){
        let result = await getAttrStoreListRequest()
        let data = result.data.list
        commit('setAttrStoreList',data)
    },
    async getAttrListAction({commit}){
        let result = await getAttrListRequest()
        let data = result.data.list
        commit('setAttrList',data)
    },
    async getCateGoryListAction({commit},params){
        let result = await getCateGoryListRequest(params)
        let data=result.data.list
        commit('')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
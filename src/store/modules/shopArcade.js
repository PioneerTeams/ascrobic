import {getUserList} from "../../api/shopArcade";
const state={
    userlist:[]
}
const mutations={}

const actions={
   async getuserlist({commit},data){
       let result = await getUserList(data)
       return result.list
   }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
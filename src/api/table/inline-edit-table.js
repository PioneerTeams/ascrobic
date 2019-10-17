import request from '@/utils/request'
import qs from 'querystring'

export function getAttrStoreListRequest() {
  return request({
    url: '/VmStore/getAttrStoreList',
    method: 'get',
    baseURL: '/api'
  })
}

export function getAttrListRequest() {
  return request({
    url: '/AttrItem/getAttr',
    method: 'get',
    baseURL: '/api'
  })
}

export function getCateGoryListRequest(params) {
  return request({
    url: '/AttrItem/getCategoryList',
    method: 'post',
    baseURL: '/api',
    data: qs.stringify(params)
  })
}

export function getThreeLevelListRequest(){
  return request({
    url:"/AttrItem/getThreeLevelCategory",
    method:'post',
    baseURL:'/api'
  })
}
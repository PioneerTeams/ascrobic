import request from '@/utils/request'
import qs from 'querystring'
export function getFloorListRequest() {
  return request({
    url: '/store/floor-list', method: 'post', baseURL: '/api'
  })
}

export function getcateGoryList() {
  return request({
    url: '/store/category-list', method: 'post', baseURL: '/api'
  })
}

export function getTableList(params) {
  return request({
    url: '/store/promotion-list', method: 'post', baseURL: '/api', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: qs.stringify(params)
  })
}


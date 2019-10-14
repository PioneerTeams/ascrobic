import request from '@/utils/request'

export function getFloorListRequest() {
  return request({
    url: '/store/floor-list', method: 'post', baseURL: '/api'
  })
}

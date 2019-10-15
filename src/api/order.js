import request from '@/utils/request'
import qs from 'querystring'
export function requestSubOrderInfo(data) {
  return request({
    url: '/order/get-sub-order-info',
    baseURL: '/api',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

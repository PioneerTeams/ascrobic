import request from '@/utils/request'
import qs from 'querystring'
// 店铺订单页面 跳转详情
export function requestSubOrderInfo(data) {
  return request({
    url: '/order/get-sub-order-info',
    baseURL: '/api',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// /order/get-sub-order-list
// 获取店铺订单页面 表格列表
export function requestSubOrderList(data) {
  return request({
    url: '/order/get-sub-order-list',
    baseURL: '/api',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 获取退款管理页面 表格列表
export function requestReturnList(data) {
  return request({
    url: '/return/get-return-list',
    baseURL: '/api',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

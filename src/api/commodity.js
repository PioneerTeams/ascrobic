import request from '@/utils/request'
import qs from 'qs'

// 表单初始化
export function manageList(status) {
  const data={
    status
  }
  return request({
    url: '/prod/search-list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 表格数据
export function tableList() {
  const data={
    page: 1,
    status:4
  }
  return request({
    url: '/prod/list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
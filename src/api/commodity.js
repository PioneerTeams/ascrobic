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

// 第一层表格数据
export function tableList(status,page) {
  const data={
    page,
    status
  }
  return request({
    url: '/prod/list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 第二次表格数据
export function tableChild(vm_store_id,status,prod_id) {
  const data={
    prod_id,
    status,
    vm_store_id
  }
  return request({
    url: '/prod/sku-list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 表格查询获取的数据
export function tableSearch(obj) {
  const data={
    id: obj.id,
    vm_store_product_id: obj.vm_store_product_id,
    status: obj.status
  }
  return request({
    url: '/prod/detail',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
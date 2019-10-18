import request from '@/utils/request'
import qs from 'qs'

// 商品管理
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

// 表单查询数据
export function lookList(status,page,formInline) {
  const data={
    page,
    status,
    prod_code: formInline.prod_code,
    prod_name: formInline.prod_name,
    category_id: formInline.category_id,
    brand_id: formInline.brand_id,
    prod_src: formInline.prod_src,
    prod_type: formInline.prod_type,
    delivery_type: formInline.delivery_type,
    vm_store_id: formInline.vm_store_id,
    up_time: formInline.up_time,
    submit_time: formInline.submit_time,
    audit_time: formInline.audit_time,
  }
  return request({
    url: '/prod/list',
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

// 表格编辑获取商品信息
export function shopMinxin(standard_category_id) {
  const data={
    standard_category_id
  }
  return request({
    url: '/prod/get-attr',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 表格编辑获取基本信息
export function basicMinxin() {
  return request({
    url: '/prod/option-collections',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 库存管理
// 表格初始化数据
export function stockList(status,page) {
  const data={
    page,
    pageSize: 10,
    status,
    vm_store_id: 3446,
  }
  return request({
    url: '/prod/stock-list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 库存页面表单查询数据
export function storeList(status,page,formInline) {
  const data={
    page,
    pageSize: 10,
    status,
    vm_store_id: 3446,
    code: formInline.prod_code,
    sku_code: formInline.sku_code,
    category_id: formInline.category_id,
    brand_id: formInline.brand_id,
    prod_src: formInline.vm_store_id
  }
  return request({
    url: '/prod/stock-list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 顾客会员等级
export function searchSet() {
  return request({
    url: '/member/search-set',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 顾客会员等级
export function memberList(type,page,formInline) {
  const data = {
    type,
    page,
    mobile: formInline.mobile,
    name: formInline.name,
    nickname: formInline.nickname,
    cid: formInline.cid,
    grade_code: formInline.grade_code,
    buy_times_min: formInline.buy_times_min,
    buy_times_max: formInline.buy_times_max,
    price_min: formInline.price_min,
    price_max: formInline.price_max,
    lately_consume_time_start: formInline.lately_consume_time_start,
    lately_consume_time_end: formInline.lately_consume_time_end,
    first_consume_time_start: formInline.first_consume_time_start,
    first_consume_time_end: formInline.first_consume_time_end,
  }
  return request({
    url: '/member/member-list',
    method: 'post',
    baseURL: '/api',
    headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
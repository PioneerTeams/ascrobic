import request from '@/utils/request'

// 店铺管理楼层Select
export async function getFloorList() {
  const result = await request({ url: '/store/floor-list', method: 'post', baseURL: '/api' })
  return result.data
}
// 店铺管理tab数据 查询接口
export async function getStoreList(data) {
  const result = await request({ url: '/store/get-store-list', method: 'post', baseURL: '/api', data })
  return result.data
}
// 店铺授权品牌
export async function getBranchList(data) {
  const result = await request({ url: '/store/brand-list', method: 'post', baseURL: '/api', data })
  return result.data
}
// 店铺分类
export async function getcategoryList() {
  const result = await request({ url: '/store/category-list', method: 'post', baseURL: '/api' })
  return result.data
}
// 导购管理
export async function getUserList(data) {
  const result = await request({ url: '/user/list', method: 'post', baseURL: '/api', data })
  return result.data
}
// 店铺详情
export async function getStoreInfo(data) {
  const result = await request({ url: '/store/get-store-info', method: 'post', baseURL: '/api', data })
  return result.data
}
// e店铺 店铺权限
export async function getStorePowerList() {
  const result = await request({ url: '/store/get-store-power-list', method: 'post', baseURL: '/api' })
  return result.data
}
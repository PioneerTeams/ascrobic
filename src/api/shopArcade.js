import request from '@/utils/request'

// 店铺管理楼层Select
export async function getFloorList() {
  const result = await request({ url: '/store/floor-list', method: 'post', baseURL: '/api' })
  return result.data
}

export async function getStoreList(data) {
  const result = await request({ url: '/store/get-store-list', method: 'post', baseURL: '/api', data })
  return result.data
}

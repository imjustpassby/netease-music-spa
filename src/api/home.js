import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/api/banner',
    withCredentials: true
  }) 
}

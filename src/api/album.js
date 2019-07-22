import request from "@/utils/request"
 
/* 新碟上架 */
export function getTopAlbum(data) {
  return request({
    url: '/api/top/album',
    withCredentials: true,
    params: {
      limit: 20,
      offset: data.offset ? data.offset : 0
    }
  })
}

/* 最新专辑 */
export function getAlbumNewest() {
  return request({
    url: '/api/album/newest',
    withCredentials: true
  })
}
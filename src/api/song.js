import request from "@/utils/request.js";

export function getSongUrl(data) {
  return request({
    url: '/api/song/url',
    withCredentials: true,
    params: {
      id: data
    }
  })
}
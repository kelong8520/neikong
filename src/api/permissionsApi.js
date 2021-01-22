// 权限
import api from "@/utils/http"

//  获取数据权限
// export function specialLoadData(params) {
//   return api({
//     baseURL: 'http://120.78.186.60:8087',
//     url: params,
//     method: 'get'
//   })
// }
//  获取数据权限
// export function userData(params) {
//   return api({
//     baseURL: 'http://120.78.186.60:8880/user',
//     url: params,
//     method: 'get'
//   })
// }
export const user = (params) => {
  return api({
      url: "/user",
      method: "get",
      params
  })
}
// 请求token
// export function authentication(data) {
//   return api({
//     baseURL: 'http://120.78.186.60:8087/oauth/token',
//     url: data,
//     method: 'post'
//   })
// }





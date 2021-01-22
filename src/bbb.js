import { asyncRoutes, constantRoutes, resetRouter } from '@/router'

function hasPermission(info, route) {
  let flag = false
  if (route.meta.pk) {
    info.map(item => {
      if (item.displayName == route.meta.pk) {
        flag = true
      }
    })
  }

  return flag
}

export function filterAsyncRoutes(routes, info) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(info, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, info)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  allAuthInfo: []
}
const mutations = {
  UPDATE_AUTH_INFO: (state, info) => {
    state.allAuthInfo = info
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, info)
    const allRoute = accessedRoutes.concat([{
      path: '*',
      redirect: '/404'
    }])
    state.routes = constantRoutes.concat(allRoute)
  }
}

const actions = {
  updateAuthInfo({ commit }, info) {
    commit('UPDATE_AUTH_INFO', info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
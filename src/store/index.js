import Vue from "vue";
import Vuex from "vuex";
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
Vue.use(Vuex);


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
  tabArr: [
    {
      name: "home",
      title: "首页"
    }
  ],
  tabName: "home",
  routes: [],
  allAuthInfo: []
};

const mutations = {
  // 权限
  UPDATE_AUTH_INFO: (state, info) => {
    state.allAuthInfo = info
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, info)
    const allRoute = accessedRoutes.concat([{
      path: '*',
      redirect: '/404'
    }])
    state.routes = constantRoutes.concat(allRoute)
  },
  // 添加tab数组
  addTabArr(state, model) {
    state.tabArr.push(model)
    if (model.productionNo) {
      state.tabName = model.name + '?' + model.productionNo;
    } else {
      state.tabName = model.name;
    }
  },
  // 删除tab数组
  deleteTabArr(state, modelName) {
    if (modelName.includes('?')) {
      state.tabArr = state.tabArr.filter(item => !(item.name == modelName.split('?')[0] && item.productionNo == modelName.split('?')[1]))
    } else {
      state.tabArr = state.tabArr.filter(item => item.name != modelName)
    }
  },
  // 修改tab页的活跃页索引
  modifyTabName(state, name) {
    state.tabName = name;
    // console.log("store里面改了name",name)
  }
}

const actions = {
  updateAuthInfo({ commit }, info) {
    commit('UPDATE_AUTH_INFO', info)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
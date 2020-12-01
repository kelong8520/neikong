import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    tabArr: [
      {
        name: "home",
        title: "首页"
      }
    ],
    tabName: "home"
};

const mutations = {
    // 添加tab数组
    addTabArr(state, model){
      state.tabArr.push(model)
      if (model.id) {
        state.tabName = model.name + '?' + model.id;
      } else {
        state.tabName = model.name;
      }
    }, 
    // 删除tab数组
    deleteTabArr(state, modelName){
      if (modelName.includes('?')) {
        state.tabArr = state.tabArr.filter(item => !(item.name == modelName.split('?')[0] && item.id == modelName.split('?')[1]))
      } else {
        state.tabArr = state.tabArr.filter(item => item.name != modelName)
      }
    },
    // 修改tab页的活跃页索引
    modifyTabName(state, name){
      state.tabName = name;
      // console.log("store里面改了name",name)
    }
  }

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
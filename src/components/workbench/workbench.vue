<template>
  <div id="tabs">
    <el-col :span="22">
      <el-tabs
        v-model="editableTabsValue"
        type="border-card"
        @edit="handleRemove"
        @tab-click="handleCheck"
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item,idx) in editableTabs"
          :label="item.title"
          :name="item.name"
          :closable="idx != 0"
        ></el-tab-pane>
      </el-tabs>
      <span style="display:none;">{{tabName}}</span>
    </el-col>
    <el-col :span="2" style="paddingLeft:20px;">
      <el-dropdown>
        <el-button style="padding:10px;margin:2px 0 0 10px;">
          <i class="el-icon-arrow-down el-icon--center"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="reload">刷新当前页面</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="close">关闭所有页面</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </div>
</template>

<script>
// editable 添加 tabs
import store from "@/store";
export default {
  data() {
    return {
      editableTabsValue: "home"
    };
  },
  computed: {
    tabName: () => {
      // console.log("当前",store.state.tabName)
      return store.state.tabName;
    },
    editableTabs: () => {
      return store.state.tabArr;
    }
  },
  watch: {
    tabName(val) {
      // console.log(val)
      this.editableTabsValue = val;
    }
  },
  methods: {
    close() {
      this.editableTabs.forEach((item, i) => {
        if (i > 1) {
          this.editableTabs.splice(1);
        }
      });
    },
    reload() {
      this.$emit("reload");
      // let index;
      //   this.editableTabs.forEach((item,i) => {
      //       let name;
      //       if(item.id){
      //         name=item.name+'?'+item.id
      //       }else{
      //         name=item.name
      //       }
      //       if(name == this.tabName){
      //       index= i

      //       }
      //     })
      //      store.commit("reload", index)
    },
    handleRemove(modelName, operation) {
      if (operation == "remove") {
        let newName = "";
        // 判断当前关闭的模块，是不是活跃的模块，如果是则自动显示到前一个，如果不是则不改变
        if (modelName == this.tabName) {
          this.editableTabs.forEach((item, i) => {
            if (item.name == modelName) {
              newName = this.editableTabs[i - 1].name;
            }
          });
          store.commit("deleteTabArr", modelName);
          store.commit("modifyTabName", newName);
          this.$router.push({ name: newName });
        } else {
          store.commit("deleteTabArr", modelName);
        }
      }
    },
    handleCheck(insteance) {
      this.$router.push({ name: insteance.paneName });
      store.commit("modifyTabName", insteance.paneName);
    }
  }
};
</script>

<style>
#tabs {
  /* background: #ccc; */
  width: 96%;
  margin: 0;
  height: 40px;
}
.el-tabs__nav-wrap.is-scrollable {
  margin: 0 10px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-right-color: #dcdfe6;
  border-left-color: #dcdfe6;
  height: 40px;
  line-height: 40px;
}
#tab-home {
  height: 40px;
}
#tab-1 .el-icon-close {
  display: none;
}
.el-tabs--card > .el-tabs__header .el-tabs__item .is-active {
  border-bottom-color: #3c8dbc;
}
</style>
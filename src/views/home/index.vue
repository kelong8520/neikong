<template>
  <div class="down11">
    <el-container class="allHeight">
      <el-aside width="250px" v-show="accord" style="background-color: #0A1420;">
        <el-menu class="el-menu-vertical-demo">
          <el-submenu :index="String(item)" v-for="(work,item) in sixList" :key="item">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="color:#fff;">{{work.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item+'-'+idx"
                v-for="(model,idx) in work.model"
                :class="model.icon"
                :key="idx"
                @click="addTabs(model.name,model.title)"
                style="color:#fff;"
              >{{model.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px; height:40px;color:#333;display:flex;">
          <div @click="switchClcik" style="padding:10px;width:15px;">
            <i class="el-icon-s-fold" style="width:20px;height:20px;"></i>
          </div>
          <WorkBench @reload="reload"></WorkBench>
        </el-header>

        <el-main class="mainBackground">
          <div class="pagetitle" v-if="$route.path =='/index'">内控及生产成本管理</div>
          <router-view v-if="flag"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import querystring from "querystring";
import store from "@/store";

export default {
  name: "index",
  data() {
    return {
      accord: true,
      // iconlist: [
      //   "el-icon-s-finance",
      //   "el-icon-s-custom",
      //   "el-icon-document-checked",
      //   "el-icon-s-goods",
      //   "el-icon-s-order",
      //   "el-icon-s-data",
      //   "el-icon-s-platform",
      //   "el-icon-s-promotion"
      // ],
      sixList: [
        {
          title: "1.1 财务基础信息",
          model: [
            {
              title: "1.1.1财务基础档案",
              name: "cwjcda",
              icon: "el-icon-document"
            },
            {
              title: "1.1.2产品核价",
              name: "cphj",
              icon: "el-icon-data-analysis"
            },
            {
              title: "1.1.3月度实际发生费用",
              name: "ydsjfsfy",
              icon: "el-icon-data-analysis"
            },
            {
              title: "1.1.4汇率维护",
              name: "hlwh",
              icon: "el-icon-data-analysis"
            }
          ]
        },
        {
          title: "1.2 分工序投入产出明细",
          model: [
            {
              title: "1.2.1原料投入数据",
              name: "yltr",
              icon: "el-icon-document"
            },
            {
              title: "1.2.2辅料投入数据",
              name: "fltr",
              icon: "el-icon-document"
            },
            {
              title: "1.2.3能耗投入数据",
              name: "nhtr",
              icon: "el-icon-document"
            }
          ]
        },
        {
          title: "1.3 在途半制品盘存",
          model: [
            {
              title: "1.3.1浆染半制品盘点明细",
              name: "jrbzp",
              icon: "el-icon-document"
            },
            {
              title: "1.3.2织造织轴盘点明细",
              name: "zzzzpd",
              icon: "el-icon-document"
            },
            // {
            //   title: "1.3.3织造纬纱盘点明细",
            //   name: "zzwspd",
            //   icon: "el-icon-document"
            // },
            {
              title: "1.3.4织造坯布盘点明细",
              name: "zzpbpd",
              icon: "el-icon-document"
            },
            {
              title: "1.3.5后整半制品明细",
              name: "hzbzp",
              icon: "el-icon-document"
            }
          ]
        },
        {
          title: "1.4 成品汇总及分析",
          model: [
            {
              title: "1.4.1原料分析",
              name: "ylfx",
              icon: "el-icon-document"
            },
            {
              title: "1.4.2辅料分析",
              name: "flfx",
              icon: "el-icon-document"
            },
            {
              title: "1.4.3能耗分析",
              name: "nhfx",
              icon: "el-icon-document"
            }
          ]
        },
        {
          title: "1.5 实际生产成本核算",
          model: [
            {
              title: "1.5.1月度机物料费用",
              name: "jwlfy",
              icon: "el-icon-document"
            },
            {
              title: "1.5.2月度人工费用",
              name: "rgfy",
              icon: "el-icon-document"
            },
            {
              title: "1.5.3成本核算",
              name: "cbhs",
              icon: "el-icon-document"
            }
          ]
        },
        {
          title: "1.6 生产单耗环比分析",
          model: [
            {
              title: "1.6.1月度生产单耗环比分析",
              name: "ydscd",
              icon: "el-icon-document"
            }
          ]
        }
      ],
      flag: true
    };
  },
  methods: {
    switchClcik() {
      if (this.accord == true) {
        this.accord = false;
      } else {
        this.accord = true;
      }
    },
    reload() {
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
    },
    // 添加 tabs
    addTabs(name, title) {
      if (this.$store.state.tabArr.some(item => item.name == name)) {
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      } else {
        store.commit("addTabArr", {
          name,
          title
        });
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.el-menu-vertical-demo {
  /* width: 199px; */
  min-height: 400px;
  background-color: #0a1420;
}
.el-menu-vertical-demo li {
  background-color: #0a1420;
}
.el-menu {
  border-right: 0;
}
.el-submenu .el-menu-item {
  min-width: 100%;
}
/* 侧边栏 :hover颜色 */
.el-submenu__title:hover {
  background: #4d96f4;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: #4d96f4;
}

.down11 {
  height: 100%;
}
.allHeight {
  height: 100%;
}
.mainBackground {
  background: #f2f2f3;
}
.mainBackground .pagetitle {
  font-size: 30px;
  line-height: 46px;
}
.el-header {
  /* background: #b3c0d1; */
  color: #333;
  padding: 0;
}
/* .el-aside {
  background: #b3c0d1;
  color: #333;
} */
</style>
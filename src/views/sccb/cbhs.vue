<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="searchList"
            style="width:100px;marginLeft:20px;"
          >检索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%"
      :height="tableHeight"
      ref="table"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="baseTableData"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="id" label="生产单号" align="center"></el-table-column>
      <el-table-column prop="id" label="品种" align="center"></el-table-column>
      <el-table-column label="入仓信息" align="center">
        <el-table-column prop="gh" label="数量" align="center"></el-table-column>
        <el-table-column prop="gh" label="时间" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="成本核算" align="center">
        <el-table-column prop="gh" label="标准成本" align="center"></el-table-column>
        <el-table-column prop="gh" label="实际成本" align="center"></el-table-column>
        <el-table-column prop="gh" label="标准偏差" align="center"></el-table-column>
      </el-table-column>

      <el-table-column label="生产部门投入" align="center">
        <el-table-column label="浆染生产投入" align="center">
          <el-table-column prop="ys" label="小计" align="center"></el-table-column>
          <el-table-column label="①原料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface1(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="②辅料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface2(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="③能耗投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface3(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="④机物料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface7(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="⑤人工投入" align="center">
            <template slot-scope="scope">
              <div @click="childInterface8(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="织造生产投入" align="center">
          <el-table-column prop="zjcd" label="小计" align="center"></el-table-column>
          <el-table-column label="①原料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface4(scope.row)(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="②机物料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface7(scope.row)(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="③人工投入" align="center">
            <template slot-scope="scope">
              <div @click="childInterface8(scope.row)(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="后整生产投入" align="center">
          <el-table-column prop="csxm" label="小计" align="center"></el-table-column>
          <el-table-column label="①辅料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface5(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="②能耗投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface6(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="③机物料投入价格" align="center">
            <template slot-scope="scope">
              <div @click="childInterface7(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
          <el-table-column label="④人工投入" align="center">
            <template slot-scope="scope">
              <div @click="childInterface8(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="生产部门外投入" align="center">
        <el-table-column label="①其他部门机物料投入价格" align="center">
          <template slot-scope="scope">
            <div @click="childInterface7(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
          </template>
        </el-table-column>
        <el-table-column label="②其他部门人工投入" align="center">
          <template slot-scope="scope">
            <div @click="childInterface8(scope.row)" style="color:blue;">{{scope.row.ys}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="xmmx" label="③其他部门电费" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="④其他部门水费" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="⑤污水投入费用" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="⑥税金" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="⑦运费" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="⑧销售费用" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="⑨管理费用" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="⑩财务费用" align="center"></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fy"
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";
import store from "@/store";

export default {
  name: "cbhs",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      baseTableData: [
        {
          id: "111",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "合计",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "222",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "333",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "2",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "1"
        },
        {
          id: "444",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "3",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "555",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "4",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "666",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "5",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "777",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "6",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "888",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "7",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "999",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "8",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "123",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "9",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "321",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "141",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "1412",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "123",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "1241",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "123",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "4124",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "1231",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        }
      ],
      ruleForm: {},
      loading: false
    };
  },
  methods: {
    // child interface 子界面
    childInterface1(row) {
      let name = "interface1";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "浆染原料投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface2(row) {
      let name = "interface2";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "浆染辅料投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface3(row) {
      let name = "interface3";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "浆染能耗投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface4(row) {
      let name = "interface4";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "织造原料投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface5(row) {
      let name = "interface5";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "后整辅料投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface6(row) {
      let name = "interface6";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "后整能耗投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface7(row) {
      let name = "interface7";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "机物料投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    childInterface8(row) {
      let name = "interface8";
      let arr = this.$store.state.tabArr
        .filter(item => item.name == name)
        .map(item => item.id);
      let title = "人工投入";

      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
    },
    searchList() {},
    // 加载默认页面
    loadInfo() {
      // this.loading = true;
      // let _data = this.ruleForm;
      // fgxtrApi
      //   .getHouZhengShaiXuan(_data)
      //   .then(res => {
      //     this.baseTableData = res.data;
      //     this.loading = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.tableHeight = this.screenHeight - 200;
    };
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var time = year + "-" + month + "-" + day;
    this.$set(this.ruleForm, "choiceDate", time);
    this.loadInfo();
  }
};
</script>

<style scoped>
.fy {
  text-align: center;
  margin-top: 20px;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
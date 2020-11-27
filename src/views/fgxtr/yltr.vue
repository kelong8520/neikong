<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="色号">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="经纱">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="纬纱">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="出纱时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="入仓时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
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
      :span-method="arraySpanMethod"
      v-loading="loading"
    >
      <el-table-column label="基本信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="生产单号" align="center"></el-table-column>
        <el-table-column prop="gh" label="布编" align="center"></el-table-column>
        <el-table-column prop="ys" label="色号" align="center"></el-table-column>
        <el-table-column prop="ys" label="缸号" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="浆染原料投入产出信息" align="center">
        <el-table-column prop="ys" label="经纱" align="center"></el-table-column>
        <el-table-column label="经纱投入" align="center">
          <el-table-column label="出库时间" align="center">
            <template slot-scope="scope">
              <a
                :href="'http://www.baidu.com?' + scope.row.id"
                target="_blank"
                style="color:blue;"
              >{{scope.row.zjcd}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="zjcd" label="整经长度(m)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="投入纱量(Kg)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="经纱产出" align="center">
          <el-table-column prop="zjcd" label="出轴时间" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="出轴长度(m)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="折合重量(Kg)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="织造原料投入产出信息" align="center">
        <el-table-column label="发坯时间" align="center">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.csxm}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="csxm" label="纬纱" align="center"></el-table-column>
        <el-table-column prop="csxm" label="纬纱投入(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="坯布长度(m)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="百米用纱(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="实际织成率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="后整投入产出信息" align="center">
        <el-table-column prop="gybzz" label="入仓时间" align="center">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.zjcd}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="gybzz" label="成品总长(y)" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="实际制成率" align="center"></el-table-column>
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
import * as fgxtrApi from "@/api/fgxtrApi.js";
import querystring from "querystring";

export default {
  name: "yltr",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 300, //table高度
      baseTableData: [
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "合计",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "2",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "1"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "3",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "4",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "5",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "6",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "7",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "8",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "9",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 4];
        } else if (columnIndex == 2) {
          return [0, 0];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else if (columnIndex == 4) {
          return [0, 0];
        } else if (columnIndex <= 35) {
          return [1, 1];
        } else {
          return [0, 0];
        }
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
      // bzpApi
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
    // var day = date.getDate();
    var time = year + "-" + month;
    this.$set(this.ruleForm, "choiceDate", time);
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../assets/css/common.css";
</style>
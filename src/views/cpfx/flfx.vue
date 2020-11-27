<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="色号">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="成品入仓时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchClick" class="button1">检索</el-button>
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
      <el-table-column label="基础信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="品种" align="center"></el-table-column>
        <el-table-column prop="gh" label="缸号" align="center"></el-table-column>
        <el-table-column prop="ys" label="色号" align="center"></el-table-column>
        <el-table-column prop="ys" label="成品入仓时间" align="center"></el-table-column>
        <el-table-column prop="ys" label="成品长度" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="染色辅料万码用量" align="center">
        <el-table-column label="靛蓝" align="center">
          <el-table-column prop="zjcd" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="烧碱" align="center">
          <el-table-column prop="csxm" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="保险粉" align="center">
          <el-table-column prop="csxm" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="渗透剂" align="center">
          <el-table-column prop="xmmx" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="扩散剂" align="center">
          <el-table-column prop="xmmx" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上浆辅料万码用量" align="center">
        <el-table-column label="高粘淀粉" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="低粘淀粉" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="SS浆料" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整理辅料万码用量" align="center">
        <el-table-column label="烧碱" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂①" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂②" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="柠檬酸" align="center">
          <el-table-column prop="gybzz" label="标准(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(Kg)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
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
import * as cptrApi from "@/api/cptrApi.js";
import querystring from "querystring";

export default {
  name: "flfx",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      baseTableData: [],
      ruleForm: {},
      loading: false
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 5];
        } else if (columnIndex == 2) {
          return [0, 0];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else if (columnIndex == 4) {
          return [0, 0];
        } else if (columnIndex == 5) {
          return [0, 0];
        } else if (columnIndex <= 50) {
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
    searchClick() {},
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
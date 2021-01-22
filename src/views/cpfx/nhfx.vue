<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="色号">
          <el-input v-model="ruleForm.colorNo"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.textileNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="成品入仓时间">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.chengPinRuCangDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否为成品">
          <el-select v-model="ruleForm.isRuCang">
            <el-option label="全部" value></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchList" class="button1">检索</el-button>
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
      element-loading-text="努力加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255, 255, 0.9)"
    >
      <el-table-column label="基础信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column label="布编" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.textileNos"></div>
          </template>
        </el-table-column>
        <el-table-column label="色号" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.colorNo"></div>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
        <el-table-column prop="chengPinRuCangDate" label="成品入仓时间" align="center" width="120"></el-table-column>
        <el-table-column prop="chengPinLength" label="成品入仓数量" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="染色万码能耗用量" align="center">
        <el-table-column label="自来水" align="center">
          <el-table-column prop="standardWater" label="标准(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="realWanMiWater" label="实绩(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="waterOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="standardSteam" label="标准(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="realWanMiSteam" label="实绩(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="steamOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上浆万码能耗用量" align="center">
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="jsStandardSteam" label="标准(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="realWanMiSteam2" label="实绩(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="steamOffset2" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整理万码能耗用量" align="center">
        <el-table-column label="自来水" align="center">
          <el-table-column prop="totalWater" label="标准(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="realtotalWater" label="实绩(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="totalWaterOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="totalSteam" label="标准(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="realtotalSteam" label="实绩(吨)" align="center" width="120"></el-table-column>
          <el-table-column prop="totalSteamOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="天然气" align="center">
          <el-table-column prop="totalGas" label="标准(m³)" align="center" width="120"></el-table-column>
          <el-table-column prop="realtotalGas" label="实绩(m³)" align="center" width="120"></el-table-column>
          <el-table-column prop="totalGasOffset" label="偏差(%)" align="center" width="120"></el-table-column>
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
import * as cpfxApi from "@/api/cpfxApi.js";
import querystring from "querystring";

export default {
  name: "nhfx",
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
        } else if (columnIndex <= 25) {
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
      this.loadInfo();
    },
    searchList() {
      this.currentPage = 1;
      this.loadInfo();
    },
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      this.$set(this.ruleForm, "pageIndex", this.currentPage);
      this.$set(this.ruleForm, "pageSize", this.pageSize);
      let _data = this.ruleForm;
      cpfxApi
        .getNHInputData(querystring.stringify(_data))
        .then(res => {
          this.baseTableData = res.data;
          this.total = res.count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.tableHeight = this.screenHeight - 200;
    };
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../assets/css/common.css";
</style>
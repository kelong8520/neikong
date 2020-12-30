<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="入仓时间">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.rkrq" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.textileNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="经纱">
          <el-input v-model="ruleForm.warpName"></el-input>
        </el-form-item>
        <el-form-item label="纬纱">
          <el-input v-model="ruleForm.weftName"></el-input>
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
      <el-table-column type="index" label="序号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.$index === 0"></span>
          <span v-else>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="textileNo" label="品种" align="center" width="120"></el-table-column>
      <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
      <el-table-column prop="rkrq" label="成品入仓时间" align="center" width="120"></el-table-column>
      <el-table-column prop="length1" label="成品长度(y)" align="center" width="120"></el-table-column>
      <el-table-column label="投入经纱" align="center">
        <el-table-column label="经纱名" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.warpName"></div>
          </template>
        </el-table-column>
        <el-table-column label="长度(m)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.realChuZhouLength"></div>
          </template>
        </el-table-column>
        <el-table-column label="重量(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.realTouRuShaLiang"></div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="出轴长度(m)" align="center" width="120">
        <template slot-scope="scope">
          <div v-html="scope.row.realChuZhouLength"></div>
        </template>
      </el-table-column>
      <el-table-column label="投入纬纱" align="center">
        <el-table-column label="纬纱名" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.weftName"></div>
          </template>
        </el-table-column>
        <el-table-column label="重量(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.touRuShaLiang"></div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="坯布长度(m)" align="center" width="120">
        <template slot-scope="scope">
          <div v-html="scope.row.piJianLength"></div>
        </template>
      </el-table-column>
      <el-table-column label="织成率" align="center">
        <el-table-column prop="gyZhiBuZhiChengLv" label="标准(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="zhiBuZhiChengLv" label="实绩(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="zhiZaoPianCha" label="偏差(%)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="制成率" align="center">
        <el-table-column prop="gyHouZhengZhiChengLv" label="标准(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="houZhengZhiChengLv" label="实绩(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="houZhengPianCha" label="偏差(%)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="经纱百码用量" align="center">
        <el-table-column label="标准(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.baiMaYongJing"></div>
          </template>
        </el-table-column>
        <el-table-column label="实绩(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.baiMaShiJiYongJing"></div>
          </template>
        </el-table-column>
        <el-table-column label="偏差(%)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.baiMaYongJingPianCha"></div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="纬纱百码用量" align="center">
        <el-table-column label="标准(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.biaoZhunBaiMaYongWei"></div>
          </template>
        </el-table-column>
        <el-table-column label="实绩(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.shiCeBaiMaYongWei"></div>
          </template>
        </el-table-column>
        <el-table-column label="偏差(%)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.baiMaYongWeiPianCha"></div>
          </template>
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
  name: "ylfx",
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
          return [1, 3];
        } else if (columnIndex == 2) {
          return [0, 0];
        } else if (columnIndex == 3) {
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
    searchClick() {
      this.currentPage = 1;
      this.loadInfo();
    },
    loadInfo() {
      this.loading = true;
      this.$set(this.ruleForm, "pageIndex", this.currentPage);
      this.$set(this.ruleForm, "pageSize", this.pageSize);
      let _data = this.ruleForm;
      cpfxApi
        .getYLInputData(querystring.stringify(_data))
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
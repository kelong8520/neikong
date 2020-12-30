<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.productionNo"></el-input>
        </el-form-item>
        <el-form-item label="色号">
          <el-input v-model="ruleForm.colorNo"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.textileNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="染色日期">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.ranSeDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="上浆日期">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.shangJiangDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="后整日期">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.houZhengDate" type="date"></el-date-picker>
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
    >
      <el-table-column label="基本信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产单号" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.productionNos"></div>
          </template>
        </el-table-column>
        <el-table-column label="布编" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.textileNos"></div>
          </template>
        </el-table-column>
        <el-table-column prop="colorNo" label="色号" align="center" width="120"></el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="染色辅料用量" align="center">
        <el-table-column label="染色日期" align="center" width="120">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.ranSeDatetime}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="zhengJingLengthRS" label="投入长度(m)" align="center" width="120"></el-table-column>
        <el-table-column prop="wanMiDianLanReal" label="靛蓝(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="wanMiShaoJianReal" label="烧碱(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="wanMiBaoXianFenReal" label="保险粉(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="wanMiShenTouJiReal" label="渗透剂(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="wanMiKuoSanJiReal" label="扩散剂(Kg)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="上浆辅料用量" align="center">
        <el-table-column label="上浆日期" align="center" width="120">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.shangJiangDatetime}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="zhengJingLength" label="投入长度(m)" align="center" width="120"></el-table-column>
        <el-table-column prop="realGndfStandardKg" label="高粘淀粉(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="realDndfStandardKg" label="低粘淀粉(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="realSsjlStandardKg" label="SS浆料(Kg)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="后整理辅料用量" align="center">
        <el-table-column label="后整理日期" align="center" width="120">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.houZhengDate}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="touPiLength" label="投入长度(m)" align="center" width="120"></el-table-column>
        <el-table-column prop="tuiJiangShaoJianRealKg" label="退浆烧碱(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="siGuangShaoJianRealKg" label="丝光烧碱(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="tuiJiangTuiJiangJi1RealKg" label="退浆剂①(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="tuiJiangTuiJiangJi2RealKg" label="退浆剂②(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="tuiJiangNingMengSuanRealKg" label="退浆柠檬酸(Kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="siGuangNingMengSuanRealKg" label="丝光柠檬酸(Kg)" align="center" width="120"></el-table-column>
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
  name: "fltr",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 270, //table高度
      baseTableData: [],
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
      this.loadInfo();
    },
    searchList() {
      this.currentPage = 1;
      this.loadInfo();
    },
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      this.$set(this.ruleForm,"pageIndex",this.currentPage)
      this.$set(this.ruleForm,"pageSize",this.pageSize)
      let _data = this.ruleForm;
      fgxtrApi
        .getFLInputData(querystring.stringify(_data))
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
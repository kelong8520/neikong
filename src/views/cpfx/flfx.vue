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
        <el-table-column label="品种" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.textileNos"></div>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
        <el-table-column prop="colorNo" label="色号" align="center" width="120"></el-table-column>
        <el-table-column prop="chengPinRuCangDate" label="成品入仓时间" align="center" width="120"></el-table-column>
        <el-table-column prop="chengPinLength" label="成品长度" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="染色辅料万码用量" align="center">
        <el-table-column label="靛蓝" align="center">
          <el-table-column prop="wanMiDianLanStandard" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiDianLanReal" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiDianLanOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="烧碱" align="center">
          <el-table-column prop="wanMiShaoJianStandard" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiShaoJianReal" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiShaoJianOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="保险粉" align="center">
          <el-table-column prop="wanMiBaoXianFenStandard" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiBaoXianFenReal" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiBaoXianFenOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="渗透剂" align="center">
          <el-table-column prop="wanMiShenTouJiStandard" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiShenTouJiReal" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiShenTouJiOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="扩散剂" align="center">
          <el-table-column prop="wanMiKuoSanJiStandard" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiKuoSanJiReal" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMiKuoSanJiOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上浆辅料万码用量" align="center">
        <el-table-column label="高粘淀粉" align="center">
          <el-table-column prop="gndfStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="realGndfStandardKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="gndfOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="低粘淀粉" align="center">
          <el-table-column prop="dndfStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="realDndfStandardKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="dndfOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="SS浆料" align="center">
          <el-table-column prop="ssjlStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="realSsjlStandardKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="ssjlOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整理辅料万码用量" align="center">
        <el-table-column label="退浆烧碱" align="center">
          <el-table-column prop="tuiJiangShaoJianStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangShaoJianRealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangShaoJianOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="丝光烧碱" align="center">
          <el-table-column prop="siGuangShaoJianStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="siGuangShaoJianRealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="siGuangShaoJianOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂①" align="center">
          <el-table-column prop="tuiJiangTuiJiangJi1StandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangTuiJiangJi1RealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangTuiJiangJi1Offset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂②" align="center">
          <el-table-column prop="tuiJiangTuiJiangJi2StandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangTuiJiangJi2RealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangTuiJiangJi2Offset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆柠檬酸" align="center">
          <el-table-column prop="tuiJiangNingMengSuanStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangNingMengSuanRealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangNingMengSuanOffset" label="偏差(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="丝光柠檬酸" align="center">
          <el-table-column prop="siGuangNingMengSuanStandardKg" label="标准(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="siGuangNingMengSuanRealKg" label="实绩(Kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="siGuangNingMengSuanOffset" label="偏差(%)" align="center" width="120"></el-table-column>
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
      this.loadInfo();
    },
    searchClick() {
      this.currentPage = 1;
      this.loadInfo();
    },
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      this.$set(this.ruleForm,"pageIndex",this.currentPage)
      this.$set(this.ruleForm,"pageSize",this.pageSize)
      let _data = this.ruleForm;
      cpfxApi
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
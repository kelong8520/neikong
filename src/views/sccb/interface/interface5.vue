<template>
  <div>
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
      element-loading-text="努力加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255, 255, 0.9)"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="productionNos" label="生产单号" align="center" width="120"></el-table-column>
      <el-table-column prop="textileNos" label="品种" align="center" width="120"></el-table-column>
      <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
      <el-table-column label="入仓信息" align="center">
        <el-table-column prop="chengPinLength" label="数量(y)" align="center" width="120"></el-table-column>
        <el-table-column prop="chengPinRuCangDate" label="时间" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column prop="realJiaGeTotal" label="实际投入价格合计" align="center" width="120"></el-table-column>
      <el-table-column label="后整辅料投入" align="center">
        <el-table-column label="烧碱" align="center">
          <el-table-column prop="useQuantitySJ" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaSJ" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalSJ" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeSJ" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeSJ" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaSJ" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂①" align="center">
          <el-table-column prop="useQuantityTJJ1" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaTJJ1" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalTJJ1" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeTJJ1" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeTJJ1" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaTJJ1" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="退浆剂②" align="center">
          <el-table-column prop="useQuantityTJJ2" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaTJJ2" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalTJJ2" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeTJJ2" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeTJJ2" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaTJJ2" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="柠檬酸" align="center">
          <el-table-column prop="useQuantityNMS" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaNMS" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalNMS" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeNMS" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeNMS" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaNMS" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "interface5",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 100, //table高度
      baseTableData: [],
      loading: false,
      productionNo:"",
    };
  },
  beforeRouteUpdate(to, from, next) {
    //next方法使URL显示正常
    next();
    //数据改变的方法（此处为自定义的数据改变方法）
    this.productionNo = to.query.productionNo;
    this.loadInfo();
  },
  methods: {
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      // let _data = this.ruleForm;
      let _data = {
        productionNo: this.productionNo
      };
      sccbApi
        .gethzfl(_data)
        .then(res => {
          this.baseTableData = res.data;
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
      this.tableHeight = this.screenHeight - 100;
    };
    this.productionNo = this.$route.query.productionNo;
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../../assets/css/common.css";
</style>
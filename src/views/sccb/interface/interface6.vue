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
      <el-table-column label="后整能耗投入" align="center">
        <el-table-column label="水" align="center">
          <el-table-column prop="useQuantityHZS" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaHZS" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalHZS" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeHZS" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeHZS" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaHZS" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="useQuantityHZZQ" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaHZZQ" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalHZZQ" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeHZZQ" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeHZZQ" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaHZZQ" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="天然气" align="center">
          <el-table-column prop="useQuantityHZTRQ" label="使用数量" align="center" width="120"></el-table-column>
          <el-table-column prop="danJiaHZTRQ" label="单价" align="center" width="120"></el-table-column>
          <el-table-column prop="useTotalHZTRQ" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaBiaoZhunJiaGeHZTRQ" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="baiMaRealJiaGeHZTRQ" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="biaoZhunPianChaHZTRQ" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "interface6",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 100, //table高度
      baseTableData: [],
      loading: false,
      productionNo:""
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
        .gethznh(_data)
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
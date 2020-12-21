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
      <el-table-column label="浆染辅料投入" align="center">
        <el-table-column label="染色辅料" align="center">
          <el-table-column label="靛蓝" align="center">
            <el-table-column prop="useQuantityDL" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaDL" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalDL" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeDL" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeDL" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaDL" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="烧碱" align="center">
            <el-table-column prop="useQuantitySJ" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaSJ" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalSJ" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeSJ" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeSJ" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaSJ" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="保险粉" align="center">
            <el-table-column prop="useQuantityBXF" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaBXF" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalBXF" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeBXF" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeBXF" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaBXF" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="高粘淀粉" align="center">
            <el-table-column prop="useQuantityGZDF" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaGZDF" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalGZDF" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeGZDF" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeGZDF" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaGZDF" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="低粘淀粉" align="center">
            <el-table-column prop="useQuantityDZDF" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaDZDF" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalDZDF" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeDZDF" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeDZDF" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaDZDF" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="SS浆料" align="center">
            <el-table-column prop="useQuantitySSJL" label="使用数量" align="center" width="120"></el-table-column>
            <el-table-column prop="danJiaSSJL" label="单价" align="center" width="120"></el-table-column>
            <el-table-column prop="useTotalSSJL" label="总额" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaBiaoZhunJiaGeSSJL" label="百码投入标准价格" align="center" width="120"></el-table-column>
            <el-table-column prop="baiMaRealJiaGeSSJL" label="百码投入实际价格" align="center" width="120"></el-table-column>
            <el-table-column prop="biaoZhunPianChaSSJL" label="标准偏差" align="center" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "interface2",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 100, //table高度
      baseTableData: [],
      loading: false
    };
  },
  methods: {
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      // let _data = this.ruleForm;
      let _data = {
        productionNo: "GZ2011-295"
      };
      sccbApi
        .getjrfl(_data)
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
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../../assets/css/common.css";
</style>
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
      <el-table-column prop="id" label="生产单号" align="center" width="120"></el-table-column>
      <el-table-column prop="id" label="品种" align="center" width="120"></el-table-column>
      <el-table-column prop="id" label="缸号" align="center" width="120"></el-table-column>
      <el-table-column label="入仓信息" align="center">
        <el-table-column prop="gh" label="数量(y)" align="center" width="120"></el-table-column>
        <el-table-column prop="gh" label="时间" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column prop="gh" label="实际投入价格合计" align="center" width="120"></el-table-column>
      <el-table-column label="机物料投入" align="center">
        <el-table-column label="浆染" align="center">
          <el-table-column prop="ys" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="织造" align="center">
          <el-table-column prop="ys" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="后整" align="center">
          <el-table-column prop="ys" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="公务电气" align="center">
          <el-table-column prop="ys" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="其他" align="center">
          <el-table-column prop="ys" label="总额" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入标准价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="百码投入实际价格" align="center" width="120"></el-table-column>
          <el-table-column prop="ys" label="标准偏差" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "interface7",
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
        .getjryl(_data)
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
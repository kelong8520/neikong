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
          <el-button type="primary" @click.native="searchList" style="width:100px;marginLeft:20px;">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%"
      max-height="600"
      ref="table"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="baseTableData"
    >
      <el-table-column label="基本信息" align="center">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="生产单号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="布编" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="色号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="缸号" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="浆染原料投入产出信息" align="center">
        <el-table-column prop="realPrice" label="经纱" align="center"></el-table-column>
        <el-table-column label="经纱投入" align="center">
          <el-table-column prop="realPrice" label="出库时间" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="整经长度(m)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="投入纱量(Kg)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="经纱产出" align="center">
          <el-table-column prop="realPrice" label="出轴时间" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="出轴长度(m)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="折合重量(Kg)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="织造原料投入产出信息" align="center">
        <el-table-column type="sjjsfs" label="发坯时间" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="纬纱" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="纬纱投入(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="坯布长度(m)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="百米用纱(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="实际织成率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="后整投入产出信息" align="center">
        <el-table-column type="sjjsfs" label="入仓时间" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="成品总长(y)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="实际制成率" align="center"></el-table-column>
      </el-table-column>
      <!-- <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.province}}-{{scope.row.city}}</div>
        </template>
      </el-table-column>-->
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
      baseTableData: [],
      ruleForm: {}
    };
  },
  methods: {
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
    },
    searchList() {},
    refreshList() {
      this.ruleForm = {};
    }
  },
  mounted() {}
};
</script>

<style scoped>
.fy {
  text-align: center;
  margin-top: 20px;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
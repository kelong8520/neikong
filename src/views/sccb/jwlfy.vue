<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="日期">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="领用部门">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="机物料名称">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="searchList"
            style="width:100px;marginLeft:20px;"
          >筛选</el-button>
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
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="realPrice" label="日期" align="center"></el-table-column>
      <el-table-column prop="sjjsfs" label="领用部门" align="center"></el-table-column>
      <el-table-column prop="sjjsfs" label="机物料名称" align="center"></el-table-column>
      <el-table-column prop="realPrice" label="出库件数" align="center"></el-table-column>
      <el-table-column prop="sjjsfs" label="单价" align="center"></el-table-column>
      <el-table-column prop="sjjsfs" label="总额" align="center"></el-table-column>
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
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "jwlfy",
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
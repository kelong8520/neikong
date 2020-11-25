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
        <el-form-item label="染色日期">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="上浆日期">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="后整理日期">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
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
      <el-table-column label="基本信息" align="center">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="生产单号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="布编" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="色号" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="缸号" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="染色能耗使用" align="center">
        <el-table-column prop="realPrice" label="染色日期" align="center"></el-table-column>
        <el-table-column prop="realPrice" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column label="自来水" align="center">
          <el-table-column prop="realPrice" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="realPrice" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上浆能耗用量" align="center">
        <el-table-column prop="realPrice" label="上浆日期" align="center"></el-table-column>
        <el-table-column prop="realPrice" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="realPrice" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整理能耗用量" align="center">
        <el-table-column prop="realPrice" label="后整理日期" align="center"></el-table-column>
        <el-table-column prop="realPrice" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column label="自来水" align="center">
          <el-table-column prop="realPrice" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="realPrice" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="天然气" align="center">
          <el-table-column prop="realPrice" label="标准(m³)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="实绩(m³)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="偏差(%)" align="center"></el-table-column>
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
import * as fgxtrApi from "@/api/fgxtrApi.js";
import querystring from "querystring";

export default {
  name: "nhtr",
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
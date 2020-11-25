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
        <el-form-item label="后整日期">
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
      <el-table-column label="染色辅料用量" align="center">
        <el-table-column prop="realPrice" label="染色日期" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="靛蓝(Kg)" align="center"></el-table-column>
        <el-table-column prop="realPrice" label="烧碱(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="保险粉(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="渗透剂(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="扩散剂(Kg)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="上浆辅料用量" align="center">
        <el-table-column type="sjjsfs" label="上浆日期" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="高粘淀粉(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="低粘淀粉(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="SS浆料(Kg)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="后整理辅料用量" align="center">
        <el-table-column prop="sjjsfs" label="后整理日期" align="center"></el-table-column>
        <el-table-column type="sjjsfs" label="投入长度(m)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="烧碱(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="退浆剂①(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="退浆剂②(Kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="柠檬酸(Kg)" align="center"></el-table-column>
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
  name: "fltr",
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
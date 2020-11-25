<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item label="品种">
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
      <el-table-column prop="realPrice" label="生产单号" align="center"></el-table-column>
      <el-table-column prop="sjjsfs" label="品种" align="center"></el-table-column>
      <el-table-column label="入仓信息" align="center">
        <el-table-column prop="realPrice" label="数量" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="时间" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="sjjsfs" label="成本核算" align="center">
        <el-table-column prop="sjjsfs" label="标准成本" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="实际成本" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="标准偏差" align="center"></el-table-column>
      </el-table-column>

      <el-table-column label="生产部门投入" align="center">
        <el-table-column label="浆染生产投入" align="center">
          <el-table-column prop="sjjsfs" label="小计" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="①原料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="②辅料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="③能耗投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="④机物料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="⑤人工投入" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="织造生产投入" align="center">
          <el-table-column prop="sjjsfs" label="小计" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="①原料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="②机物料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="③人工投入" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="后整生产投入" align="center">
          <el-table-column prop="sjjsfs" label="小计" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="①辅料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="②能耗投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="③机物料投入价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="④人工投入" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="生产部门外投入" align="center">
        <el-table-column prop="sjjsfs" label="①其他部门机物料投入价格" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="②其他部门人工投入" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="③其他部门电费" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="④其他部门水费" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑤污水投入费用" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑥税金" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑦运费" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑧销售费用" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑨管理费用" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="⑩财务费用" align="center"></el-table-column>
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
import * as sccbApi from "@/api/sccbApi.js";
import querystring from "querystring";

export default {
  name: "cbhs",
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
<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="——">
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
      <el-table-column prop="realPrice" label="时间" align="center"></el-table-column>
      <el-table-column label="基础信息" align="center">
        <el-table-column label="产出关系" align="center">
          <el-table-column prop="sjjsfs" label="成品入库(万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="染色数量(万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="交轴数量(万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="织布交坯量(万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="原料投入关系" align="center">
          <el-table-column prop="sjjsfs" label="原料投入总量(kg)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="经纱投入(kg)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="纬纱投入(kg)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="人工关系" align="center">
          <el-table-column prop="sjjsfs" label="法定工作天数(天)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="在籍总人数(人)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="人工分析" align="center">
        <el-table-column prop="sjjsfs" label="万码用工(人)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="原料投入分析" align="center">
        <el-table-column prop="sjjsfs" label="投入产出系数(y/kg)" align="center"></el-table-column>
        <el-table-column prop="realPrice" label="经纱(交轴/经纱)(m/kg)" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="纬纱(交坯/纬纱)(m/kg)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="sjjsfs" label="过程损耗分析" align="center">
        <el-table-column prop="sjjsfs" label="发生总量(kg/万码)" align="center"></el-table-column>
        <el-table-column label="浆染过程损耗分析" align="center">
          <el-table-column prop="sjjsfs" label="浆染废纱损耗(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="织造过程损耗分析" align="center">
          <el-table-column prop="sjjsfs" label="织布废纱损耗(%)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="织布废布损耗(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="后整过程损耗分析" align="center">
          <el-table-column prop="sjjsfs" label="后整废布损耗(kg/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="检验废布损耗(kg/万码)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="辅料单耗投入分析" align="center">
        <el-table-column label="染色辅料分析" align="center">
          <el-table-column prop="sjjsfs" label="染色材料(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="靛蓝染料(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="保险粉(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="烧碱(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="其他染色辅料(kg/万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="上浆辅料分析" align="center">
          <el-table-column prop="sjjsfs" label="上浆材料(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="变性淀粉(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="SS浆料(kg/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="其他上浆材料(kg/万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="织造辅料分析" align="center">
          <el-table-column prop="sjjsfs" label="织机辅助材料投入量/总交坯量(kg/万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="后整辅料分析" align="center">
          <el-table-column prop="sjjsfs" label="后整理材料(kg/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="烧碱投入(kg/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="退浆酶投入(kg/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="其他后整(kg/万码)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>


      <el-table-column label="能耗及污水处理单耗分析" align="center">
        <el-table-column label="能耗合计分析" align="center">
          <el-table-column prop="sjjsfs" label="全厂万码用水(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="全厂万码用电(kw.h/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="万码用天然气(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="全厂用蒸汽(ton/万码)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="浆染能耗分析" align="center">
          <el-table-column prop="sjjsfs" label="浆染用水单耗(ton/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="浆染用电单耗kw.h/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="浆染用汽单耗(ton/万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="织造能耗分析" align="center">
          <el-table-column prop="sjjsfs" label="织布用电单耗(kw.h/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="织布用水单耗(ton/万米)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="后整能耗分析" align="center">
          <el-table-column prop="sjjsfs" label="后整用水单耗(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="后整用电单耗(kw.h/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="后整用汽单耗(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="后整天然气单耗(ton/万码)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="污水处理单耗分析" align="center">
          <el-table-column prop="sjjsfs" label="污水处理万码用水(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="污水处理万码用电(kw.h/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="污水处理万码药剂(ton/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="污水处理万码排放量(ton/万码)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="机物料投入分析" align="center">
          <el-table-column prop="sjjsfs" label="浆染机物料分析(元/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="织造机物料分析(元/万米)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="后整机物料分析(元/万码)" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="公务电气机物料分析(元/万码)" align="center"></el-table-column>
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
import * as ydscdApi from "@/api/ydscdApi.js";
import querystring from "querystring";

export default {
  name: "ydscd",
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
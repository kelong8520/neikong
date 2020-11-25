<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="色号">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="成品入仓时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="searchClick"
            style="width:100px;marginLeft:5px;"
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
      :span-method="arraySpanMethod"
    >
      <el-table-column label="基础信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="布编" align="center"></el-table-column>
        <el-table-column prop="gh" label="色号" align="center"></el-table-column>
        <el-table-column prop="ys" label="缸号" align="center"></el-table-column>
        <el-table-column prop="ys" label="成品入仓时间" align="center"></el-table-column>
        <el-table-column prop="ys" label="成品入仓数量" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="染色万码能耗用量" align="center">
        <el-table-column label="自来水" align="center">
          <el-table-column prop="zjcd" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="zjcd" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="zjcd" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上浆万码能耗用量" align="center">
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="csxm" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="csxm" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整理万码能耗用量" align="center">
        <el-table-column label="自来水" align="center">
          <el-table-column prop="xmmx" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="蒸汽" align="center">
          <el-table-column prop="xmmx" label="标准(吨)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="实绩(吨)" align="center"></el-table-column>
          <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="天然气" align="center">
          <el-table-column prop="gybzz" label="标准(m³)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="实绩(m³)" align="center"></el-table-column>
          <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as cptrApi from "@/api/cptrApi.js";
import querystring from "querystring";

export default {
  name: "nhfx",
  data() {
    return {
      baseTableData: [
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "合计",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "2",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "1"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "3",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "4",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "5",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "6",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "7",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "8",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "9",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        },
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "10",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          state: "0"
        }
      ],
      ruleForm: {}
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 2) {
          return [1, 6];
        } else if (columnIndex <= 5) {
          return [0, 0];
        } else if (columnIndex <= 25) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
    },
    searchClick() {}
  },
  mounted() {}
};
</script>

<style scoped>
.el-form--inline .el-form-item {
  margin-right: 5px;
}
</style>
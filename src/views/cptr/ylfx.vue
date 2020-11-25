<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="入仓时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="经纱">
          <el-input v-model="ruleForm.a"></el-input>
        </el-form-item>
        <el-form-item label="纬纱">
          <el-input v-model="ruleForm.a"></el-input>
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
      <el-table-column type="index" label="序号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.$index === 0"></span>
          <span v-else>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="品种" align="center"></el-table-column>
      <el-table-column prop="gh" label="缸号" align="center"></el-table-column>
      <el-table-column prop="ys" label="成品入仓时间" align="center"></el-table-column>
      <el-table-column prop="ys" label="成品长度(y)" align="center"></el-table-column>
      <el-table-column label="投入经纱" align="center">
        <el-table-column prop="zjcd" label="经纱名" align="center"></el-table-column>
        <el-table-column prop="zjcd" label="长度(m)" align="center"></el-table-column>
        <el-table-column prop="zjcd" label="重量(Kg)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="zjcd" label="出轴长度(m)" align="center"></el-table-column>
      <el-table-column label="投入纬纱" align="center">
        <el-table-column prop="csxm" label="纬纱名" align="center"></el-table-column>
        <el-table-column prop="csxm" label="重量(Kg)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="csxm" label="坯布长度(m)" align="center"></el-table-column>
      <el-table-column label="织成率" align="center">
        <el-table-column prop="csxm" label="标准(%)" align="center"></el-table-column>
        <el-table-column prop="csxm" label="实绩(%)" align="center"></el-table-column>
        <el-table-column prop="csxm" label="偏差(%)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="制成率" align="center">
        <el-table-column prop="gybzz" label="标准(%)" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="实绩(%)" align="center"></el-table-column>
        <el-table-column prop="gybzz" label="偏差(%)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="经纱百码用量" align="center">
        <el-table-column prop="xmmx" label="标准(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="实绩(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="纬纱百码用量" align="center">
        <el-table-column prop="xmmx" label="标准(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="实绩(Kg)" align="center"></el-table-column>
        <el-table-column prop="xmmx" label="偏差(%)" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as cptrApi from "@/api/cptrApi.js";
import querystring from "querystring";

export default {
  name: "ylfx",
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
        if (columnIndex === 3) {
          return [1, 4];
        } else if (columnIndex <= 3) {
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
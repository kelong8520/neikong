<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm">
        <el-form-item label="时间">
          <el-date-picker value-format="yyyy-MM" v-model="ruleForm.choiceDate" type="month"></el-date-picker>
        </el-form-item>
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.productionNo"></el-input>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="ruleForm.textileNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <!-- <el-form-item label="结存是否为零">
          <el-select v-model="ruleForm.isJieCun">
            <el-option label="全部" value></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click.native="calculateClick" class="button1">重新计算</el-button>
          <el-button type="primary" @click.native="searchClick" class="button1">检索</el-button>
          <el-button type="primary" @click.native="sureClick" class="button1">确定存入</el-button>
          <el-button type="primary" @click.native="financialClick" class="button1">财务审核</el-button>
          <el-button type="primary" @click.native="exportExcel" class="button1">导出excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="out-table"
      highlight-current-row
      style="width: 100%"
      :height="tableHeight"
      ref="table"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="baseTableData"
      :span-method="arraySpanMethod"
      v-loading="loading"
      element-loading-text="努力加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255, 255, 0.9)"
    >
      <el-table-column type="index" label="序号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.$index === 0"></span>
          <span v-else>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productionNo" label="生产单号" align="center" width="120"></el-table-column>
      <el-table-column prop="textileNo" label="品种" align="center" width="120"></el-table-column>
      <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
      <el-table-column prop="checkCardNo" label="坯布代码" align="center" width="150"></el-table-column>
      <el-table-column prop="piBulength" label="坯布长度(m)" align="center" width="120"></el-table-column>
      <el-table-column label="坯布状态" align="center" width="120">
        <template slot-scope="scope">
          <div>{{
            scope.row.piBuState == 0?"坯布":scope.row.piBuState == 1
            ?"烧毛退浆":scope.row.piBuState == 2?"丝光":scope.row.piBuState == 3
            ?"定型拉幅":scope.row.piBuState == 4?"柔软":scope.row.piBuState == 5
            ?"预缩":scope.row.piBuState == 6?"烧毛预缩":scope.row.piBuState == 7?"检验开始":""
            }}</div>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" width="120">
        <template slot-scope="scope">
          <div>{{scope.row.state == 0?"未审核":scope.row.state == 1?"已审核":""}}</div>
        </template>
      </el-table-column>
      <el-table-column label="实际盘点长度(m)" align="center" width="130">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.lengthReal}}</div>
          <div v-else>
            <el-input v-model="scope.row.lengthReal"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lengthPanDianCha" label="系统实物盘点差(m)" align="center" width="150"></el-table-column>
      <el-table-column label="最终确认盘点结存(m)" align="center" width="160">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.lengthJieCun}}</div>
          <div v-else>
            <el-input v-model="scope.row.lengthJieCun"></el-input>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="remarks" label="备注" align="center" width="120">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.remarks}}</div>
          <div v-else>
            <el-input v-model="scope.row.remarks"></el-input>
          </div>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import * as bzpApi from "@/api/bzpApi.js";
import querystring from "querystring";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import "./../../assets/css/common.css";

export default {
  name: "hzbzp",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      baseTableData: [],
      ruleForm: {},
      colIndex: "",
      loading: false
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 3];
        } else if (columnIndex == 2) {
          return [0, 0];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else if (columnIndex <= 35) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
    },
    // 检索
    searchClick() {
      this.loading = true;
      let _data = this.ruleForm;
      bzpApi
        .getHouZhengShaiXuan(_data)
        .then(res => {
          this.baseTableData = res.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重新计算
    calculateClick() {
      this.$confirm("是否对本月数据进行重新计算?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let _data = this.ruleForm;
          bzpApi
            .getHouZheng(querystring.stringify(_data))
            .then(res => {
              this.loading = false;
              if (!res.data) {
                this.$message({ message: res.tipInfo, duration: 2000 });
              } else {
                this.baseTableData = res.data;
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 确定保存
    sureClick() {
      this.loading = true;
      let _data = this.baseTableData;
      bzpApi
        .addHouZheng(_data)
        .then(res => {
          // if (!res.data) {
          this.$message({ message: res.tipInfo, duration: 2000 });
          // } else {
          this.loadInfo();
          // }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 财务审核
    financialClick() {
      this.$confirm("是否对本月数据进行审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let _data = {
            choiceDate: this.ruleForm.choiceDate
          };
          bzpApi
            .HouZhengSheHe(querystring.stringify(_data))
            .then(res => {
              this.$message({ message: res.tipInfo, duration: 2000 });
              this.loading = false;
              this.loadInfo();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 导出
    exportExcel() {
      this.downloadLoading = true;
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "后整半制品明细细表.xlsx"
        );
        this.downloadLoading = false;
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      let _data = this.ruleForm;
      bzpApi
        .getHouZhengShaiXuan(_data)
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
      this.tableHeight = this.screenHeight - 200;
    };
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    // var day = date.getDate();
    var time = year + "-" + month;
    this.$set(this.ruleForm, "choiceDate", time);
    this.loadInfo();
  }
};
</script>

<style scoped>
</style>
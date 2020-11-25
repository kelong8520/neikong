<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm">
        <el-form-item label="时间">
          <el-date-picker value-format="yyyy-MM" v-model="ruleForm.choiceDate" type="month"></el-date-picker>
        </el-form-item>
        <el-form-item label="纬纱名称">
          <el-input v-model="ruleForm.val"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="calculateClick"
            style="width:100px;marginLeft:20px;"
          >重新计算</el-button>
          <el-button
            type="primary"
            @click.native="searchClick"
            style="width:100px;marginLeft:20px;"
          >检索</el-button>
          <el-button
            type="primary"
            @click.native="sureClick"
            style="width:100px;marginLeft:20px;"
          >确定存入</el-button>
          <el-button
            type="primary"
            @click.native="financialClick"
            style="width:100px;marginLeft:20px;"
          >财务审核</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      <!-- :span-method="arraySpanMethod" -->
      <el-table-column type="index" label="序号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.$index === 0"></span>
          <span v-else>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="纬纱名称" align="center"></el-table-column>
      <el-table-column label="审批状态" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.state == 0?"未审核":scope.row.state == 1?"已审核":""}}</div>
        </template>
      </el-table-column>
      <el-table-column label="期初库存" align="center">
        <el-table-column prop="gh" label="重量(kg)" align="center"></el-table-column>
        <el-table-column prop="gh" label="个数" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="本期领入" align="center">
        <el-table-column prop="ys" label="重量(kg)" align="center"></el-table-column>
        <el-table-column prop="ys" label="个数" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="ys" label="本期投入" align="center"></el-table-column>
      <el-table-column prop="zjcd" label="本期结存" align="center"></el-table-column>
      <el-table-column label="实际盘点数量" align="center">
        <el-table-column label="重量(kg)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == 0">{{scope.row.xmmx}}</div>
            <div v-else>
              <el-input v-model="scope.row.xmmx"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="个数" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == 0">{{scope.row.xmmx}}</div>
            <div v-else>
              <el-input v-model="scope.row.xmmx"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="xmmx" label="系统实物盘点差" align="center"></el-table-column>
      <el-table-column label="最终确认盘点结存" align="center">
        <el-table-column label="重量(kg)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == 0">{{scope.row.jianShuJieCun}}</div>
            <div v-else>
              <el-input v-model="scope.row.jianShuJieCun"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="个数" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == 0">{{scope.row.lengthJieCun}}</div>
            <div v-else>
              <el-input v-model="scope.row.lengthJieCun"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as bzpApi from "@/api/bzpApi.js";
import querystring from "querystring";

export default {
  name: "zzwspd",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      baseTableData: [],
      ruleForm: {},
      // choiceDate: new Date(),
      colIndex: "",
      loading: false
    };
  },
  methods: {
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     if (columnIndex <= 9) {
    //       return [1, 1];
    //     } else {
    //       return [0, 0];
    //     }
    //   }
    // },
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
              if (!res.data) {
                this.$message({ message: res.tipInfo, duration: 2000 });
              } else {
                this.baseTableData = res.data;
              }
              this.loading = false;
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
          if (!res.data) {
            this.$message({ message: res.tipInfo, duration: 2000 });
          } else {
            this.loadInfo();
          }
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
    // var day = date.getDate();
    var time = year + "-" + month;
    this.$set(this.ruleForm, "choiceDate", time);
    this.loadInfo();
  }
};
</script>

<style scoped>
/* @import "./../../assets/css/common.css"; */
</style>
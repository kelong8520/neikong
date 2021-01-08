<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" ref="ruleForm" :model="ruleForm">
        <el-form-item label="生产单号">
          <el-input v-model="ruleForm.productionNo"></el-input>
        </el-form-item>
        <el-form-item label="色号">
          <el-input v-model="ruleForm.colorNo"></el-input>
        </el-form-item>
        <el-form-item label="布编">
          <el-input v-model="ruleForm.textileNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="经纱">
          <el-input v-model="ruleForm.warpName"></el-input>
        </el-form-item>
        <el-form-item label="纬纱">
          <el-input v-model="ruleForm.weftName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="出纱时间">
          <el-date-picker v-model="ruleForm.val" type="date"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="入仓时间">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.rkrq" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="searchList"
            style="width:100px;marginLeft:20px;"
          >检索</el-button>
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
      :span-method="arraySpanMethod"
      v-loading="loading"
      element-loading-text="努力加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255, 255, 0.9)"
    >
      <el-table-column label="基本信息" align="center">
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index === 0"></span>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productionNo" label="生产单号" align="center" width="120"></el-table-column>
        <el-table-column prop="textileNo" label="布编" align="center" width="120"></el-table-column>
        <el-table-column prop="colorNo" label="色号" align="center" width="120"></el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="浆染原料投入产出信息" align="center">
        <el-table-column label="经纱" align="center" width="120">
          <template slot-scope="scope">
              <div v-html="scope.row.warpName"></div>
            </template>
        </el-table-column>
        <el-table-column label="经纱投入" align="center">
          <!-- <el-table-column label="出库时间" align="center" width="120">
            <template slot-scope="scope">
              <a
                :href="'http://www.baidu.com?' + scope.row.id"
                target="_blank"
                style="color:blue;"
                v-html="scope.row.chuKuDate"
              ></a>
            </template>
          </el-table-column> -->
          <el-table-column label="整经长度(m)" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.zhengJingLength"></div>
            </template>
          </el-table-column>
          <el-table-column label="投入纱量(Kg)" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.realTouRuShaLiang"></div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="经纱产出" align="center">
          <el-table-column label="出轴时间" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.chuZhouDatetime"></div>
            </template>
          </el-table-column>
          <el-table-column label="出轴长度(m)" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.realChuZhouLength"></div>
            </template>
          </el-table-column>
          <el-table-column label="折合重量(Kg)" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.zheHeZhongLiang"></div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="织造原料投入产出信息" align="center">
        <el-table-column label="发坯时间" align="center" width="120">
          <template slot-scope="scope">
            <a :href="'http://www.baidu.com?' + scope.row.id" target="_blank" style="color:blue;" v-html="scope.row.shouPiDT"></a>
          </template>
        </el-table-column>
        <el-table-column label="纬纱" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.weftName"></div>
          </template>
        </el-table-column>
        <el-table-column label="纬纱投入(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.chuKuWeight"></div>
          </template>
        </el-table-column>
        <el-table-column label="坯布长度(m)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.piJianLength"></div>
          </template>
        </el-table-column>
        <el-table-column label="百米用纱(Kg)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.shiCeBaiMiYongWei"></div>
          </template>
        </el-table-column>
        <el-table-column label="实际织成率" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.shiJiZhiChengLv"></div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="后整投入产出信息" align="center">
        <el-table-column label="入仓时间" align="center">
          <template slot-scope="scope">
            <a
              :href="'http://www.baidu.com?' + scope.row.id"
              target="_blank"
              style="color:blue;"
            >{{scope.row.rkrq}}</a>
          </template>
        </el-table-column>
        <el-table-column label="成品总长(y)" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.length1"></div>
          </template>
        </el-table-column>
        <el-table-column label="实际制成率" align="center" width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.shiJiZhiChengLvHZ"></div>
          </template>
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
  name: "yltr",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 270, //table高度
      baseTableData: [],
      ruleForm: {},
      loading: false
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 2) {
          return [1, 4];
        } else if (columnIndex == 1) {
          return [0, 0];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else if (columnIndex == 4) {
          return [0, 0];
        } else if (columnIndex <= 35) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
    },
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.loadInfo();
    },
    searchList() {
      this.currentPage = 1;
      this.loadInfo();
    },
    // 加载默认页面
    loadInfo() {
      this.loading = true;
      this.$set(this.ruleForm, "pageIndex", this.currentPage);
      this.$set(this.ruleForm, "pageSize", this.pageSize);
      let _data = this.ruleForm;
      fgxtrApi
        .getYLInputData(querystring.stringify(_data))
        .then(res => {
          this.baseTableData = res.data;
          this.total = res.count;
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
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../assets/css/common.css";
</style>
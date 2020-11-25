<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择时间">
          <el-date-picker
            value-format="yyyy-MM"
            v-model="choiceDate"
            type="month"
            @change="dateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="sureSaveClick"
            class="buttonCS"
            size="medium"
          >确认保存</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="recountClick" class="buttonCS" size="medium">重新计算</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="kindData"
      ref="table"
      style="width: 100%"
      highlight-current-row
      :height="tableHeight"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="name" label="基础项目" align="center"></el-table-column>
      <el-table-column label="标准用量" align="center">
        <el-table-column prop="stardYongLiang" label="用量" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.stardYongLiang }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stardDanJia" label="单价" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.stardDanJia }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stardYongLiangJinEHeji" label="金额合计" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="实际用量" align="center">
        <el-table-column prop="shiJiYongLiang" label="用量" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.shiJiYongLiang }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="shiJiDanJia" label="单价" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.shiJiDanJia }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="shiJiYongLiangJinEHeJi" label="金额合计" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="实际支付价格" align="center">
        <el-table-column prop="zhiFuJinE" label="金额" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < colIndex -1">
              <el-input-number
                v-model="scope.row.zhiFuJinE"
                :controls="false"
                :precision="2"
                :min="0"
                :disabled="scope.row.shiJiYongLiangJinEHeJi == 0"
              ></el-input-number>
            </div>
            <div v-else-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.zhiFuJinE }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="zhiFuFangShi" label="支付方式" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < colIndex -1">
              <el-input
                v-model="scope.row.zhiFuFangShi"
                :disabled="scope.row.shiJiYongLiangJinEHeJi == 0"
              ></el-input>
            </div>
            <div v-else-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.zhiFuFangShi }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="用量标准偏差" align="center">
        <el-table-column prop="ylPianChaValue" label="偏差数值" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.ylPianChaValue }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ylPianChaBiLi" label="偏差比例" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.ylPianChaBiLi }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="支付价格偏差" align="center">
        <el-table-column prop="zfjgPianChaValue" label="偏差数值" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.zfjgPianChaValue }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="zfjgPianChaBiLi" label="偏差比例(%)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index == colIndex-1">{{null}}</div>
            <div v-else>{{ scope.row.zfjgPianChaBiLi }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" align="center">
        <template slot-scope="scope">
          <div v-if="scope.$index == colIndex-1">{{null}}</div>
          <div v-else>{{ scope.row.remarks }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as cwjcApi from "@/api/cwjcApi.js";
import querystring from "querystring";
import "../../assets/js/dateDeal.js";

export default {
  name: "ydsjfsfy",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      choiceDate: "",
      colIndex: "",
      kindData: []
    };
  },
  methods: {
    // 确认保存
    sureSaveClick() {
      // this.$set(this.kindData, "choiceDate", this.choiceDate);
      this.kindData.forEach((item, i) => {
        item.choiceDate = this.choiceDate;
      });
      let _data = this.kindData;
      cwjcApi
        .addMonthExpenses(_data)
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.dateChange();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重新计算
    recountClick() {
      let _data = {
        choiceDate: this.choiceDate,
        flag: true
      };
      cwjcApi
        .LoadMonthExpenses(_data)
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.kindData = res.data;
          this.colIndex = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择日期
    dateChange() {
      let _data = {
        choiceDate: this.choiceDate,
        flag: false
      };
      cwjcApi
        .LoadMonthExpenses(_data)
        .then(res => {
          if (!res.data) {
            this.$message({ message: "未配置基础项目", duration: 2000 });
          } else {
            this.kindData = res.data;
            this.colIndex = res.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.tableHeight = this.screenHeight - 300;
    };
  }
};
</script>

<style scoped>
.fy {
  text-align: center;
  margin-top: 20px;
}
.buttonCS {
  margin-left: 15px;
}
</style>
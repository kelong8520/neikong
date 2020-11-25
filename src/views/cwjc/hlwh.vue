<template>
  <div>
    <div class="table1">
      <el-button class="addbutton" type="primary" plain @click="addData" size="medium">新增汇率</el-button>
      <el-table
        highlight-current-row
        style="width: 100%;"
        :height="tableHeight"
        ref="table"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="tablelist"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="moneyType" label="原币种" align="center"></el-table-column>
        <el-table-column property="aimMoneyType" label="目标币种" align="center"></el-table-column>
        <el-table-column property="exchangerate" label="汇率" align="center"></el-table-column>
        <el-table-column property="addTime" label="添加时间" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="editorClick(scope.row)"
              type="primary"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
          </template>
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
    <!--  新增、编辑弹窗  -->
    <el-dialog
      :title="titleType"
      :visible.sync="infoVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="30%"
      v-dialogDrag
    >
      <!--  汇率详情  -->
      <!-- <div class="content_wrap" style="height:300px;"> -->
      <div class="content">
        <el-form :model="ruleForm2" label-width="150px" class="demo-ruleForm2 form2">
          <el-form-item label="原币种">
            <el-input v-model="ruleForm2.moneyType"></el-input>
          </el-form-item>
          <el-form-item label="目标币种">
            <el-input v-model="ruleForm2.aimMoneyType"></el-input>
          </el-form-item>
          <el-form-item label="汇率">
            <el-input v-model="ruleForm2.exchangerate"></el-input>
          </el-form-item>
          <div class="queren">
            <el-button @click.native="concel">取消</el-button>
            <el-button type="primary" @click.native="sureSaveClick" class="sure">确定</el-button>
          </div>
        </el-form>
      </div>
      <!-- </div> -->
    </el-dialog>
  </div>
</template>

<script>
import * as cwjcApi from "@/api/cwjcApi.js";
import querystring from "querystring";
import "../../assets/js/dateDeal.js";

export default {
  name: "hlwh",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      titleType: "",
      tablelist: [],
      ruleForm2: {},
      infoVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    };
  },
  methods: {
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.LoadTableInfo();
    },
    concel() {
      this.infoVisible = false;
    },
    sureSaveClick() {
      if (this.ruleForm2.moneyType) {
        if (this.ruleForm2.aimMoneyType) {
          if (this.ruleForm2.exchangerate) {
            let _data = this.ruleForm2;
            cwjcApi
              .addExchangerate(_data)
              .then(res => {
                this.$message({ message: res.tipInfo, duration: 2000 });
                this.infoVisible = false;
                this.loadTableInfo();
                this.currentPage = 1;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$message({ message: "请填写汇率", duration: 2000 });
          }
        } else {
          this.$message({ message: "请填写目标币种", duration: 2000 });
        }
      } else {
        this.$message({ message: "请填写原币种", duration: 2000 });
      }
    },
    addData() {
      this.ruleForm2 = {};
      this.titleType = "新增汇率";
      this.infoVisible = true;
    },
    editorClick(row) {
      this.titleType = "编辑汇率";
      this.infoVisible = true;
      this.formInfo(row.id);
    },
    formInfo(id) {
      let _data = {
        id: id
      };
      cwjcApi
        .getOneExchangerate(_data)
        .then(res => {
          this.ruleForm2 = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadTableInfo() {
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      };
      cwjcApi
        .getAllExchangerate(_data)
        .then(res => {
          this.tablelist = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadTableInfo();
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
.form2 {
  text-align: center;
}
.form2 .el-form-item {
  width: 80%;
}
.table1 .addbutton {
  margin-bottom: 20px;
}
.queren {
  margin-top: 50px;
}
.queren .el-button {
  width: 100px;
}
.queren .sure {
  margin: 0 0 0 60px;
}
</style>
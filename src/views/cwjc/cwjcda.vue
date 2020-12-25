<template>
  <div>
    <el-button class="addButton" type="primary" plain @click="addInfo" size="medium">新增项目</el-button>
    <el-button class="auditButton" type="primary" plain @click="auditInfo" size="medium">项目审核</el-button>
    <!-- <el-button class="historyButton" type="primary" plain @click="historyInfo" size="medium">历史</el-button> -->
    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%"
      highlight-current-row
      :height="tableHeight"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.isStop == 0?"启用":"停用"}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="基础项目" align="center"></el-table-column>
      <el-table-column label="实际价格" align="center">
        <el-table-column prop="realPrice" label="价格" align="center"></el-table-column>
        <el-table-column prop="sjjsfs" label="货币结算方式" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="核算价格" align="center">
        <el-table-column prop="heSuanPrice" label="价格" align="center"></el-table-column>
        <el-table-column prop="hsjsfs" label="货币结算方式" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="jsfs" label="计算方式" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
      <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新日期" align="center" width="180"></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="condition(scope.row)"
            style="margin:2px;"
          >{{scope.row.isStop == 0?"停用":"启用"}}</el-button>
          <el-button
            @click.native="editorClick(scope.row)"
            type="primary"
            size="mini"
          >重新编辑</el-button>
          <el-button type="primary" size="mini" @click="historyInfo(scope.row)">历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页  -->
    <el-pagination
      class="fy"
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    ></el-pagination>
    <!--  项目新增  -->
    <el-dialog
      :title="titleType"
      :visible.sync="infoVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="30%"
      v-dialogDrag
    >
      <div class="content">
        <el-form
          ref="ruleForm2"
          :model="ruleForm2"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm2 form2"
        >
          <el-form-item label="基础项目" prop="name">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="实际货币结算方式" prop="sjjsfs">
            <!-- <el-input v-model="ruleForm2.sjjsfs"></el-input> -->
            <el-select v-model="ruleForm2.sjjsfs">
              <el-option
                v-for="(item,index) in moneyStyleList"
                :label="item.name"
                :value="item.name"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实际价格" prop="realPrice">
            <el-input v-model="ruleForm2.realPrice"></el-input>
          </el-form-item>
          <el-form-item label="核算货币结算方式" prop="hsjsfs">
            <!-- <el-input v-model="ruleForm2.hsjsfs"></el-input> -->
            <el-select v-model="ruleForm2.hsjsfs">
              <el-option
                v-for="(item,index) in moneyStyleList"
                :label="item.name"
                :value="item.name"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="核算价格" prop="heSuanPrice">
            <el-input v-model="ruleForm2.heSuanPrice"></el-input>
          </el-form-item>
          <el-form-item label="计算方式" prop="jsfs">
            <el-select v-model="ruleForm2.jsfs">
              <el-option
                v-for="(item,index) in calculationList"
                :label="item.name"
                :value="item.name"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="ruleForm2.remarks" resize="none"></el-input>
          </el-form-item>
          <div class="queren">
            <el-button @click.native="concel">取消</el-button>
            <el-button type="primary" @click.native="sureSaveClick('ruleForm2')" class="sure">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 项目审批 -->
    <el-dialog
      title="项目审批"
      :visible.sync="projectTableVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      v-dialogDrag
    >
      <el-table
        :data="auditData"
        style="width: 100%"
        highlight-current-row
        max-height="400"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="基础项目" align="center"></el-table-column>
        <el-table-column label="实际价格" align="center">
          <el-table-column prop="realPrice" label="价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="货币结算方式" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="核算价格" align="center">
          <el-table-column prop="heSuanPrice" label="价格" align="center"></el-table-column>
          <el-table-column prop="hsjsfs" label="货币结算方式" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="jsfs" label="计算方式" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" align="center" width="180"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="passClick(scope.row)"
              type="primary"
              size="mini"
              style="margin:2px;"
            >通过</el-button>
            <el-button @click.native="nopassClcik(scope.row)" type="primary" size="mini">未通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </el-dialog>
    <!-- 历史 -->
    <el-dialog
      title="历史"
      :visible.sync="historyTableVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      v-dialogDrag
    >
      <el-table
        :data="historyData"
        style="width: 100%"
        highlight-current-row
        max-height="400"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="基础项目" align="center"></el-table-column>
        <el-table-column label="实际价格" align="center">
          <el-table-column prop="realPrice" label="价格" align="center"></el-table-column>
          <el-table-column prop="sjjsfs" label="货币结算方式" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="核算价格" align="center">
          <el-table-column prop="heSuanPrice" label="价格" align="center"></el-table-column>
          <el-table-column prop="hsjsfs" label="货币结算方式" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="jsfs" label="计算方式" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" align="center"></el-table-column>
      </el-table>
      <el-pagination
        class="fy"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import * as cwjcApi from "@/api/cwjcApi.js";
import querystring from "querystring";
import "../../assets/js/dateDeal.js";

export default {
  name: "cwjcda",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      titleType: "",
      value: null,
      rules: {
        name: [{ required: true, message: "请输入基础项目", trigger: "blur" }],
        sjjsfs: [
          { required: true, message: "请输入实际货币结算方式", trigger: "blur" }
        ],
        realPrice: [
          { required: true, message: "请输入实际价格", trigger: "blur" }
        ],
        hsjsfs: [
          { required: true, message: "请选择核算货币结算方式", trigger: "blur" }
        ],
        heSuanPrice: [
          { required: true, message: "请输入核算价格", trigger: "blur" }
        ],
        jsfs: [{ required: true, message: "请选择计算方式", trigger: "blur" }]
      },
      ruleForm2: {},
      tableData: [],
      auditData: [],
      historyData: [],
      moneyStyleList: [
        {
          name: "RMB"
        },
        {
          name: "美元"
        },
        {
          name: "越南盾"
        }
      ],
      calculationList: [
        {
          name: "单价"
        },
        {
          name: "百码产生费用"
        }
      ],
      historyTableVisible: false,
      infoVisible: false,
      projectTableVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    };
  },
  methods: {
    condition(row) {
      if(row.isStop == 0){
        this.value = 1;
      }else{
        this.value = 0;
      }
      let _data = {
        id: row.id,
        isStop: this.value,
      };
      cwjcApi
        .upDateStopBaseDangAn(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.LoadTableInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.LoadTableInfo();
    },
    // 历史
    historyInfo(row) {
      this.currentPage = 1;
      this.historyTableVisible = true;
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        state: 2,
        Name: row.name
      };
      cwjcApi
        .getAllBaseDangAn(_data)
        .then(res => {
          this.historyData = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 通过
    passClick(row) {
      let _data = {
        id: row.id,
        state: "1"
      };
      cwjcApi
        .updateState(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.LoadTableInfo();
          this.auditInfo();
          this.currentPage = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 未通过
    nopassClcik(row) {
      let _data = {
        id: row.id,
        state: "3"
      };
      cwjcApi
        .updateState(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.LoadTableInfo();
          this.auditInfo();
          this.currentPage = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 审核
    auditInfo() {
      this.currentPage = 1;
      this.projectTableVisible = true;
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        state: 0
      };
      cwjcApi
        .getAllBaseDangAn(_data)
        .then(res => {
          this.auditData = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sureSaveClick(formName) {
      this.$set(this.ruleForm2, "isStop", 0);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _data = this.ruleForm2;
          cwjcApi
            .addBaseDangAn(_data)
            .then(res => {
              this.$message({ message: res.tipInfo, duration: 2000 });
              this.infoVisible = false;
              this.LoadTableInfo();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addInfo() {
      this.ruleForm2 = {};
      this.titleType = "新增项目";
      this.infoVisible = true;
      this.$set(this.ruleForm2, "operator", "张三");
      this.$set(this.ruleForm2, "operatorId", "9");
      this.$set(this.ruleForm2, "isDelete", "0");
      this.$set(this.ruleForm2, "state", "0");
    },
    editorClick(row) {
      this.titleType = "编辑";
      this.infoVisible = true;
      let _data = {
        id: row.id
      };
      cwjcApi
        .getOneBaseDangAn(_data)
        .then(res => {
          this.ruleForm2 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    concel() {
      this.infoVisible = false;
    },
    LoadTableInfo() {
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        state: 1
      };
      cwjcApi
        .getAllBaseDangAn(_data)
        .then(res => {
          this.tableData = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.LoadTableInfo();
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
.addButton {
  margin-bottom: 20px;
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
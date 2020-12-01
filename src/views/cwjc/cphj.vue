<template>
  <div>
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="布编">
          <el-input v-model="bbh" placeholder="请输入布编"></el-input>
        </el-form-item>
        <!-- <el-form-item label="版本">
          <el-select
            v-model="version"
            placeholder="请选择"
            style="width:200px;"
            @change="selectBanben"
          >
            <el-option
              v-for="item in optionsList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click.native="searchList" size="medium">检索</el-button>
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
      :data="clothTableData"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <!-- <el-table-column label="版本" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.version == 0 ?"最新": scope.row.version == 1?"历史":""}}</div>
        </template>
      </el-table-column>-->
      <el-table-column label="审批状态" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.state == 0 ?"待审批": scope.row.state == 1?"已审批":""}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="变动" align="center">
        <el-table-column property="heJiaChangeCha" label="偏差(元)" align="center"></el-table-column>
        <el-table-column property="heJiaChangeBiLi" label="偏差(%)" align="center"></el-table-column>
      </el-table-column>-->
      <el-table-column property="heJiaToTal" label="成品（百码）核价" align="center" width="110"></el-table-column>
      <el-table-column property="textileNo" label="布编" align="center"></el-table-column>
      <el-table-column property="textileColor" label="色号" align="center" width="220"></el-table-column>
      <el-table-column property="zhiChengLv" label="织成率" align="center"></el-table-column>
      <el-table-column property="houZhengzhiChengLv" label="后整制成率" align="center"></el-table-column>
      <el-table-column property="zhengLiXiangMu" label="后整理项目" align="center" width="260"></el-table-column>
      <el-table-column property="jingShaGuiGe" label="经纱" align="center" width="180"></el-table-column>
      <el-table-column property="shazhi" label="纱支" align="center"></el-table-column>
      <el-table-column property="touFen" label="头份" align="center"></el-table-column>
      <el-table-column property="weiShaGuiGe" label="纬纱" align="center" width="160"></el-table-column>
      <el-table-column label="操作" width="320" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native="seeClick(scope.row)"
            type="primary"
            size="mini"
            :disabled="scope.row.version == null"
            style="margin:2px;"
          >查看</el-button>
          <!-- <el-button
            @click.native="editorClick(scope.row)"
            type="primary"
            size="mini"
            :disabled="scope.row.version == 1 || scope.row.version == null"
          >编辑</el-button>-->
          <el-button type="primary" size="mini" @click.native="approvalClick(scope.row)">审批提交</el-button>
          <el-button
            @click.native="setNewClick(scope.row)"
            type="primary"
            size="mini"
            :disabled="scope.row.version == 1"
          >核价</el-button>
          <el-button type="primary" size="mini" @click.native="historyClick(scope.row)">历史</el-button>
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

    <!-- 核价明细 编辑、核价 -->
    <el-dialog
      title="核价明细"
      :visible.sync="detailVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      v-dialogDrag
    >
      <el-table
        :data="detailData"
        style="width: 100%"
        highlight-current-row
        max-height="400"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :span-method="arraySpanMethod"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="成本要素" align="center">
          <el-table-column prop="totalName" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.totalName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partName" align="center">
            <template slot-scope="scope">
              <div v-if="scope.$index < colIndex+1">{{scope.row.partName}}</div>
              <div v-else-if="scope.$index > colIndex + 1">{{scope.row.partName}}</div>
              <div v-else>
                <el-input v-model="scope.row.partName"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="chemicalTypeValue" align="center">
            <template slot-scope="scope">
              <div v-if="scope.$index < colIndex + 1">{{scope.row.chemicalTypeValue}}</div>
              <div v-else>
                <el-input v-model="scope.row.chemicalTypeValue"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="unit" label="单位" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < colIndex+1">{{scope.row.unit}}</div>
            <div v-else>
              <el-input v-model="scope.row.unit"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="baiMiYongLiang" label="百米/百码用量" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < colIndex">{{scope.row.baiMiYongLiang}}</div>
            <div v-else>
              <el-input v-model="scope.row.baiMiYongLiang"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zheHeChengPin" label="折合成品/100y" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < colIndex">{{scope.row.zheHeChengPin}}</div>
            <div v-else>
              <el-input-number
                v-model="scope.row.zheHeChengPin"
                :controls="false"
                :precision="2"
                @change="calculatorTotal(scope.row)"
                :min="0"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="danJia" label="单价" align="center" width="110">
          <template slot-scope="scope">
            <!-- <div v-if="scope.$index < colIndex">{{scope.row.danJia}}</div> -->
            <!-- <div v-else> -->
            <div>
              <el-input-number
                v-model="scope.row.danJia"
                :controls="false"
                :precision="2"
                @change="calculatorTotal(scope.row)"
                :min="0"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="heJi" label="合计" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index < sumIndex">{{ scope.row.heJi }}</div>
            <div v-else>
              <el-input v-model="scope.row.heJi"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="queren">
        <el-input
          v-model="changeRemarks"
          type="textarea"
          :rows="2"
          resize="none"
          placeholder="请填写变动原因"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          @click.native="confirmSaveClick"
          style="margin:10px 0 0;"
        >确定存入</el-button>
      </div>
    </el-dialog>

    <!-- 核价明细 查看 -->
    <el-dialog
      title="核价明细"
      :visible.sync="seedetailVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      v-dialogDrag
    >
      <el-table
        :data="seedetailData"
        style="width: 100%"
        highlight-current-row
        max-height="470"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :span-method="arraySpanMethod1"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="成本要素" align="center">
          <el-table-column prop="totalName" align="center"></el-table-column>
          <el-table-column prop="partName" align="center"></el-table-column>
          <el-table-column prop="chemicalTypeValue" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="unit" label="单位" align="center"></el-table-column>
        <el-table-column prop="baiMiYongLiang" label="百米/百码用量" align="center"></el-table-column>
        <el-table-column prop="zheHeChengPin" label="折合成品/100y" align="center"></el-table-column>
        <el-table-column prop="danJia" label="单价" align="center"></el-table-column>
        <el-table-column prop="heJi" label="合计" align="center"></el-table-column>
      </el-table>
      <div class="queren">
        <el-input
          type="textarea"
          :rows="2"
          v-model="changeRemarks"
          placeholder="变动原因"
          :disabled="true"
        ></el-input>
      </div>
    </el-dialog>
    <!-- 历史 -->
    <el-dialog
      title="历史"
      :visible.sync="historyVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      v-dialogDrag
    >
      <el-table
        :data="historyData"
        style="width: 100%"
        highlight-current-row
        max-height="500"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="heJiaToTal" label="成品（百码）核价" align="center"></el-table-column>
        <el-table-column property="zhiChengLv" label="织成率" align="center"></el-table-column>
        <el-table-column property="houZhengzhiChengLv" label="后整制成率" align="center"></el-table-column>
        <el-table-column label="变动" align="center">
          <el-table-column property="heJiaChangeCha" label="偏差(元)" align="center"></el-table-column>
          <el-table-column property="heJiaChangeBiLi" label="偏差(%)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column property="changeRemarks" label="变动原因" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import * as cwjcApi from "@/api/cwjcApi.js";
import querystring from "querystring";
import "../../assets/js/dateDeal.js";

export default {
  name: "cphj",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      bbh: "",
      version: 2,
      changeRemarks: "",
      // heJiaId:"",
      colIndex: 0,
      sumIndex: 0,
      clothTableData: [],
      detailData: [],
      seedetailData: [],
      historyData: [],
      optionsList: [
        {
          name: "最新",
          value: 0
        },
        {
          name: "历史",
          value: 1
        },
        {
          name: "所有",
          value: 2
        }
      ],
      detailVisible: false,
      seedetailVisible: false,
      historyVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    };
  },
  methods: {
    // 历史
    historyClick(row) {
      let _data = {
        weaveId: row.id
      };
      cwjcApi
        .JianSuoHeJia(querystring.stringify(_data))
        .then(res => {
          this.historyData = res.data;
          this.historyVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 审批提交
    approvalClick(row) {
      if (row.version == 0) {
        if (row.state == 0) {
          this.$confirm("确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let _data = {
                heJiaId: row.heJiaId
              };
              cwjcApi
                .submitHeJia(querystring.stringify(_data))
                .then(res => {
                  this.$message({ message: res.tipInfo, duration: 2000 });
                  this.loadMainInfo();
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {});
        } else if (row.state == 1) {
          this.$message({
            message: "已提交审批",
            duration: 2000
          });
        } else {
          this.$message({
            message: "不符合条件，无法提交审批",
            duration: 2000
          });
        }
      } else {
        this.$message({ message: "不符合条件，无法提交审批", duration: 2000 });
      }
    },
    // 选择版本
    selectBanben(val) {
      this.currentPage = 1;
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        bbh: this.bbh,
        version: this.version
      };
      cwjcApi
        .newERP(_data)
        .then(res => {
          this.clothTableData = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确定存入
    confirmSaveClick() {
      this.detailData.forEach((item, index) => {
        this.$set(item, "changeRemarks", this.changeRemarks);
      });
      let _data = this.detailData;
      cwjcApi
        .addChanPinHeJia(_data)
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.currentPage = 1;
          this.loadMainInfo();
          this.detailVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculatorTotal(row) {
      row.heJi = (row.zheHeChengPin * row.danJia).toFixed(2);
      let sum = "";
      this.detailData.forEach((item, index) => {
        // console.log(item.heJi,index)
        this.sum += item.heJi;
      });
      console.log(this.sum);
    },
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.loadMainInfo();
    },
    arraySpanHandle({ row, column, rowIndex, columnIndex }, data) {
      if (rowIndex == this.sumIndex - 1) {
        if (columnIndex == 1) {
          return [1, 8];
        } else if (columnIndex == 8) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
      if (rowIndex == this.colIndex) {
        if (columnIndex == 2) {
          return [1, 2];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else {
          return [1, 1];
        }
      }
      if (rowIndex == this.colIndex + 1) {
        if (columnIndex == 2) {
          return [1, 2];
        } else if (columnIndex == 3) {
          return [0, 0];
        } else {
          return [1, 1];
        }
      }
      if (columnIndex === 1) {
        const _row = this.flitterData(data, "totalName")[
          rowIndex
        ];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 2) {
        const _row = this.flitterData(data, "partName")[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    arraySpanMethod1({ row, column, rowIndex, columnIndex }) {
      return this.arraySpanHandle(
        { row, column, rowIndex, columnIndex },
        this.seedetailData
      );
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return this.arraySpanHandle(
        { row, column, rowIndex, columnIndex },
        this.detailData
      );
    },
    flitterData(arr, key1) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //name 修改
          if (item[key1] === arr[index - 1][key1]) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return spanOneArr;
    },
    searchList() {
      this.currentPage = 1;
      this.loadMainInfo();
    },
    seeClick(row) {
      let _data = {
        heJiaId: row.heJiaId
      };
      cwjcApi
        .CheckHeJiaMingXi(_data)
        .then(res => {
          if (!res.data) {
            this.$message({ message: res.msg, duration: 2000 });
          } else {
            this.seedetailVisible = true;
            this.seedetailData = res.data;
            this.changeRemarks = res.data[0].changeRemarks;
            this.colIndex = res.count;
            this.sumIndex = this.seedetailData.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editorClick(row) {
      let _data = {
        heJiaId: row.heJiaId
      };
      cwjcApi
        .CheckHeJiaMingXi(_data)
        .then(res => {
          if (!res.data) {
            this.$message({ message: res.msg, duration: 2000 });
          } else {
            this.detailVisible = true;
            this.detailData = res.data;
            console.log(this.detailData);
            this.colIndex = res.count;
            this.sumIndex = this.detailData.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setNewClick(row) {
      // this.heJiaId = row.heJiaId;
      let _data = {
        id: row.id,
        textileNo: row.textileNo,
        textileColor: row.textileColor,
        heJiaId: row.heJiaId
      };
      cwjcApi
        .LoadingHeJiaMingXi(_data)
        .then(res => {
          if (!res.data) {
            this.$message({ message: res.msg, duration: 2000 });
          } else {
            this.detailVisible = true;
            this.detailData = res.data;
            this.colIndex = res.count;
            this.sumIndex = this.detailData.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMainInfo() {
      let _data = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        bbh: this.bbh,
        version: this.version
      };
      cwjcApi
        .newERP(_data)
        .then(res => {
          this.clothTableData = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadMainInfo();
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
.queren {
  margin-top: 20px;
  text-align: right;
  /* display: flex; */
}
.queren .el-button {
  width: 100px;
}
</style>
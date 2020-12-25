<template>
  <div>
    <div>
      <span style="margin:0 15px 10px 0;">时间</span>
      <el-date-picker
        v-model="selecttime"
        type="monthrange"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="yyyy-MM"
        :picker-options="pickerOptions"
        @change="timeChange"
      ></el-date-picker>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%;marginTop:30px;"
      max-height="600"
      ref="table"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="baseTableData"
    >
      <el-table-column prop="date" label="时间" align="center" width="120"></el-table-column>
      <el-table-column label="基础信息" align="center">
        <el-table-column label="产出关系" align="center">
          <el-table-column prop="chengPinLength" label="成品入库(万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="ranSeLength" label="染色数量(万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="jiaoZhouLength" label="交轴数量(万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="jiaoPiLength" label="织布交坯量(万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="原料投入关系" align="center">
          <el-table-column prop="yLTouRuTotal" label="原料投入总量(kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="jingShaTouRu" label="经纱投入(kg)" align="center" width="120"></el-table-column>
          <el-table-column prop="weiShaTouRu" label="纬纱投入(kg)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="人工关系" align="center">
          <el-table-column prop="workDays" label="法定工作天数(天)" align="center" width="120"></el-table-column>
          <el-table-column prop="totalPeoples" label="在籍总人数(人)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="人工分析" align="center">
        <el-table-column prop="DoublewanMaYongGong" label="万码用工(人)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="原料投入分析" align="center">
        <el-table-column prop="touRuChanChuXiShu" label="投入产出系数(y/kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="jingShaChanChuXiShu" label="经纱(交轴/经纱)(m/kg)" align="center" width="120"></el-table-column>
        <el-table-column prop="weiShaChanChuXiShu" label="纬纱(交坯/纬纱)(m/kg)" align="center" width="120"></el-table-column>
      </el-table-column>
      <el-table-column  label="过程损耗分析" align="center">
        <el-table-column prop="guoChengSunHaoTotal" label="发生总量(kg/万码)" align="center" width="120"></el-table-column>
        <el-table-column label="浆染过程损耗分析" align="center">
          <el-table-column prop="jiangRanFeiShaSunHao" label="浆染废纱损耗(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="织造过程损耗分析" align="center">
          <el-table-column prop="zhiBuFeiShaSunHao" label="织布废纱损耗(%)" align="center" width="120"></el-table-column>
          <el-table-column prop="zhiBuFeiBuSunHao" label="织布废布损耗(%)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="后整过程损耗分析" align="center">
          <el-table-column prop="houZhengFeiBuSunHao" label="后整废布损耗(kg/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="jianYanFeiBuSunHao" label="检验废布损耗(kg/万码)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="辅料单耗投入分析" align="center">
        <el-table-column label="染色辅料分析" align="center">
          <el-table-column prop="ranSeTotal" label="染色材料(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="dianlan" label="靛蓝染料(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="baoxianfen" label="保险粉(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="shaojian" label="烧碱(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="otherRanSe" label="其他染色辅料(kg/万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="上浆辅料分析" align="center">
          <el-table-column prop="shangJiangTotal" label="上浆材料(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="bianxingdianfen" label="变性淀粉(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="ssjl" label="SS浆料(kg/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="otherShangJiang" label="其他上浆材料(kg/万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="织造辅料分析" align="center">
          <el-table-column prop="zhiZaoFuLiaoCaiLiao" label="织机辅助材料投入量/总交坯量(kg/万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="后整辅料分析" align="center">
          <el-table-column prop="houZhengTotal" label="后整理材料(kg/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="shaoJianHZ" label="烧碱投入(kg/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="tuiJiangMei" label="退浆酶投入(kg/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="otherHouZheng" label="其他后整(kg/万码)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="能耗及污水处理单耗分析" align="center">
        <el-table-column label="能耗合计分析" align="center">
          <el-table-column prop="wanMaYongWaterTotal" label="全厂万码用水(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMaYongDianTotal" label="全厂万码用电(kw.h/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMaYongGasTotal" label="万码用天然气(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wanMaYongSteamTotal" label="全厂用蒸汽(ton/万码)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="浆染能耗分析" align="center">
          <el-table-column prop="jiangRanNHWater" label="浆染用水单耗(ton/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="jiangRanNHDian" label="浆染用电单耗kw.h/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="jiangRanNHSteam" label="浆染用汽单耗(ton/万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="织造能耗分析" align="center">
          <el-table-column prop="zhiZaoNHDian" label="织布用电单耗(kw.h/万米)" align="center" width="120"></el-table-column>
          <el-table-column prop="zhiZaoNHWater" label="织布用水单耗(ton/万米)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="后整能耗分析" align="center">
          <el-table-column prop="houZhengNHWater" label="后整用水单耗(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="houZhengNHDian" label="后整用电单耗(kw.h/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="houZhengNHSteam" label="后整用汽单耗(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="houZhengNHGas" label="后整天然气单耗(ton/万码)" align="center" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="污水处理单耗分析" align="center">
          <el-table-column prop="wuShuiChuLiWater" label="污水处理万码用水(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wuShuiChuLiDian" label="污水处理万码用电(kw.h/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wuShuiChuLiYaoJi" label="污水处理万码药剂(ton/万码)" align="center" width="120"></el-table-column>
          <el-table-column prop="wuShuiChuLiPaiFangLiang" label="污水处理万码排放量(ton/万码)" align="center" width="120"></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="机物料投入分析" align="center">
        <el-table-column prop="jiangRanJiWuLiao" label="浆染机物料分析(元/万米)" align="center" width="120"></el-table-column>
        <el-table-column prop="zhiZaoJiWuLiao" label="织造机物料分析(元/万米)" align="center" width="120"></el-table-column>
        <el-table-column prop="houZhengJiWuLiao" label="后整机物料分析(元/万码)" align="center" width="120"></el-table-column>
        <el-table-column prop="gongWuDianQiJiWuLiao" label="公务电气机物料分析(元/万码)" align="center" width="120"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as ydscdApi from "@/api/ydscdApi.js";
import querystring from "querystring";

export default {
  name: "ydscd",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      baseTableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      selecttime: "",
      startTime: "",
      endTime: "",
      loading: false
    };
  },
  methods: {
    timeChange(value) {
      this.startTime = value[0];
      this.endTime = value[1];
      console.log(this.startTime,this.endTime)
    },
    searchList() {
      this.currentPage = 1;
      this.loadInfo();
    },
    loadInfo() {
      this.loading = true;
      let _data = {
        startTime: this.startTime,
        endTime: this.endTime
      };
      ydscdApi
        .HuanBiFenXi(querystring.stringify(_data))
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
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../assets/css/common.css";
</style>
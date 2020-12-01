import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () => import("@/App.vue"),
    // redirect: { name: "home" },
    redirect: { name: "index" }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home"),
    redirect: { name: "index" },
    children: [
      // 首页 titlepage
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/home/index"),
        children: [
          // 1.1 财务基础信息
          // 1.1.1财务基础档案
          {
            path: '/cwjcda',
            name: 'cwjcda',
            component: () => import("@/views/cwjc/cwjcda"),
          },
          // 1.1.2产品核价
          {
            path: '/cphj',
            name: 'cphj',
            component: () => import("@/views/cwjc/cphj"),
          },
          // 1.1.3月度实际发生费用
          {
            path: '/ydsjfsfy',
            name: 'ydsjfsfy',
            component: () => import("@/views/cwjc/ydsjfsfy"),
          },
          // 1.1.4汇率维护
          {
            path: '/hlwh',
            name: 'hlwh',
            component: () => import("@/views/cwjc/hlwh"),
          },

          // 1.2 分工序投入产出明细
          // 1.2.1原料投入数据
          {
            path: '/yltr',
            name: 'yltr',
            component: () => import("@/views/fgxtr/yltr"),
          },
          // 1.2.2辅料投入数据
          {
            path: '/fltr',
            name: 'fltr',
            component: () => import("@/views/fgxtr/fltr"),
          },
          // 1.2.3能耗投入数据
          {
            path: '/nhtr',
            name: 'nhtr',
            component: () => import("@/views/fgxtr/nhtr"),
          },

          // 1.3 在途半制品盘存
          // 1.3.1浆染半制品盘点明细
          {
            path: '/jrbzp',
            name: 'jrbzp',
            component: () => import("@/views/bzp/jrbzp"),
          },
          // 1.3.2织造织轴盘点明细
          {
            path: '/zzzzpd',
            name: 'zzzzpd',
            component: () => import("@/views/bzp/zzzzpd"),
          },
          // 1.3.3织造纬纱盘点明细
          {
            path: '/zzwspd',
            name: 'zzwspd',
            component: () => import("@/views/bzp/zzwspd"),
          },
          // 1.3.4织造坯布盘点明细
          {
            path: '/zzpbpd',
            name: 'zzpbpd',
            component: () => import("@/views/bzp/zzpbpd"),
          },
          // 1.3.5后整半制品明细
          {
            path: '/hzbzp',
            name: 'hzbzp',
            component: () => import("@/views/bzp/hzbzp"),
          },

          // 1.4 成品投入产出汇总及分析
          // 1.4.1原料分析
          {
            path: '/ylfx',
            name: 'ylfx',
            component: () => import("@/views/cpfx/ylfx"),
          },
          // 1.4.2辅料分析
          {
            path: '/flfx',
            name: 'flfx',
            component: () => import("@/views/cpfx/flfx"),
          },
          // 1.4.3能耗分析
          {
            path: '/nhfx',
            name: 'nhfx',
            component: () => import("@/views/cpfx/nhfx"),
          },

          // 1.5 实际生产成本核算
          // 1.5.1月度机物料费用
          {
            path: '/jwlfy',
            name: 'jwlfy',
            component: () => import("@/views/sccb/jwlfy"),
          },
          // 1.5.2月度人工费用
          {
            path: '/rgfy',
            name: 'rgfy',
            component: () => import("@/views/sccb/rgfy"),
          },
          // 1.5.3成本核算
          {
            path: '/cbhs',
            name: 'cbhs',
            component: () => import("@/views/sccb/cbhs"),
          },
          // 子界面1
          {
            path: '/interface1',
            name: 'interface1',
            component: () => import("@/views/sccb/interface/interface1"),
          },
          // 子界面2
          {
            path: '/interface2',
            name: 'interface2',
            component: () => import("@/views/sccb/interface/interface2"),
          },
          // 子界面3
          {
            path: '/interface3',
            name: 'interface3',
            component: () => import("@/views/sccb/interface/interface3"),
          },
          // 子界面4
          {
            path: '/interface4',
            name: 'interface4',
            component: () => import("@/views/sccb/interface/interface4"),
          },
          // 子界面5
          {
            path: '/interface5',
            name: 'interface5',
            component: () => import("@/views/sccb/interface/interface5"),
          },
          // 子界面6
          {
            path: '/interface6',
            name: 'interface6',
            component: () => import("@/views/sccb/interface/interface6"),
          },
          // 子界面7
          {
            path: '/interface7',
            name: 'interface7',
            component: () => import("@/views/sccb/interface/interface7"),
          },
          // 子界面8
          {
            path: '/interface8',
            name: 'interface8',
            component: () => import("@/views/sccb/interface/interface8"),
          },

          // 1.6 月度生产单耗环比分析
          // 1.6.1月度生产单耗环比分析
          {
            path: '/ydscd',
            name: 'ydscd',
            component: () => import("@/views/ydscd/ydscd"),
          },
        ]
      },

    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
  },
  {
    path: '*',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// export const constantRoutes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import("@/views/login/localLogin"),
    
  // },
  // {
  //   path: '/首页',
  //   name: 'index',
  //   component: () => import('@/views/home/index'),
  //   meta: { title: '首页', icon: 'index' }
  // },
//   {
//     path: '/',
//     name: 'workbench',
//     component: () => import("@/App.vue"),
//     // redirect: { name: "home" },
//     redirect: { name: "index" }
//   },
//   {
//     path: "/home",
//     name: "home",
//     component: () => import("@/views/home/home"),
//     redirect: { name: "index" },
//     children: [{
//       path: '/首页',
//       name: 'index',
//       component: () => import('@/views/home/index'),
//       meta: { title: '首页', icon: 'index' }
//     }]
//   },
// ]
// export const asyncRoutes = [
//   // 首页 titlepage
//   {
//     path: "/首页",
//     name: "index",
//     component: () => import("@/views/home/index"),
//     children: [
//       // 1.1 财务基础信息
//       // 1.1.1财务基础档案
//       {
//         path: '/财务基础档案',
//         name: 'cwjcda',
//         component: () => import("@/views/cwjc/cwjcda"),
//         meta: { title: '财务基础档案', pk:'财务基础档案' }
//       },
//       // 1.1.2产品核价
//       {
//         path: '/产品核价',
//         name: 'cphj',
//         component: () => import("@/views/cwjc/cphj"),
//         meta: { title: '产品核价', pk:'产品核价' }
//       },
//       // 1.1.3月度实际发生费用
//       {
//         path: '/月度实际发生费用',
//         name: 'ydsjfsfy',
//         component: () => import("@/views/cwjc/ydsjfsfy"),
//         meta: { title: '月度实际发生费用', pk:'月度实际发生费用' }
//       },
//       // 1.1.4汇率维护
//       {
//         path: '/汇率维护',
//         name: 'hlwh',
//         component: () => import("@/views/cwjc/hlwh"),
//         meta: { title: '汇率维护', pk:'汇率维护' }
//       },

//       // 1.2 分工序投入产出明细
//       // 1.2.1原料投入数据
//       {
//         path: '/原料投入数据',
//         name: 'yltr',
//         component: () => import("@/views/fgxtr/yltr"),
//         meta: { title: '原料投入数据', pk:'原料投入数据' }
//       },
//       // 1.2.2辅料投入数据
//       {
//         path: '/辅料投入数据',
//         name: 'fltr',
//         component: () => import("@/views/fgxtr/fltr"),
//         meta: { title: '辅料投入数据', pk:'辅料投入数据' }
//       },
//       // 1.2.3能耗投入数据
//       {
//         path: '/能耗投入数据',
//         name: 'nhtr',
//         component: () => import("@/views/fgxtr/nhtr"),
//         meta: { title: '能耗投入数据', pk:'能耗投入数据' }
//       },

//       // 1.3 在途半制品盘存
//       // 1.3.1浆染半制品盘点明细
//       {
//         path: '/浆染半制品盘点明细',
//         name: 'jrbzp',
//         component: () => import("@/views/bzp/jrbzp"),
//         meta: { title: '浆染半制品盘点明细', pk:'浆染半制品盘点明细' }
//       },
//       // 1.3.2织造织轴盘点明细
//       {
//         path: '/织造织轴盘点明细',
//         name: 'zzzzpd',
//         component: () => import("@/views/bzp/zzzzpd"),
//         meta: { title: '织造织轴盘点明细', pk:'织造织轴盘点明细' }
//       },
//       // 1.3.3织造纬纱盘点明细
//       {
//         path: '/织造纬纱盘点明细',
//         name: 'zzwspd',
//         component: () => import("@/views/bzp/zzwspd"),
//         meta: { title: '织造纬纱盘点明细', pk:'织造纬纱盘点明细' }
//       },
//       // 1.3.4织造坯布盘点明细
//       {
//         path: '/织造坯布盘点明细',
//         name: 'zzpbpd',
//         component: () => import("@/views/bzp/zzpbpd"),
//         meta: { title: '织造坯布盘点明细', pk:'织造坯布盘点明细' }
//       },
//       // 1.3.5后整半制品明细
//       {
//         path: '/后整半制品明细',
//         name: 'hzbzp',
//         component: () => import("@/views/bzp/hzbzp"),
//         meta: { title: '后整半制品明细', pk:'后整半制品明细' }
//       },

//       // 1.4 成品投入产出汇总及分析
//       // 1.4.1原料分析
//       {
//         path: '/原料分析',
//         name: 'ylfx',
//         component: () => import("@/views/cpfx/ylfx"),
//         meta: { title: '原料分析', pk:'原料分析' }
//       },
//       // 1.4.2辅料分析
//       {
//         path: '/辅料分析',
//         name: 'flfx',
//         component: () => import("@/views/cpfx/flfx"),
//         meta: { title: '辅料分析', pk:'辅料分析' }
//       },
//       // 1.4.3能耗分析
//       {
//         path: '/能耗分析',
//         name: 'nhfx',
//         component: () => import("@/views/cpfx/nhfx"),
//         meta: { title: '能耗分析', pk:'能耗分析' }
//       },

//       // 1.5 实际生产成本核算
//       // 1.5.1月度机物料费用
//       {
//         path: '/月度机物料费用',
//         name: 'jwlfy',
//         component: () => import("@/views/sccb/jwlfy"),
//         meta: { title: '月度机物料费用', pk:'月度机物料费用' }
//       },
//       // 1.5.2月度人工费用
//       {
//         path: '/月度人工费用',
//         name: 'rgfy',
//         component: () => import("@/views/sccb/rgfy"),
//         meta: { title: '月度人工费用', pk:'月度人工费用' }
//       },
//       // 1.5.3成本核算
//       {
//         path: '/成本核算',
//         name: 'cbhs',
//         component: () => import("@/views/sccb/cbhs"),
//         meta: { title: '成本核算', pk:'成本核算' }
//         // meta: {
//         //   keepAlive: true,
//         //   scollTopPosition: 0
//         // }
//       },
//       // 子界面1
//       {
//         path: '/子界面1',
//         name: 'interface1',
//         component: () => import("@/views/sccb/interface/interface1"),
//         meta: { title: '子界面1', pk:'子界面1' }
//       },
//       // 子界面2
//       {
//         path: '/子界面2',
//         name: 'interface2',
//         component: () => import("@/views/sccb/interface/interface2"),
//         meta: { title: '子界面2', pk:'子界面2' }
//       },
//       // 子界面3
//       {
//         path: '/子界面3',
//         name: 'interface3',
//         component: () => import("@/views/sccb/interface/interface3"),
//         meta: { title: '子界面3', pk:'子界面3' }
//       },
//       // 子界面4
//       {
//         path: '/子界面4',
//         name: 'interface4',
//         component: () => import("@/views/sccb/interface/interface4"),
//         meta: { title: '子界面4', pk:'子界面4' }
//       },
//       // 子界面5
//       {
//         path: '/子界面5',
//         name: 'interface5',
//         component: () => import("@/views/sccb/interface/interface5"),
//         meta: { title: '子界面5', pk:'子界面5' }
//       },
//       // 子界面6
//       {
//         path: '/子界面6',
//         name: 'interface6',
//         component: () => import("@/views/sccb/interface/interface6"),
//         meta: { title: '子界面6', pk:'子界面6' }
//       },
//       // 子界面7
//       {
//         path: '/子界面7',
//         name: 'interface7',
//         component: () => import("@/views/sccb/interface/interface7"),
//         meta: { title: '子界面7', pk:'子界面7' }
//       },
//       // 子界面8
//       {
//         path: '/子界面8',
//         name: 'interface8',
//         component: () => import("@/views/sccb/interface/interface8"),
//         meta: { title: '子界面8', pk:'子界面8' }
//       },

//       // 1.6 月度生产单耗环比分析
//       // 1.6.1月度生产单耗环比分析
//       {
//         path: '/月度生产单耗环比分析',
//         name: 'ydscd',
//         component: () => import("@/views/ydscd/ydscd"),
//         meta: { title: '月度生产单耗环比分析', pk:'月度生产单耗环比分析' }
//       },
//     ]
//   },
// ]
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes,
//   mode: 'history'
// })

// const router = createRouter()
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
// export default router


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
        path: "/首页",
        name: "index",
        component: () => import("@/views/home/index"),
        children: [
          // 1.1 财务基础信息
          // 1.1.1财务基础档案
          {
            path: '/财务基础档案',
            name: 'cwjcda',
            component: () => import("@/views/cwjc/cwjcda"),
          },
          // 1.1.2产品核价
          {
            path: '/产品核价',
            name: 'cphj',
            component: () => import("@/views/cwjc/cphj"),
          },
          // 1.1.3月度实际发生费用
          {
            path: '/月度实际发生费用',
            name: 'ydsjfsfy',
            component: () => import("@/views/cwjc/ydsjfsfy"),
          },
          // 1.1.4汇率维护
          {
            path: '/汇率维护',
            name: 'hlwh',
            component: () => import("@/views/cwjc/hlwh"),
          },

          // 1.2 分工序投入产出明细
          // 1.2.1原料投入数据
          {
            path: '/原料投入数据',
            name: 'yltr',
            component: () => import("@/views/fgxtr/yltr"),
          },
          // 1.2.2辅料投入数据
          {
            path: '/辅料投入数据',
            name: 'fltr',
            component: () => import("@/views/fgxtr/fltr"),
          },
          // 1.2.3能耗投入数据
          {
            path: '/能耗投入数据',
            name: 'nhtr',
            component: () => import("@/views/fgxtr/nhtr"),
          },

          // 1.3 在途半制品盘存
          // 1.3.1浆染半制品盘点明细
          {
            path: '/浆染半制品盘点明细',
            name: 'jrbzp',
            component: () => import("@/views/bzp/jrbzp"),
          },
          // 1.3.2织造织轴盘点明细
          {
            path: '/织造织轴盘点明细',
            name: 'zzzzpd',
            component: () => import("@/views/bzp/zzzzpd"),
          },
          // 1.3.3织造纬纱盘点明细
          {
            path: '/织造纬纱盘点明细',
            name: 'zzwspd',
            component: () => import("@/views/bzp/zzwspd"),
          },
          // 1.3.4织造坯布盘点明细
          {
            path: '/织造坯布盘点明细',
            name: 'zzpbpd',
            component: () => import("@/views/bzp/zzpbpd"),
          },
          // 1.3.5后整半制品明细
          {
            path: '/后整半制品明细',
            name: 'hzbzp',
            component: () => import("@/views/bzp/hzbzp"),
          },

          // 1.4 成品投入产出汇总及分析
          // 1.4.1原料分析
          {
            path: '/原料分析',
            name: 'ylfx',
            component: () => import("@/views/cpfx/ylfx"),
          },
          // 1.4.2辅料分析
          {
            path: '/辅料分析',
            name: 'flfx',
            component: () => import("@/views/cpfx/flfx"),
          },
          // 1.4.3能耗分析
          {
            path: '/能耗分析',
            name: 'nhfx',
            component: () => import("@/views/cpfx/nhfx"),
          },

          // 1.5 实际生产成本核算
          // 1.5.1月度机物料费用
          {
            path: '/月度机物料费用',
            name: 'jwlfy',
            component: () => import("@/views/sccb/jwlfy"),
          },
          // 1.5.2月度人工费用
          {
            path: '/月度人工费用',
            name: 'rgfy',
            component: () => import("@/views/sccb/rgfy"),
          },
          // 1.5.3成本核算
          {
            path: '/成本核算',
            name: 'cbhs',
            component: () => import("@/views/sccb/cbhs"),
            // meta: {
            //   keepAlive: true,
            //   scollTopPosition: 0
            // }
          },
          // 子界面1
          {
            path: '/子界面1',
            name: 'interface1',
            component: () => import("@/views/sccb/interface/interface1"),
          },
          // 子界面2
          {
            path: '/子界面2',
            name: 'interface2',
            component: () => import("@/views/sccb/interface/interface2"),
          },
          // 子界面3
          {
            path: '/子界面3',
            name: 'interface3',
            component: () => import("@/views/sccb/interface/interface3"),
          },
          // 子界面4
          {
            path: '/子界面4',
            name: 'interface4',
            component: () => import("@/views/sccb/interface/interface4"),
          },
          // 子界面5
          {
            path: '/子界面5',
            name: 'interface5',
            component: () => import("@/views/sccb/interface/interface5"),
          },
          // 子界面6
          {
            path: '/子界面6',
            name: 'interface6',
            component: () => import("@/views/sccb/interface/interface6"),
          },
          // 子界面7
          {
            path: '/子界面7',
            name: 'interface7',
            component: () => import("@/views/sccb/interface/interface7"),
          },
          // 子界面8
          {
            path: '/子界面8',
            name: 'interface8',
            component: () => import("@/views/sccb/interface/interface8"),
          },

          // 1.6 月度生产单耗环比分析
          // 1.6.1月度生产单耗环比分析
          {
            path: '/月度生产单耗环比分析',
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

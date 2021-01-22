import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import spLayout from '@/layout/spLayout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/localLogin'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/localLogin'),
    hidden: true
  },
  {
    path: '/Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },
  {
    path: '/审批模块',
    component: spLayout,
    name: 'ShenPi',
    meta: { title: '审批模块', icon: 'nested' },
    hidden: true,
    children: [
      {
        path: '/发货申请/发货申请审批',
        name: 'Fahuoshenqingshenpi',
        component: () => import('@/views/xiaoshouguanli/fahuoshenqing/showSpForm'),
        meta: { title: '发货申请审批' },
        hidden: true
      },
      {
        path: '/采购合同/采购合同审批',
        name: 'Caigouhetongshenpi',
        component: () => import('@/views/xiaoshouguanli/caigouhetong/showSpForm'),
        meta: { title: '采购合同审批' },
        hidden: true
      },
      {
        path: '/销售合同/销售合同审批',
        name: 'Xiaoshouhetongshenpin',
        component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showSpForm'),
        meta: { title: '销售合同审批' },
        hidden: true
      },
      {
        path: '/加工厂档案/加工厂档案审批',
        name: 'Jiagongchangdanganshenpi',
        component: () => import('@/views/danganguanli/jiagongchangdangan/showSpForm'),
        meta: { title: '加工厂档案审批' },
        hidden: true
      },
      {
        path: '/客户档案/客户档案审批',
        name: 'Kehudanganshenpi',
        component: () => import('@/views/danganguanli/kehudangan/showSpForm'),
        meta: { title: '客户档案审批' },
        hidden: true
      },
      {
        path: '/品牌档案/品牌档案审批',
        name: 'Pinpaidanganshenpi',
        component: () => import('@/views/danganguanli/pinpaidangan/showSpForm'),
        meta: { title: '品牌档案审批' },
        hidden: true
      },
      {
        path: '/采购入库/采购入库审批',
        name: 'Caigourukushenpi',
        component: () => import('@/views/cangkuguanli/caigouruku/showSpForm'),
        meta: { title: '采购入库审批' },
        hidden: true
      },
      {
        path: '/销售出库/销售出库审批',
        name: 'Xiaoshouchukushenpi',
        component: () => import('@/views/cangkuguanli/xiaoshouchuku/showSpForm'),
        meta: { title: '销售出库审批' },
        hidden: true
      },
      {
        path: '/报价单/报价单审批',
        name: 'Baojiadanshenpi',
        component: () => import('@/views/baoJiaDan/showSpForm'),
        meta: { title: '报价单审批' },
        hidden: true
      }
    ]
  },
  {
    path: '/样衣款式列表',
    component: Layout,
    name: 'Yangyikuanshiliebiao',
    meta: { title: '样衣款式列表', icon: 'nested', pk: '样衣款式列表' },
    children: [
      {
        path: '/样衣款式列表',
        name: 'Baojiadan',
        component: () => import('@/views/yangyikuanshiliebiao'),
        meta: { title: '样衣款式列表', pk: '样衣款式列表' }
      },
      {
        path: '/样衣款式列表/样衣款式列表新增',
        name: 'Yangyikuanshiliebiaoxinzeng',
        component: () => import('@/views/yangyikuanshiliebiao/addNewForm'),
        meta: { title: '样衣款式列表(新增)', icon: 'dashboard', keepAlive: true, pk: '样衣款式列表' },
        hidden: true
      },
      {
        path: '/样衣款式列表/样衣款式列表修改',
        name: 'Yangyikuanshiliebiaoxiugai',
        component: () => import('@/views/yangyikuanshiliebiao/editNewForm'),
        meta: { title: '样衣款式列表(修改)', icon: 'dashboard', keepAlive: true, pk: '样衣款式列表' },
        hidden: true
      },
      {
        path: '/样衣款式列表/样衣款式列表详情',
        name: 'Yangyikuanshiliebiaochakan',
        component: () => import('@/views/yangyikuanshiliebiao/showForm'),
        meta: { title: '样衣款式列表(详情)', icon: 'dashboard', pk: '样衣款式列表' },
        hidden: true
      }
    ]
  }


]
export const asyncRoutes = [
  {
    path: '/基础配置',
    component: Layout,
    meta: { title: '基础配置', icon: 'nested', pk: '基础配置' },
    children: [
      {
        path: '单位管理',
        name: '单位管理',
        component: () => import('@/views/jichupeizhi/danweiguanli'),
        meta: { title: '单位管理', pk: '单位管理' }
      },
      {
        path: '物料分类',
        name: '物料分类',
        component: () => import('@/views/jichupeizhi/wuliaofenlei/wuliaofenlei'),
        meta: { title: '物料分类', pk: '物料分类' }
      },
      {
        path: '物料类型',
        name: '物料类型',
        component: () => import('@/views/jichupeizhi/wuliaoleixing/wuliaoleixing'),
        meta: { title: '物料类型', pk: '物料类型' }
      },

      {
        path: '物料管理',
        name: '物料管理',
        component: () => import('@/views/jichupeizhi/wuliaoguanli/wuliaoguanli'),
        meta: { title: '物料管理', pk: '物料管理' }
      },

      {
        path: '费用分类',
        name: '费用分类',
        component: () => import('@/views/jichupeizhi/feiyongfenlei'),
        meta: { title: '费用分类', pk: '费用分类' }
      },
      {
        path: '费用类型',
        name: '费用类型',
        component: () => import('@/views/jichupeizhi/feiyongleixing'),
        meta: { title: '费用类型', pk: '费用类型' }
      },
      {
        path: '费用管理',
        name: '费用管理',
        component: () => import('@/views/jichupeizhi/feiyongguanli'),
        meta: { title: '费用管理', pk: '费用管理' }
      }

    ]
  },
  {
    path: '/档案管理',
    component: Layout,
    name: 'Danganguanli',
    meta: { title: '档案管理', icon: 'nested', pk: '档案管理' },
    children: [
      {
        path: '/客户档案',
        name: 'Kehudangan',
        component: () => import('@/views/danganguanli/kehudangan'),
        meta: { title: '客户档案', pk: '客户档案' }
      },
      {
        path: '/客户档案/客户档案新增',
        name: 'Kehudanganxinzeng',
        component: () => import('@/views/danganguanli/kehudangan/addNewForm'),
        meta: { title: '客户档案(新增)', keepAlive: true, pk: '客户档案' },
        hidden: true
      },
      {
        path: '/客户档案/客户档案修改',
        name: 'Kehudanganxiugai',
        component: () => import('@/views/danganguanli/kehudangan/editNewForm'),
        meta: { title: '客户档案(修改)', keepAlive: true, pk: '客户档案' },
        hidden: true
      },
      {
        path: '/客户档案/客户档案部分修改',
        name: 'Kehudanganxiugai',
        component: () => import('@/views/danganguanli/kehudangan/editPartNewForm'),
        meta: { title: '客户档案(修改)', keepAlive: true, pk: '客户档案' },
        hidden: true
      },
      {
        path: '/客户档案/客户档案详情',
        name: 'Kehudanganchakan',
        component: () => import('@/views/danganguanli/kehudangan/showForm'),
        meta: { title: '客户档案(详情)', pk: '客户档案' },
        hidden: true
      },
      {
        path: '/品牌档案',
        name: 'Pinpaidangan',
        component: () => import('@/views/danganguanli/pinpaidangan'),
        meta: { title: '品牌档案', pk: '品牌档案' }
      },
      {
        path: '/品牌档案/品牌档案新增',
        name: 'PinPaidanganxinzeng',
        component: () => import('@/views/danganguanli/pinpaidangan/addNewForm'),
        meta: { title: '品牌档案(新增)', keepAlive: true, pk: '品牌档案' },
        hidden: true
      },
      {
        path: '/品牌档案/品牌档案修改',
        name: 'PinPaidanganxiugai',
        component: () => import('@/views/danganguanli/pinpaidangan/editNewForm'),
        meta: { title: '品牌档案(修改)', keepAlive: true, pk: '品牌档案' },
        hidden: true
      },
      {
        path: '/品牌档案/品牌档案详情',
        name: 'PinPaidanganchakan',
        component: () => import('@/views/danganguanli/pinpaidangan/showForm'),
        meta: { title: '品牌档案(详情)', pk: '品牌档案' },
        hidden: true
      },
      {
        path: '/加工厂档案',
        name: 'Jiagongchangdangan',
        component: () => import('@/views/danganguanli/jiagongchangdangan'),
        meta: { title: '加工厂档案', pk: '加工厂档案' }
      },
      {
        path: '/加工厂档案/加工厂档案新增',
        name: 'Jiagongchangdanganxinzeng',
        component: () => import('@/views/danganguanli/jiagongchangdangan/addNewForm'),
        meta: { title: '加工厂档案(新增)', keepAlive: true, pk: '加工厂档案' },
        hidden: true
      },
      {
        path: '/加工厂档案/加工厂档案修改',
        name: 'Jiagongchangdanganxiugai',
        component: () => import('@/views/danganguanli/jiagongchangdangan/editNewForm'),
        meta: { title: '加工厂档案(修改)', keepAlive: true, pk: '加工厂档案' },
        hidden: true
      },
      {
        path: '/加工厂档案/加工厂档案详情',
        name: 'Jiagongchangdanganchakan',
        component: () => import('@/views/danganguanli/jiagongchangdangan/showForm'),
        meta: { title: '加工厂档案(详情)', pk: '加工厂档案' },
        hidden: true
      }
    ]
  },

  {
    path: '/销售管理',
    component: Layout,
    name: '销售管理',
    meta: { title: '销售管理', icon: 'nested', pk: '销售管理' },
    children: [
      {
        path: '/销售合同',
        name: 'Xiaoshouhetong',
        component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/index'),
        meta: { title: '销售合同', pk: '销售合同' }
      },
      {
        path: '/销售合同/销售合同新增',
        name: 'Xiaoshouhetongxinzeng',
        component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/addNewForm'),
        meta: { title: '销售合同(新增)', keepAlive: true, pk: '销售合同' },
        hidden: true
      },
      {
        path: '/销售合同/销售合同修改',
        name: 'Xiaoshouhetongxiugai',
        component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/editNewForm'),
        meta: { title: '销售合同(修改)', keepAlive: true, pk: '销售合同' },
        hidden: true
      },
      {
        path: '/销售合同/销售合同详情',
        name: 'Xiaoshouhetongchakan',
        component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showForm'),
        meta: { title: '销售合同(详情)', pk: '销售合同' },
        hidden: true
      },

      {
        path: '/采购合同',
        name: 'Caigouhetong',
        component: () => import('@/views/xiaoshouguanli/caigouhetong/index'),
        meta: { title: '采购合同', pk: '采购合同' }
      },
      {
        path: '/采购合同/采购合同新增',
        name: 'Caigouhetongxinzeng',
        component: () => import('@/views/xiaoshouguanli/caigouhetong/addNewForm'),
        meta: { title: '采购合同(新增)', keepAlive: true, pk: '采购合同' },
        hidden: true
      },
      {
        path: '/采购合同/采购合同修改',
        name: 'Caigouhetongxiugai',
        component: () => import('@/views/xiaoshouguanli/caigouhetong/editNewForm'),
        meta: { title: '采购合同(修改)', keepAlive: true, pk: '采购合同' },
        hidden: true
      },
      {
        path: '/采购合同/采购合同详情',
        name: 'Caigouhetongchakan',
        component: () => import('@/views/xiaoshouguanli/caigouhetong/showForm'),
        meta: { title: '采购合同(详情)', pk: '采购合同' },
        hidden: true
      },
      {
        path: '/发货申请',
        name: 'Fahuoshenqing',
        component: () => import('@/views/xiaoshouguanli/fahuoshenqing/index'),
        meta: { title: '发货申请', pk: '发货申请' }
      },
      {
        path: '/发货申请/发货申请新增',
        name: 'Fahuoshenqingxinzeng',
        component: () => import('@/views/xiaoshouguanli/fahuoshenqing/addNewForm'),
        meta: { title: '发货申请(新增)', keepAlive: true, pk: '发货申请' },
        hidden: true
      },
      {
        path: '/发货申请/发货申请修改',
        name: 'Fahuoshenqingxiugai',
        component: () => import('@/views/xiaoshouguanli/fahuoshenqing/editNewForm'),
        meta: { title: '发货申请(修改)', keepAlive: true, pk: '发货申请' },
        hidden: true
      },
      {
        path: '/发货申请/发货申请详情',
        name: 'Fahuoshenqingchakan',
        component: () => import('@/views/xiaoshouguanli/fahuoshenqing/showForm'),
        meta: { title: '发货申请(详情)', pk: '发货申请' },
        hidden: true
      },
      {
        path: '/大货跟单进度表',
        name: 'Dahuogendanjindubiao',
        component: () => import('@/views/xiaoshouguanli/dahuogendanjindubiao/index'),
        meta: { title: '大货跟单进度表', pk: '大货跟单进度表' }
      }
    ]
  },

  {
    path: '/销售合同审批详情',
    name: 'Xiaoshouhetongchakan',
    component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showSpForm'),
    meta: { title: '销售合同(审批详情)', pk: '销售合同' },
    hidden: true
  },

  {
    path: '/仓库管理',
    component: Layout,
    name: 'Cangkuguanli',
    meta: { title: '仓库管理', icon: 'nested', pk: '仓库管理' },
    children: [
      {
        path: '/采购入库',
        name: 'Caigouruku',
        component: () => import('@/views/cangkuguanli/caigouruku'),
        meta: { title: '采购入库', pk: '采购入库' }
      },
      {
        path: '/采购入库/采购入库新增',
        name: 'Caigourukuxinzeng',
        component: () => import('@/views/cangkuguanli/caigouruku/addNewForm'),
        meta: { title: '采购入库(新增)', icon: 'dashboard', keepAlive: true, pk: '采购入库' },
        hidden: true
      },
      {
        path: '/采购入库/采购入库修改',
        name: 'Caigourukuxiugai',
        component: () => import('@/views/cangkuguanli/caigouruku/editNewForm'),
        meta: { title: '采购入库(修改)', icon: 'dashboard', keepAlive: true, pk: '采购入库' },
        hidden: true
      },
      {
        path: '/采购入库/采购入库详情',
        name: 'Caigourukuchakan',
        component: () => import('@/views/cangkuguanli/caigouruku/showForm'),
        meta: { title: '采购入库(详情)', icon: 'dashboard', pk: '采购入库' },
        hidden: true
      },
      {
        path: '/销售出库',
        name: 'Xiaoshouchuku',
        component: () => import('@/views/cangkuguanli/xiaoshouchuku'),
        meta: { title: '销售出库', pk: '销售出库' }
      },

      {
        path: '/销售出库/销售出库新增',
        name: 'Xiaoshouchukuxinzeng',
        component: () => import('@/views/cangkuguanli/xiaoshouchuku/addNewForm'),
        meta: { title: '销售出库(新增)', icon: 'dashboard', keepAlive: true, pk: '销售出库' },
        hidden: true
      },
      {
        path: '/销售出库/销售出库修改',
        name: 'Xiaoshouchukuxiugai',
        component: () => import('@/views/cangkuguanli/xiaoshouchuku/editNewForm'),
        meta: { title: '销售出库(修改)', icon: 'dashboard', keepAlive: true, pk: '销售出库' },
        hidden: true
      },
      {
        path: '/销售出库/销售出库详情',
        name: 'Xiaoshouchukuchakan',
        component: () => import('@/views/cangkuguanli/xiaoshouchuku/showForm'),
        meta: { title: '销售出库(详情)', icon: 'dashboard', pk: '销售出库' },
        hidden: true
      }
    ]
  },

  {
    path: '/报价单',
    component: Layout,
    name: 'Baojiadan',
    meta: { title: '报价单', icon: 'nested', pk: '报价单' },
    children: [
      {
        path: '/报价单',
        name: 'Baojiadan',
        component: () => import('@/views/baoJiaDan'),
        meta: { title: '报价单', pk: '报价单' }
      },
      {
        path: '/报价单/报价单新增',
        name: 'Baojiadanxinzeng',
        component: () => import('@/views/baoJiaDan/addNewForm'),
        meta: { title: '报价单(新增)', icon: 'dashboard', keepAlive: true, pk: '报价单' },
        hidden: true
      },
      {
        path: '/报价单/报价单修改',
        name: 'Baojiadanxiugai',
        component: () => import('@/views/baoJiaDan/editNewForm'),
        meta: { title: '报价单(修改)', icon: 'dashboard', keepAlive: true, pk: '报价单' },
        hidden: true
      },
      {
        path: '/报价单/报价单详情',
        name: 'Baojiadanchakan',
        component: () => import('@/views/baoJiaDan/showForm'),
        meta: { title: '报价单(详情)', icon: 'dashboard', pk: '报价单' },
        hidden: true
      },
      {
        path: '/报价单/报价单预览',
        name: 'Baojiadanyulan',
        component: () => import('@/views/baoJiaDan/yuLanForm'),
        meta: { title: '报价单预览', icon: 'dashboard', pk: '报价单' },
        hidden: true
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    meta: { title: '', pk: '' },
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'hash'
})

const router = new Router()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router

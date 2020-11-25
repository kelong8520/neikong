// 展示界面
import api from "@/utils/http"

//  1.1 财务基础档案
// 加载所有未审核财务基础档案信息(审批、未审批、历史)
export const getAllBaseDangAn = (params) => {
    return api({
        url: "/api/dangAn/getAllBaseDangAn",
        method: "get",
        params
    })
}
// 加载一条基础档案信息
export const getOneBaseDangAn = (params) => {
    return api({
        url: "/api/dangAn/getOneBaseDangAn",
        method: "get",
        params
    })
}
// 添加档案信息/修改档案信息
export const addBaseDangAn = (data) => {
    return api({
        url: "/api/dangAn/addBaseDangAn",
        method: "post",
        data
    })
}
// 通过、未通过
export const updateState = (data) => {
    return api({
        url: "/api/dangAn/updateState",
        method: "post",
        data
    })
}
// 是否停用
export const upDateStopBaseDangAn = (data) => {
    return api({
        url: "/api/dangAn/upDateStopBaseDangAn",
        method: "post",
        data
    })
}



//  1.2 产品核价 
//  加载主界面信息
export const newERP = (params) => {
    return api({
        url: "/api/hejia/weaveTechnics/newERP",
        method: "get",
        params
    })
}
//  编辑界面加载核价明细
export const LoadingHeJiaMingXi = (params) => {
    return api({
        url: "/api/hejia/LoadingHeJiaMingXi",
        method: "get",
        params
    })
}
//  添加产品核价信息
export const addChanPinHeJia = (data) => {
    return api({
        url: "/api/hejia/addChanPinHeJia",
        method: "post",
        data
    })
}
//  编辑和查看
export const CheckHeJiaMingXi = (params) => {
    return api({
        url: "/api/hejia/CheckHeJiaMingXi",
        method: "get",
        params
    })
}
//  审批提交按钮
export const submitHeJia = (data) => {
    return api({
        url: "/api/hejia/submitHeJia",
        method: "post",
        data
    })
}
//  审批提交按钮
export const JianSuoHeJia = (data) => {
    return api({
        url: "/api/hejia/JianSuoHeJia",
        method: "post",
        data
    })
}




//  1.1.3  月度实际发生费用
//  加载主界面信息
export const LoadMonthExpenses = (params) => {
    return api({
        url: "/api/monthExpenses/LoadMonthExpenses",
        method: "get",
        params
    })
}
//  添加产品核价信息
export const addMonthExpenses = (data) => {
    return api({
        url: "/api/monthExpenses/addMonthExpenses",
        method: "post",
        data
    })
}







// 1.4 汇率信息维护
// 加载所有汇率信息
export const getAllExchangerate = (params) => {
    return api({
        url: "/api/exchangerate/getAllExchangerate",
        method: "get",
        params
    })
}
// 加载(一条)汇率信息
export const getOneExchangerate = (params) => {
    return api({
        url: "/api/exchangerate/getOneExchangerate",
        method: "get",
        params
    })
}
// 添加汇率信息/修改汇率信息
export const addExchangerate = (data) => {
    return api({
        url: "/api/exchangerate/addExchangerate",
        method: "post",
        data
    })
}






// // 韶关数据导出
// // 浆染
// export const getData = (data) => {
//     return api({
//         url: "/api/Jiangran/getData",
//         method: "post",
//         data
//     })
// }
// // excel 数据
// export const outExcelJR = (data) => {
//     return api({
//         url: "/api/Jiangran/outExcelJR",
//         method: "post",
//         data
//     })
// }


// // 后整
// export const getDataHouZheng = (data) => {
//     return api({
//         url: "/api/houzheng/getData",
//         method: "post",
//         data
//     })
// }
// // excel 数据
// export const outExcelHZ  = (data) => {
//     return api({
//         url: "/api/houzheng/outExcelHZ",
//         method: "post",
//         data
//     })
// }











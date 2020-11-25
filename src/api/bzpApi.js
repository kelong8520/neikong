import api from "@/utils/http"

//  1.3 在途浆染半制品盘存
//  1.3.1 浆染半制品盘点明细
// 加载主界面信息/检索
export const getJiangRanShaiXuan = (params) => {
    return api({
        url: "/api/banZhiPin/getJiangRanShaiXuan",
        method: "get",
        params
    })
}
//  重新计算
export const getJiangRan = (data) => {
    return api({
        url: "/api/banZhiPin/getJiangRan",
        method: "post",
        data
    })
}
// 确定存入
export const addJiangRan = (data) => {
    return api({
        url: "/api/banZhiPin/addJiangRan",
        method: "post",
        data
    })
}
// 财务审核
export const JiangRanSheHe = (data) => {
    return api({
        url: "/api/banZhiPin/JiangRanSheHe",
        method: "post",
        data
    })
}

//  1.3.2 织造织轴盘点明细
//  加载主界面信息/筛选
export const getZhiZhouShaiXuan = (params) => {
    return api({
        url: "/api/banZhiPin/getZhiZhouShaiXuan",
        method: "get",
        params
    })
}
//  重新计算
export const getZhiZhou = (data) => {
    return api({
        url: "/api/banZhiPin/getZhiZhou",
        method: "post",
        data
    })
}
//  确定存入
export const addZhiZhou = (data) => {
    return api({
        url: "/api/banZhiPin/addZhiZhou",
        method: "post",
        data
    })
}
//  财务审核
export const ZhiZhouSheHe = (data) => {
    return api({
        url: "/api/banZhiPin/ZhiZhouSheHe",
        method: "post",
        data
    })
}

//  1.3.3 织造纬纱盘点明细


//  1.3.4 织造坯布盘点明细
//  织造坯布盘点明细
export const getPiBuShaiXuan = (params) => {
    return api({
        url: "/api/banZhiPin/getPiBuShaiXuan",
        method: "get",
        params
    })
}
//  重新计算
export const getPiBu = (data) => {
    return api({
        url: "/api/banZhiPin/getPiBu",
        method: "post",
        data
    })
}
//  确定存入
export const addPiBu = (data) => {
    return api({
        url: "/api/banZhiPin/addPiBu",
        method: "post",
        data
    })
}
//  财务审核
export const PiBuSheHe = (data) => {
    return api({
        url: "/api/banZhiPin/PiBuSheHe",
        method: "post",
        data
    })
}

//  1.3.5 后整半制品明细
//  加载主界面信息/检索
export const getHouZhengShaiXuan = (params) => {
    return api({
        url: "/api/banZhiPin/getHouZhengShaiXuan",
        method: "get",
        params
    })
}
//  重新计算
export const getHouZheng = (data) => {
    return api({
        url: "/api/banZhiPin/getHouZheng",
        method: "post",
        data
    })
}
//  确定存入
export const addHouZheng = (data) => {
    return api({
        url: "/api/banZhiPin/addHouZheng",
        method: "post",
        data
    })
}
//  财务审核
export const HouZhengSheHe = (data) => {
    return api({
        url: "/api/banZhiPin/HouZhengSheHe",
        method: "post",
        data
    })
}





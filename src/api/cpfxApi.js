// 展示界面
import api from "@/utils/http"

//  1.4  成品汇总及分析
//  1.4.1  原料分析数据
export const getYLInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getYLInputData",
        method: "post",
        data
    })
}



//  1.4.2  辅料分析数据
export const getFLInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getFLInputData",
        method: "post",
        data
    })
}



//  1.4.3  能耗分析数据
export const getNHInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getNHInputData",
        method: "post",
        data
    })
}





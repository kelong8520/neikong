// 展示界面
import api from "@/utils/http"

//  1.2 分工序投入产出明细
//  1.2.1 原料投入数据
export const getYLInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getYLInputData",
        method: "post",
        data
    })
}

// 1.2.2 辅料投入数据
export const getFLInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getFLInputData",
        method: "post",
        data
    })
}

//  1.2.3 能耗投入数据
export const getNHInputData = (data) => {
    return api({
        url: "/api/ProcessInputOutput/getNHInputData",
        method: "post",
        data
    })
}




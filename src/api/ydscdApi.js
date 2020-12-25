// 展示界面
import api from "@/utils/http"

//  1.6  生产单耗环比分析
//  1.6.1 月度生产单耗环比分析
export const HuanBiFenXi = (data) => {
    return api({
        url: "/api/HuanBiFenXi",
        method: "post",
        data
    })
}








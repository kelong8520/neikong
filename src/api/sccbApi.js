// 展示界面
import api from "@/utils/http"

//  1.5 实际生产成本核算
//  1.5.3 成本核算
//  主界面
export const getcbhsTotal = (params) => {
    return api({
        url: "/api/chengbenhesuan/getcbhsTotal",
        method: "get",
        params
    })
}
//  子界面1
export const getjryl = (params) => {
    return api({
        url: "/api/chengbenhesuan/getjryl",
        method: "get",
        params
    })
}
//  子界面2
export const getjrfl = (params) => {
    return api({
        url: "/api/chengbenhesuan/getjrfl",
        method: "get",
        params
    })
}
//  子界面3 
export const getjrnh = (params) => {
    return api({
        url: "/api/chengbenhesuan/getjrnh",
        method: "get",
        params
    })
}
//  子界面4
export const getzzyl = (params) => {
    return api({
        url: "/api/chengbenhesuan/getzzyl",
        method: "get",
        params
    })
}
//  子界面5 
export const gethzfl = (params) => {
    return api({
        url: "/api/chengbenhesuan/gethzfl",
        method: "get",
        params
    })
}
//  子界面6 
export const gethznh = (params) => {
    return api({
        url: "/api/chengbenhesuan/gethznh",
        method: "get",
        params
    })
}
// //  子界面7 
// export const gethznh = (params) => {
//     return api({
//         url: "/api/chengbenhesuan/gethznh",
//         method: "get",
//         params
//     })
// }
// //  子界面8 
// export const gethznh = (params) => {
//     return api({
//         url: "/api/chengbenhesuan/gethznh",
//         method: "get",
//         params
//     })
// }






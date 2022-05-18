import request from "../request";

const getList = async (params:any) => {
    return await request.get('/api/program/selectall?page='+params.page,{showLoading:false})
}

const getMessage = async (params:any) => {
    return await request.get('/api/program/selectone?pro_team='+params.pro_team+'&page='+params.page,{showLoading:false})
}

const rejectData = async(params:any) => {
    return await request.post<string>('/api/admin/approvalwork',JSON.stringify(params))
}

const getUser = async(params:any) => {
    return await request.post<string>('/api/user/selectusername',JSON.stringify(params),{showLoading:false})
}

const Resetting = async(params:any) => {
    return await request.post<string>('/api/program/resetpassword',JSON.stringify(params))
}

const Adduser = async(params:any) => {
    return await request.post<string>('/api/program/addaccount',JSON.stringify(params))
}

export {
    getList,
    getMessage,
    rejectData,
    getUser,
    Resetting,
    Adduser
}
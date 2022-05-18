import request from "../request";

const getList = async (params:any) => {
    return await request.post<string>('/api/pro/selects',JSON.stringify((params)))
}

export {
    getList
}
import service from '../axios/axiosConfigs'
import { Get, Post } from '../type/types'

// 封装 get 方法，类型为Get
const get: Get = async (url, config) => {
    let Config = config!
    const response = await service.get(url, { ...Config });
    return response.data;
};

// 封装 post 方法，类型为Post
const post: Post = async (url, params, config) => {
    let Config = config!
    const response = await service.post(url, params, { ...Config });
    return response.data;
};

// 使用 request 统一调用
const request = {
    get,
    post,
};

export default request;

import { AxiosRequestConfig } from 'axios'

interface IAxiosConfig extends AxiosRequestConfig {
    showLoading?:boolean
}


// 网络请求响应格式，T 是具体的接口返回类型数据
interface CustomSuccessData<T> {
    code: number;
    msg: string;
    data: string;
    [keys: string]: any
}


interface Get {
    <T>(url: string, config?: IAxiosConfig): Promise<CustomSuccessData<T>>
}

interface Post {
    <T>(url: string, params?: string | object, config?: IAxiosConfig): Promise<CustomSuccessData<T>>;
}

interface Delete {
    <T>(url: string, params?: string | object, config?: IAxiosConfig): Promise<CustomSuccessData<T>>
}

interface Put {
    <T>(url: string, params?: string | object, config?: IAxiosConfig): Promise<CustomSuccessData<T>>
}



export {
    CustomSuccessData,
    IAxiosConfig,
    Get,
    Post,
    Delete,
    Put
}
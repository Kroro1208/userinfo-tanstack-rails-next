import axios from "axios";
import baseURL from './baseUrl/route';

const axiosInstance = axios.create({
    baseURL,
    timeout: 1000
});

type ApiOptions = {
    data?: object,
    method?: "get" | "put" | "post" | "delete",
    params?: object
}
export const api = async (url: string, options: ApiOptions = {}) => {
    const { data, method = "get", params } = options
    const accessToken = "ACCESS_TOKEN"

    try {
        const response = await axiosInstance.request({
            data,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            method,
            params,
            responseType: "json",
            url
        })
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.errors || "エラーが発生しました");
        } 
    }
}

export default api;
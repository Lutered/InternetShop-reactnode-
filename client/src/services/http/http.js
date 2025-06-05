import axios from "axios";
import globalServices from "../globalServices";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    const userService = globalServices.getUserServices();
    config.headers.authorization = `Bearer ${userService.getAuthToken()}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

const executeRequest = async (axiosPromise) => {
    let response = {
        data: null,
        errorMessage: null,
        errorCode: null
    };

    try{
        let {data} = await axiosPromise;
        response.data = data;
    }catch(e){
        console.error(e);

        response.errorMessage = e.message;
        response.errorCode = e.code;
    }

    return response;
};

export {
    $host,
    $authHost,
    executeRequest
}

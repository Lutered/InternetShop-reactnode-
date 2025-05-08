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
    //localStorage.getItem('token')
    config.headers.authorization = `Bearer ${userService.getAuthToken()}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}

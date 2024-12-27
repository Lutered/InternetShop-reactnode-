import {$authHost, $host} from "../http";

const productUrl = 'api/products';

export const createProduct = async (product) => {
    const {data} = await $authHost.post(`${productUrl}/create`, product);
    return data;
};

export const searchProducts = async (page, limit, searchParams) => {
    let requestParams = {page, limit};

    requestParams = searchParams ? {...requestParams, ...searchParams} : requestParams; 

    const {data} = await $host.get(`${productUrl}/search`, {params: requestParams});
    return data;
};

export const fetchProductById = async (id) => {
    const {data} = await $host.get(`${productUrl}/get/${id}`);
    return data;
};

export const fetchProductTypes = async (page, limit = 20) => {
    const {data} = await $host.get(`${productUrl}/getTypes`, {params: {
         page, limit
    }});
    return data;
};

export const fetchProductTypeById = async (id) => {
    const {data} = await $host.get(`${productUrl}/getType/${id}`);
    return data;
};

export const fetchCategories = async (page, limit, searchParams) => {
    let requestParams = {page, limit};

    requestParams = searchParams ? {...requestParams, ...searchParams} : requestParams; 

    const {data} = await $host.get(`${productUrl}/getCategories`, {params: requestParams});
    return data;
};

export const fetchCategoryById = async (id) => {
    const {data} = await $host.get(`${productUrl}/getCategory/${id}`);
    return data;
};
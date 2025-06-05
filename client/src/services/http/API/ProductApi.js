import {$authHost, $host, executeRequest} from "../http";

const productUrl = 'api/products';

export const createProduct = async (product) => {
    const request = $authHost.post(`${productUrl}/create`, product);

    return await executeRequest(request);
};

export const searchProducts = async (page, limit, params = {}) => {
    let requestParams = {page, limit};
    requestParams = params.reqParams ? 
        {...requestParams, ...params.reqParams} : 
        requestParams; 

    let url = `${productUrl}/search`;
    url = params.productType ? 
        `${url}/${params.productType}` : 
        url;

    const request = $host.get(url, {params: requestParams});

    return await executeRequest(request);
};

export const getFilterOptions = async (id) => {
    let url = `${productUrl}/getFilterOptions/${id}`;

    const request = $host.get(url);

    return await executeRequest(request);
};

export const fetchProductById = async (id) => {
    const request = $host.get(`${productUrl}/get/${id}`);

    return await executeRequest(request);
};

export const fetchProductTypes = async (page, limit = 20) => {
    const request = $host.get(`${productUrl}/getTypes`, {params: {
        page, limit
    }});

    return await executeRequest(request);
};

export const fetchProductType = async (code) => {
    const request = $host.get(`${productUrl}/getType/${code}`);
    return await executeRequest(request);
};

export const fetchCategories = async (page, limit, searchParams) => {
    let requestParams = {page, limit};

    requestParams = searchParams ? {...requestParams, ...searchParams} : requestParams; 

    const request = $host.get(`${productUrl}/getCategories`, {params: requestParams});

    return await executeRequest(request);
};

export const fetchCategoryById = async (id) => {
    const request = $host.get(`${productUrl}/getCategory/${id}`);
    
    return await executeRequest(request);
};
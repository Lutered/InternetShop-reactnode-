import {$authHost, $host} from "./http";

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product);
    return data;
};

export const fetchProducts = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/product', {params: {
            typeId, brandId, page, limit
        }});
    return data;
};

export const fetchProductTypes = async (page, limit = 20) => {
    const {data} = await $host.get('api/productType', {params: {
         page, limit
    }});
    return data;
};
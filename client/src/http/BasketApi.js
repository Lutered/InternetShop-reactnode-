import {$authHost, $host} from "./http";

const basketUrl = 'api/basket';

export const fetchBasketItems = async (id) => {
    const {data} = await $host.get(`${basketUrl}/get/${id}`);
    return data;
};

export const fetchBasketCount = async (id) => {
    const {data} = await $host.get(`${basketUrl}/getCount/${id}`);
    return data;
};

export const addBasketItem = async (basketId, productId) => {
    const {data} = await $host.post(`${basketUrl}/addProduct`, {
        basketId,
        productId
    });
    return data;
};

export const removeBasketItem = async (id) => {
    const {data} = await $host.post(`${basketUrl}/removeProduct`, {
        id
    });
    return data;
};

export const changeItemCount = async (id, count) => {
    const {data} = await $host.post(`${basketUrl}/changeCount`, {
        id,
        count
    });
    return data;
};
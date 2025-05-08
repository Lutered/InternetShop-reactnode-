import {$host} from "../http";

const authUrl = 'api/auth';

export const login = async (email, password) => {
    const { data } = await $host.post(`${authUrl}/login`, {email, password});
    return data;
 };

 export const register = async (firstName, lastName, email, password) => {
    const { data } = await $host.post(`${authUrl}/register`, {firstName, lastName, email, password});
    return data;
 }
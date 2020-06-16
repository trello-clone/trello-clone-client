import axios from 'axios';

const { API_BASE_URL, API_KEY } = process.env;

export const API = {
    get: (endpoint: string) => axios({
        method: 'GET',
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
            'x-apikey': API_KEY
        },
    }),
    post: (endpoint: string, payload: any) => axios({
        method: 'POST',
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
            'x-apikey': API_KEY
        },
        data: payload,
    }),
    put: (endpoint: string, payload: any) => axios({
        method: 'PUT',
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
            'x-apikey': API_KEY
        },
        data: payload,
    }),
    patch: (endpoint: string, payload: any) => axios({
        method: 'PATCH',
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
            'x-apikey': API_KEY
        },
        data: payload,
    }),
    delete: (endpoint: string) => axios({
        method: "DELETE",
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
            'x-apikey': API_KEY
        },
    })
};
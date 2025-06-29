import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from './AppUser/cookie';

export const queryClient = new QueryClient();
// const baseURL =
//     import.meta.env.MODE === 'development'
//         ? '/api' // 개발 시 프록시 경로
//         : import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // 토큰 가져오기
        const token = getCookies('accessToken');
        if (token) {
            config.headers['access-token'] = `${token}`;
        }
        return config;
    },
    function (error) {
        // 요청 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

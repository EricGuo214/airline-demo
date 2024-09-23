import axios from 'axios';
import useSWR from 'swr';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
  });

// axiosInstance.interceptors.response.use(
// (response) => {
//     console.log('response', {response})
//     return {
//     data: response.data,
//     error: null,
//     // responseStatus: response.status,
//     };
// },
// (error) => {
//     if (error === 401) {
//     console.log('huhu')
//     }
//     return {
//     data: null,
//     error: error.response,
//     // responseStatus: error.response.status,
//     };
// }
// );

export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
export const poster = (url, data) => axiosInstance.post(url, data).then((res) => res.data);


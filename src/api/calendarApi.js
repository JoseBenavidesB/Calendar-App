
import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariable';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL 
});

// config interceptors, to add TOKEN all REQUEST
calendarApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };

    return config;
})


export default calendarApi;
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5111/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
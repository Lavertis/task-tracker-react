import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

const instance = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

export default instance
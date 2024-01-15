import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 60_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default myAxios;
const axiosAPI = require('axios');

const axios = axiosAPI.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

(async () => {
    const token = localStorage.getItem('token');
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else
        delete axios.defaults.headers.common['Authorization'];
})();

export default axios;
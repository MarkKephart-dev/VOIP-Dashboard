import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
console.log('Base URL is:', 'https://' + window.location.hostname);

axios.interceptors.request.use(request => {
    console.log(
        '📡 Axios Request:',
        request.method.toUpperCase(),
        request.baseURL + request.url
    );
    return request;
});

axios.defaults.baseURL = 'https://' + window.location.hostname;
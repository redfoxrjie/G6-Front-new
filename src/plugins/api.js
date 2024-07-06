//Import Axios Library and Auth0
import axios from 'axios';

//創建一個axios實例(可以有很多個)
const apiInstance = axios.create({
    // 將所有請求的基礎 URL 設置為 /api
    baseURL: '/api', 
    // 設置請求的默認超時時間為 5000 毫秒（5 秒）
    timeout: 5000,
    // 為所有請求設置默認標頭，其中包括 Content-Type 設置為 application/json
    headers: {
        'Content-Type': 'application/json', 
    },
});

// 將實例請求封裝
apiInstance.interceptors.request.use(async (config) => {
    // 針對token
    // const { getAccessTokenSilently } = useAuth0();
    // const accessToken = await getAccessTokenSilently();
    // config.headers['Authorization'] = accessToken
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default apiInstance;
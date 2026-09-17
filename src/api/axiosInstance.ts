import axios from 'axios';

// const STAGING_API_URL = 'http://192.168.29.81:8000/api/eserve/v1';
// const STAGING_API_URL = 'http://192.168.29.81:8000/api/eserve/v1';
const STAGING_API_URL = 'http://10.0.2.2:8000/api/eserve/v1';
// const STAGING_API_URL = 'http://127.0.0.1:8000/api/eserve/v1';

const X_VERIFICATION_TOKEN = '@EServe-FmtnKgUrp5-3UlNmdKRbV';
export const axiosInstance = axios.create({
  baseURL: STAGING_API_URL,
  timeout: 30000,
  headers: {
    'x-verification-token': X_VERIFICATION_TOKEN,
  },
});

import axios from 'axios';
import { TokenNames } from '../store/tokens';
import env from 'react-dotenv';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = config.url?.includes(env?.CONTENT_SERVER_HOST)
    ? localStorage.getItem(TokenNames.contentAccessToken)
    : localStorage.getItem(TokenNames.multiplayerToken);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axiosInstance;

import env from 'react-dotenv';
import ILoginData from '../interfaces/Login/ILoginData';
import IContentUser from '../interfaces/Login/IContentUser';
import axiosInstance from '../axios';
import IMultiplayerUser from '../interfaces/IMultiplayerUser';

class ContentService {
  static async login(data: ILoginData): Promise<IContentUser> {
    const url: string = `${env?.CONTENT_SERVER_HOST}/api/auth/signin`;
    const response = await axiosInstance.post<IContentUser>(url, data);
    return response.data;
  }

  static async getMultiplayerToken(): Promise<string> {
    const url: string = `${env?.CONTENT_SERVER_HOST}/api/multiplayer/auth/token`;
    const response = await axiosInstance.post<IMultiplayerUser>(url);

    return response.data.token;
  }

  static async createSpace() {
    const url: string = `${env?.CONTENT_SERVER_HOST}/api/admin/game-spaces`;
    const response = await axiosInstance.post<{ id: string }>(url, {
      name: Date.now().toString(),
    });
    return response.data;
  }
}

export default ContentService;

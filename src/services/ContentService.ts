import axios from 'axios';
import env from 'react-dotenv';
import ILoginData from '../interfaces/Login/ILoginData';
import IContentUser from '../interfaces/Login/IContentUser';

class ContentService {
  private static readonly contentServerHost: string = `${env?.CONTENT_SERVER_HOST}:${env?.CONTENT_SERVER_PORT}`;

  static async login(data: ILoginData): Promise<IContentUser> {
    const url: string = `${this.contentServerHost}/api/auth/signin`;
    const response = await axios.post<IContentUser>(url, data);
    return response.data;
  }
}

export default ContentService;

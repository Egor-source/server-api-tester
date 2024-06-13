import env from 'react-dotenv';
import axiosInstance from '../axios';
import IRoom from '../interfaces/Rooms/IRoom';

class MultiplayerService {
  static async getRooms(): Promise<IRoom[]> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/`;
    const response = await axiosInstance<IRoom[]>(url);
    return response.data;
  }

  static async downloadSchemaFile(schemaName: string): Promise<string> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/`;
    const response = await axiosInstance.post<string>(url, { schemaName });
    return response.data;
  }
}

export default MultiplayerService;

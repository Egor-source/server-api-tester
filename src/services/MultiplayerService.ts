import env from 'react-dotenv';
import axiosInstance from '../axios';
import IRoom from '../interfaces/Rooms/IRoom';

class MultiplayerService {
  static async getRooms(): Promise<IRoom[]> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/`;
    const response = await axiosInstance<IRoom[]>(url);
    return response.data;
  }

  static async downloadSchemaFiles(
    stateSchemaName: string,
    schemaName?: string
  ): Promise<Blob> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/`;
    const response = await axiosInstance.post<Blob>(
      url,
      { stateSchemaName, schemaName },
      {
        responseType: 'blob',
      }
    );
    return new Blob([response.data], { type: 'application/zip' });
  }
}

export default MultiplayerService;

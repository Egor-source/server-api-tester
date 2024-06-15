import env from 'react-dotenv';
import axiosInstance from '../axios';
import IRoomType from '../interfaces/Rooms/IRoomType';
import IRoomEvent from '../interfaces/Rooms/IRoomEvent';

class MultiplayerService {
  static async getRooms(): Promise<IRoomType[]> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/`;
    const response = await axiosInstance<IRoomType[]>(url);
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

  static async getRoomEvents(roomName: string): Promise<IRoomEvent[]> {
    const url = `${env?.MULTIPLAYER_SERVER_HOST}/server-test-api/${roomName}`;
    const response = await axiosInstance<IRoomEvent[]>(url);
    return response.data;
  }
}

export default MultiplayerService;

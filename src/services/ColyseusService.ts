import colyseusClient from '../colyseus';
import { Room } from 'colyseus.js';

export interface ICreateRoomPayload {
  roomType: string;
  options?: any;
}

class ColyseusService {
  static async createRoom({
    roomType,
    options,
  }: ICreateRoomPayload): Promise<Room> {
    return await colyseusClient.create(roomType, options);
  }

  private static subscribeToTriggeredEvent(
    room: Room,
    triggeredEvents: string | string[]
  ): Promise<unknown[]> {
    const events = Array.isArray(triggeredEvents)
      ? triggeredEvents
      : [triggeredEvents];

    return Promise.all(
      events.map((event: string) => {
        return new Promise((resolve, reject) => {
          const timeOut = setTimeout(() => {
            reject(`Сервер не прислал ответ на событие ${event}`);
          }, 10000);
          room.onMessage(event, (...args: any[]) => {
            clearTimeout(timeOut);
            resolve({
              eventName: event,
              returnedValues: args,
            });
          });
        });
      })
    );
  }
}

export default ColyseusService;

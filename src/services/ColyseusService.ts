import colyseusClient from '../colyseus';
import { Room } from 'colyseus.js';
import IRoomEvent from '../interfaces/Rooms/IRoomEvent';

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

  static async sendMessage(
    room: Room,
    event: IRoomEvent,
    options?: any
  ): Promise<any[] | null> {
    room.send(event.name, options);
    if (event.triggeredEvents) {
      return await this.subscribeToTriggeredEvent(room, event.triggeredEvents);
    }
    return null;
  }

  private static subscribeToTriggeredEvent(
    room: Room,
    triggeredEvents: string | string[]
  ): Promise<any[]> {
    const events = Array.isArray(triggeredEvents)
      ? triggeredEvents
      : [triggeredEvents];

    return Promise.all(
      events.map((event: string) => {
        return new Promise((resolve, reject) => {
          const timeOut = setTimeout(() => {
            reject(`Сервер не прислал ответ на событие ${event}`);
          }, 10000);
          room.onMessage(event, (args: any) => {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from 'colyseus.js';
import IRoomEvent from '../interfaces/Rooms/IRoomEvent';

interface IRoom {
  [key: string]: Room[];
}

interface ISetRoomsPayload {
  roomType: string;
  rooms: Room[];
}

interface IAddRoomPayload {
  roomType: string;
  room: Room;
}

interface IRoomEventState {
  [key: string]: IRoomEvent[];
}

interface ISetRoomsEventsPayload {
  roomType: string;
  events: IRoomEvent[];
}

interface IGetEventByNamePayload {
  roomType: string;
  eventName: string;
}

interface IRoomPayload {
  roomType: string;
  roomId: string;
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: {} as IRoom,
    roomsEvents: {} as IRoomEventState,
  },
  selectors: {
    getRoomsByType(state) {
      return (roomType: string): Room[] => {
        return state.rooms[roomType];
      };
    },
    getRoomByRoomId(state) {
      return ({ roomType, roomId }: IRoomPayload) => {
        return state.rooms[roomType]?.find((room) => room.id === roomId);
      };
    },
    getEventsByType(state) {
      return (roomType: string): IRoomEvent[] => {
        return state.roomsEvents[roomType];
      };
    },
    getEventByName(state) {
      return ({ roomType, eventName }: IGetEventByNamePayload) => {
        return state.roomsEvents[roomType].find(
          ({ name }: IRoomEvent) => name === eventName
        );
      };
    },
  },
  reducers: {
    setRooms(state, { payload }: PayloadAction<ISetRoomsPayload>) {
      state.rooms[payload.roomType] = payload.rooms;
    },
    addRoom(state, { payload }: PayloadAction<IAddRoomPayload>) {
      state.rooms[payload.roomType].push(payload.room);
    },
    setRoomEvents(state, { payload }: PayloadAction<ISetRoomsEventsPayload>) {
      state.roomsEvents[payload.roomType] = payload.events;
    },
    deleteRoom(state, { payload }: PayloadAction<IRoomPayload>) {
      state.rooms[payload.roomType] = state.rooms[payload.roomType].filter(
        (room) => room.id !== payload.roomId
      );
    },
  },
});

export const { setRooms, addRoom, setRoomEvents, deleteRoom } =
  roomsSlice.actions;
export const {
  getRoomsByType,
  getEventsByType,
  getEventByName,
  getRoomByRoomId,
} = roomsSlice.selectors;

export default roomsSlice.reducer;

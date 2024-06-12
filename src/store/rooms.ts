import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRoom from '../interfaces/Rooms/IRoom';
import IRoomData from '../interfaces/Rooms/IRoomData';
import ISchema from '../interfaces/Rooms/ISchema';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [] as IRoom[],
    selectedRoom: null as string | null | undefined,
  },
  selectors: {
    getRoomData(state): IRoomData[] {
      return state.rooms.map(
        (room: IRoom): IRoomData => ({
          roomName: room.roomName,
          description: room.description,
        })
      );
    },
    getSelectedRoom(state): string | null | undefined {
      return state.selectedRoom;
    },
    getSchemaByRoomName(state) {
      return (roomName: string): ISchema | null => {
        if (state.rooms.length === 0) return null;
        const { schemaName, stateSchema } = state.rooms.find(
          (room) => room.roomName === roomName
        ) as IRoom;
        return {
          schemaName,
          stateSchema,
        };
      };
    },
  },
  reducers: {
    setRooms(state, { payload }: PayloadAction<IRoom[]>) {
      state.rooms = payload;
    },
    setSelectedRoom(
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) {
      state.selectedRoom = payload;
    },
  },
});

export const { setRooms, setSelectedRoom } = roomsSlice.actions;
export const { getRoomData, getSelectedRoom, getSchemaByRoomName } =
  roomsSlice.selectors;
export default roomsSlice.reducer;

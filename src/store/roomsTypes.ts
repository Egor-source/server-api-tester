import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRoomType from '../interfaces/Rooms/IRoomType';
import IRoomData from '../interfaces/Rooms/IRoomData';
import ISchema from '../interfaces/Rooms/ISchema';

const roomsTypeSlice = createSlice({
  name: 'roomsTypes',
  initialState: {
    roomsTypes: [] as IRoomType[],
    selectedRoom: null as string | null | undefined,
  },
  selectors: {
    getRoomTypeData(state): IRoomData[] {
      return state.roomsTypes.map(
        (room: IRoomType): IRoomData => ({
          roomName: room.roomName,
          description: room.description,
        })
      );
    },
    getSelectedRoomType(state): string | null | undefined {
      return state.selectedRoom;
    },
    getSchemaByRoomTypeName(state) {
      return (roomName: string): ISchema | null => {
        if (state.roomsTypes.length === 0) return null;
        const { schemaName, stateSchema } = state.roomsTypes.find(
          (roomType) => roomType.roomName === roomName
        ) as IRoomType;
        return {
          schemaName,
          stateSchema,
        };
      };
    },
  },
  reducers: {
    setRoomsTypes(state, { payload }: PayloadAction<IRoomType[]>) {
      state.roomsTypes = payload;
    },
    setSelectedRoomType(
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) {
      state.selectedRoom = payload;
    },
  },
});

export const { setRoomsTypes, setSelectedRoomType } = roomsTypeSlice.actions;
export const { getRoomTypeData, getSelectedRoomType, getSchemaByRoomTypeName } =
  roomsTypeSlice.selectors;
export default roomsTypeSlice.reducer;

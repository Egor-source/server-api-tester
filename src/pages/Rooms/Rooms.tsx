import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getSchemaByRoomTypeName,
  setSelectedRoomType,
} from '../../store/roomsTypes';
import Schemas from '../../components/Schemas/Schemas';
import { Button, Table } from 'react-bootstrap';
import {
  addRoom,
  getEventsByType,
  getRoomsByType,
  setRoomEvents,
  setRooms,
} from '../../store/rooms';
import useFetch from '../../hooks/useFetch';
import MultiplayerService from '../../services/MultiplayerService';
import Spinner from '../../components/Spinner/Spinner';
import useModal from '../../hooks/useModal';
import ColyseusService from '../../services/ColyseusService';
import RoomTableRow from '../../components/RoomTableRow/RoomTableRow';
import CreateEventModal, {
  ICreateEventModal,
} from '../../components/CreateEventModal/CreateEventModal';

const Rooms = () => {
  const dispatch = useAppDispatch();

  const [loadRoomEvents, isLoading, err, clearErr] = useFetch(async () => {
    const events = await MultiplayerService.getRoomEvents(roomType as string);
    dispatch(setRoomEvents({ roomType: roomType as string, events }));
  });

  const [colyseusCreateRoom, isCreateRoomLoading, createRoomErr] = useFetch(
    async (options?: any) => {
      const room = await ColyseusService.createRoom({
        roomType: roomType as string,
        options,
      });
      dispatch(addRoom({ roomType: roomType as string, room }));
    }
  );

  const { roomType } = useParams();
  const rooms = useAppSelector(getRoomsByType)(roomType as string);
  const roomEvents = useAppSelector(getEventsByType)(roomType as string);
  const schemasData = useAppSelector(getSchemaByRoomTypeName)(
    roomType as string
  );
  useEffect(() => {
    dispatch(setSelectedRoomType(roomType));
    if (!rooms) {
      dispatch(setRooms({ roomType: roomType as string, rooms: [] }));
    }
    if (!roomEvents) {
      loadRoomEvents();
    }
    clearErr();
  }, [roomType]);

  const createRoom = () => {
    const createEvent = roomEvents.find((event) => event.name === '$onCreate');
    if (createEvent?.requestParameters) {
      useModal<ICreateEventModal>(
        {
          component: CreateEventModal,
          props: {
            roomType,
            eventName: '$onCreate',
          },
        },
        {
          ok(values) {
            colyseusCreateRoom(values);
          },
        }
      );
    } else {
      colyseusCreateRoom();
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div>
        <div className="h3">Комнаты</div>
        <Table>
          <thead>
            <tr>
              <th>Room id</th>
              <th>Session id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms?.length > 0 ? (
              rooms.map((room) => <RoomTableRow key={room.id} room={room} />)
            ) : (
              <tr>
                <td>
                  {err ? (
                    <span className="text-danger">
                      {err.response?.data?.message}
                    </span>
                  ) : (
                    'Пока нет комнат'
                  )}{' '}
                </td>
                <td></td>
              </tr>
            )}
            {isCreateRoomLoading && (
              <tr>
                <td>
                  <Spinner />
                </td>
                <td></td>
              </tr>
            )}
          </tbody>
        </Table>
        {!err && <Button onClick={createRoom}>Создать комнату</Button>}
        {createRoomErr && <div className="text-danger">{createRoomErr}</div>}
      </div>
      {schemasData && schemasData.stateSchema && schemasData.schemaName && (
        <Schemas
          schemaName={schemasData.schemaName}
          stateSchema={schemasData.stateSchema}
        />
      )}
    </div>
  );
};

export default Rooms;

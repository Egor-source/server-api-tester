import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSchemaByRoomName, setSelectedRoom } from '../../store/rooms';
import Schemas from '../../components/Schemas/Schemas';

const Room = () => {
  const { roomName } = useParams();
  const schemasData = useAppSelector(getSchemaByRoomName)(roomName as string);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedRoom(roomName));
  }, [roomName]);

  return (
    <div className="d-flex flex-column h-100">
      <div></div>
      {schemasData && (schemasData.stateSchema || schemasData.schemaName) && (
        <Schemas
          schemaName={schemasData.schemaName}
          stateSchema={schemasData.stateSchema}
        />
      )}
    </div>
  );
};

export default Room;

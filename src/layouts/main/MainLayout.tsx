import React, { FC, useEffect } from 'react';
import MainRouter from './MainRouter';
import { Col, Row } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import MultiplayerService from '../../services/MultiplayerService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getRoomData, setRooms } from '../../store/rooms';
import { clearTokens } from '../../store/tokens';
import RoomLink from '../../components/Room/RoomLink';
import Spinner from '../../components/Spinner/Spinner';

const MainLayout: FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(getRoomData);
  const [loadRooms, isLoading, err] = useFetch(async () => {
    const rooms = await MultiplayerService.getRooms();
    dispatch(setRooms(rooms));
  });

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (err?.response?.status === 401) {
      dispatch(clearTokens('all'));
    }
  }, [err]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Row className="h-100 w-100">
      <Col className="bg-secondary py-3 pe-0" xs={4} lg={2}>
        {rooms.map((room) => (
          <RoomLink
            key={room.roomName}
            roomName={room.roomName}
            description={room.description}
          />
        ))}
      </Col>
      <Col className="h-100 overflow-auto" xs={8} lg={10}>
        <MainRouter />
      </Col>
    </Row>
  );
};

export default MainLayout;

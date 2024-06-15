import React, { FC } from 'react';
import IRoomData from '../../interfaces/Rooms/IRoomData';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/redux';
import { getSelectedRoomType } from '../../store/roomsTypes';

const RoomLink: FC<IRoomData> = ({ roomName, description }) => {
  const selectedRoom = useAppSelector(getSelectedRoomType);
  const isSelectedRoom = selectedRoom && selectedRoom === roomName;

  if (description) {
    return (
      <OverlayTrigger
        overlay={<Tooltip>{description}</Tooltip>}
        placement="bottom"
      >
        <Link
          className={[
            'd-block text-decoration-none text-light py-3 ps-2',
            isSelectedRoom && 'bg-dark',
          ].join(' ')}
          to={`/${roomName}`}
        >
          {roomName}
        </Link>
      </OverlayTrigger>
    );
  }

  return (
    <Link
      className={[
        'd-block text-decoration-none text-light py-3 ps-2',
        isSelectedRoom && 'bg-dark',
      ].join(' ')}
      to={`/${roomName}`}
    >
      {roomName}
    </Link>
  );
};

export default RoomLink;

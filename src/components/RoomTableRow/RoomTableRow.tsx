import React, { FC } from 'react';
import { Room } from 'colyseus.js';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './styles.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRoom } from '../../store/rooms';

interface IRoomTableRow {
  room: Room;
}

const RoomTableRow: FC<IRoomTableRow> = ({ room }) => {
  const dispatch = useAppDispatch();
  const { roomType } = useParams();
  const navigator = useNavigate();
  const onDeleteRoom = () => {
    dispatch(deleteRoom({ roomType: roomType as string, roomId: room.id }));
    room.leave();
  };

  const onOpenRoom = () => {
    navigator(`/${roomType}/${room.id}`);
  };

  return (
    <tr>
      <td>{room.id}</td>
      <td>{room.sessionId}</td>
      <td>
        <DropdownButton
          className="dropdown-button"
          title={<i className="bi bi-three-dots-vertical"></i>}
        >
          <Dropdown.Item onClick={onOpenRoom}>Открыть</Dropdown.Item>
          <Dropdown.Item onClick={onDeleteRoom}>Удалить</Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
};

export default RoomTableRow;

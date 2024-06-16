import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getRoomByRoomId } from '../../store/rooms';
import RoomPanel from '../../components/RoomPanel/RoomPanel';
import StateItem from '../../components/StateItem/StateItem';

const Room = () => {
  const { roomType, roomId } = useParams();
  const [fullscreen, setFullscreen] = useState({
    left: false,
    right: false,
  });
  const navigator = useNavigate();
  const room = useSelector(getRoomByRoomId)({
    roomType: roomType as string,
    roomId: roomId as string,
  });

  const [state, setState] = useState(
    JSON.parse(JSON.stringify(room?.state ?? {}))
  );

  useEffect(() => {
    if (!room) {
      onClose();
      return;
    }
    room?.onStateChange((data: any) => {
      const parsedData = JSON.parse(JSON.stringify(data));
      setState(parsedData);
    });
  }, []);

  const onClose = () => {
    navigator(`/${roomType}`);
  };

  const toggleFullscreen = (panel: 'left' | 'right') => {
    setFullscreen((prev) => {
      return {
        ...prev,
        [panel]: !prev[panel],
      };
    });
  };

  return (
    <div className="py-3 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="h3">Комната {roomId}</div>
        <Button onClick={onClose}>X</Button>
      </div>
      {state ? (
        <Row className="flex-grow-1 overflow-hidden">
          <RoomPanel
            label="Стейт"
            toggleFullscreen={toggleFullscreen}
            direction="left"
            fullscreen={fullscreen.left}
            visible={!fullscreen.right}
          >
            <StateItem stateItem={state} isCollapsed={false} />
          </RoomPanel>
          <RoomPanel
            label="События"
            toggleFullscreen={toggleFullscreen}
            direction="right"
            fullscreen={fullscreen.right}
            visible={!fullscreen.left}
          >
            <div></div>
          </RoomPanel>
        </Row>
      ) : (
        <div className="text-danger">У комнаты нет стейта</div>
      )}
    </div>
  );
};

export default Room;

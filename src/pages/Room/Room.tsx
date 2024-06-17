import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getEventsByType, getRoomByRoomId } from '../../store/rooms';
import RoomPanel from '../../components/RoomPanel/RoomPanel';
import StateItem from '../../components/StateItem/StateItem';
import Events from '../../components/Events/Events';
import { useAppSelector } from '../../hooks/redux';
import useModal from '../../hooks/useModal';
import CreateEventModal, {
  ICreateEventModal,
} from '../../components/CreateEventModal/CreateEventModal';
import useFetch from '../../hooks/useFetch';
import colyseusService from '../../services/ColyseusService';

const Room = () => {
  const { roomType, roomId } = useParams();
  const [fullscreen, setFullscreen] = useState({
    left: false,
    right: false,
  });
  const roomEvents = useAppSelector(getEventsByType)(roomType as string);
  const navigator = useNavigate();
  const room = useSelector(getRoomByRoomId)({
    roomType: roomType as string,
    roomId: roomId as string,
  });

  const [state, setState] = useState(
    JSON.parse(JSON.stringify(room?.state ?? {}))
  );

  const [addPlayer, isLoading, err, clearErr] = useFetch(
    async (options?: any) => {
      await colyseusService.joinRoom({ roomType: roomType as string, options });
    }
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

  const onAddPlayer = () => {
    const joinEvent = roomEvents.find((event) => event.name === '$onJoin');
    if (joinEvent?.requestParameters) {
      useModal<ICreateEventModal>(
        {
          component: CreateEventModal,
          props: {
            roomType: roomType as string,
            eventName: '$onJoin',
          },
        },
        {
          ok: (values: any) => {
            addPlayer(values);
          },
        }
      );
    } else {
      addPlayer();
    }
  };

  return (
    <div className="py-3 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="h3">Комната {roomId}</div>
        <div>
          <Button className="me-2" onClick={onAddPlayer}>
            Добавить игрока
          </Button>
          <Button onClick={onClose}>X</Button>
        </div>
      </div>
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
          <Events />
        </RoomPanel>
      </Row>
    </div>
  );
};

export default Room;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getRoomByRoomId } from '../../store/rooms';
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
          {!fullscreen.right && (
            <Col
              className="h-100 overflow-auto pb-2"
              style={{ borderRight: '1px solid #000' }}
            >
              <div
                className="d-flex align-items-center gap-1 position-sticky top-0 "
                style={{ background: '#fff' }}
              >
                <div className="h4 mb-0">Стейт</div>
                <Button
                  className="btn-light text-nowrap border-0"
                  style={{ background: '#fff' }}
                  onClick={() => toggleFullscreen('left')}
                  size="sm"
                >
                  {fullscreen.left ? (
                    <i className="bi bi-chevron-double-left"></i>
                  ) : (
                    <i className="bi bi-chevron-double-right"></i>
                  )}
                </Button>
              </div>
              <StateItem stateItem={state} isCollapsed={false} />
            </Col>
          )}
          {!fullscreen.left && (
            <Col className="h-100 overflow-auto">
              <div
                className="d-flex align-items-center gap-1 position-sticky top-0 "
                style={{ background: '#fff' }}
              >
                <div className="h4 mb-0">События</div>
                <Button
                  className="btn-light text-nowrap border-0"
                  style={{ background: '#fff' }}
                  onClick={() => toggleFullscreen('right')}
                  size="sm"
                >
                  {fullscreen.right ? (
                    <i className="bi bi-chevron-double-right"></i>
                  ) : (
                    <i className="bi bi-chevron-double-left"></i>
                  )}
                </Button>
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <div className="text-danger">У комнаты нет стейта</div>
      )}
    </div>
  );
};

export default Room;

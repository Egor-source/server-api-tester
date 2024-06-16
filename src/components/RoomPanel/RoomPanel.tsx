import React, { FC, ReactNode } from 'react';
import { Button, Col } from 'react-bootstrap';

interface IRoomPanel {
  label: string;
  toggleFullscreen: (panel: 'left' | 'right') => void;
  direction: 'left' | 'right';
  fullscreen: boolean;
  children: ReactNode;
  visible: boolean;
}

const RoomPanel: FC<IRoomPanel> = ({
  label,
  toggleFullscreen,
  direction,
  fullscreen,
  children,
  visible,
}) => {
  return (
    <Col
      className="h-100 overflow-auto"
      style={visible ? { display: 'block' } : { display: 'none' }}
    >
      <div
        className="d-flex align-items-center gap-1 position-sticky top-0 "
        style={{ background: '#fff' }}
      >
        <div className="h4 mb-0">{label}</div>
        <Button
          className="btn-light text-nowrap border-0"
          style={{ background: '#fff', marginBottom: -6 }}
          onClick={() => toggleFullscreen(direction)}
          size="sm"
        >
          {fullscreen ? (
            direction === 'left' ? (
              <i className="bi bi-chevron-double-left"></i>
            ) : (
              <i className="bi bi-chevron-double-right"></i>
            )
          ) : direction === 'left' ? (
            <i className="bi bi-chevron-double-right"></i>
          ) : (
            <i className="bi bi-chevron-double-left"></i>
          )}
        </Button>
      </div>
      {children}
    </Col>
  );
};

export default RoomPanel;

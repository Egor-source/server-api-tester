import React, { FC, ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';

interface ISchema {
  schemaName: string;
  children: ReactNode;
}

const Schema: FC<ISchema> = ({ schemaName, children }) => {
  return (
    <Accordion.Item id={schemaName} eventKey={schemaName}>
      <Accordion.Header>
        <div className="h5">{schemaName}</div>
      </Accordion.Header>
      {children}
    </Accordion.Item>
  );
};

export default Schema;

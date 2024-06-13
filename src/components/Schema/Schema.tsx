import React, { FC, ReactNode, MouseEvent, useMemo } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import MultiplayerService from '../../services/MultiplayerService';

interface ISchema {
  schemaName: string;
  children: ReactNode;
}

const Schema: FC<ISchema> = ({ schemaName, children }) => {
  const [loadSchema, isLoading, err] = useFetch(async () => {
    const schemaFile = await MultiplayerService.downloadSchemaFile(schemaName);
    const blob = new Blob([schemaFile], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${schemaName}.ts`;
    a.click();

    URL.revokeObjectURL(url);
  });

  const downloadSchema = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    loadSchema();
  };

  const header = useMemo(() => {
    if (isLoading) return <Spinner />;
    if (err) return <div className="text-danger">Ошибка при скачивании</div>;
    return (
      <i
        onClick={downloadSchema}
        className="bi bi-cloud-arrow-down"
        style={{ fontSize: 24 }}
      />
    );
  }, [isLoading, err]);

  return (
    <Accordion.Item id={schemaName} eventKey={schemaName}>
      <Accordion.Header>
        <div className="w-100 d-flex align-items-center justify-content-between pe-2">
          <div className="h5">{schemaName}</div>
          {header}
        </div>
      </Accordion.Header>
      {children}
    </Accordion.Item>
  );
};

export default Schema;

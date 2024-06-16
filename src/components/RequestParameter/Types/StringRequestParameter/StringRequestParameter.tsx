import React, { ChangeEvent, FC } from 'react';
import { ITypeParam } from '../../RequestParameter';
import { Form } from 'react-bootstrap';

const StringRequestParameter: FC<ITypeParam> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      value={value as string}
      onChange={change}
      disabled={!!defaultValue}
    />
  );
};

export default StringRequestParameter;

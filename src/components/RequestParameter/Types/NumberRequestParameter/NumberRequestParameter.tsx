import React, { ChangeEvent, FC } from 'react';
import { ITypeParam } from '../../RequestParameter';
import { Form } from 'react-bootstrap';

const NumberRequestParameter: FC<ITypeParam> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <Form.Control
      value={value as number}
      type="number"
      onChange={change}
      disabled={!!defaultValue}
    />
  );
};

export default NumberRequestParameter;

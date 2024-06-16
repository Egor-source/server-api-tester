import React, { ChangeEvent, FC } from 'react';
import { ITypeParam } from '../../RequestParameter';
import { Form } from 'react-bootstrap';

const BooleanRequestParameter: FC<Omit<ITypeParam, 'defaultValue'>> = ({
  value,
  onChange,
}) => {
  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'none') return;
    onChange(e.target.value === 'true');
  };

  return (
    <Form.Select onChange={change} value={value.toString()}>
      <option value="none">Не выбрано</option>
      <option value="true">true</option>
      <option value="false">false</option>
    </Form.Select>
  );
};

export default BooleanRequestParameter;

import React, { ChangeEvent, FC, useState } from 'react';
import { ITypeParam } from '../../RequestParameter';
import { Form } from 'react-bootstrap';

const ObjectRequestParameter: FC<ITypeParam> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const [err, setErr] = useState('');

  let val: string;

  if (value && typeof value === 'object') {
    val = JSON.stringify(value, null, 3);
  } else {
    val = `${value}`;
  }

  const onBlur = () => {
    try {
      JSON.parse(val);
    } catch (er) {
      setErr('Введенное значение не является JSON');
    }
  };

  const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      onChange(JSON.parse(e.target.value));
      setErr('');
    } catch (er) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <Form.Control
        value={val}
        as="textarea"
        style={{ height: '100px' }}
        onChange={change}
        disabled={!!defaultValue}
        onBlur={onBlur}
      />
      {err && <div className="text-danger">{err}</div>}
    </div>
  );
};

export default ObjectRequestParameter;

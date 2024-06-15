import React, { ChangeEvent, FC, useEffect } from 'react';
import {
  IRequestParameter,
  ParameterType,
} from '../../interfaces/Rooms/IRoomEvent';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/redux';
import { getToken, TokenNames } from '../../store/tokens';

interface IParam extends IRequestParameter {
  value: any;
  onChange: (paramName: string, newValue: ParameterType) => void;
}

const RequestParameter: FC<IParam> = ({
  name,
  required,
  defaultValue,
  value,
  onChange,
  type,
}) => {
  const accessToken = useAppSelector(getToken)(
    TokenNames.multiplayerToken
  ) as string;

  useEffect(() => {
    switch (defaultValue) {
      case 'token': {
        onChange(name, accessToken);
        break;
      }
    }
  }, []);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    let value;
    switch (type) {
      case 'number': {
        value = Number(e.target.value);
        break;
      }
      default: {
        value = e.target.value;
        break;
      }
    }
    onChange(name, value);
  };

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>
        {name}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        onChange={change}
        value={value}
        className="mb-3"
        disabled={!!defaultValue}
      />
    </Form.Group>
  );
};

export default RequestParameter;

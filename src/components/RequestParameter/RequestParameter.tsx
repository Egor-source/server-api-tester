import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import {
  BaseTypes,
  IRequestParameter,
  ParameterType,
} from '../../interfaces/Rooms/IRoomEvent';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/redux';
import { getToken, TokenNames } from '../../store/tokens';
import StringRequestParameter from './Types/StringRequestParameter/StringRequestParameter';
import NumberRequestParameter from './Types/NumberRequestParameter/NumberRequestParameter';
import BooleanRequestParameter from './Types/BooleanRequestParameter/BooleanRequestParameter';
import ObjectRequestParameter from './Types/ObjectRequestParameter/ObjectRequestParameter';
import SelectRequestParameter from './Types/SelectRequestParameter/SelectRequestParameter';

interface IParam extends IRequestParameter {
  value: ParameterType;
  onChange: (paramName: string, newValue: ParameterType) => void;
}

export interface ITypeParam {
  value: ParameterType;
  onChange: (newValue: ParameterType) => void;
  defaultValue: 'token' | undefined;
}

const RequestParameter: FC<IParam> = ({
  name,
  required,
  defaultValue,
  value,
  onChange,
  types,
}) => {
  const accessToken = useAppSelector(getToken)(
    TokenNames.multiplayerToken
  ) as string;

  const [selectedType, setSelectedType] = useState(
    Array.isArray(types) ? types[0] : types
  );

  useEffect(() => {
    switch (defaultValue) {
      case 'token': {
        onChange(name, accessToken);
        break;
      }
    }
  }, []);

  const change = (newValue: ParameterType) => {
    onChange(name, newValue);
  };

  const inputByType = useMemo(() => {
    switch (selectedType) {
      case 'string': {
        return (
          <StringRequestParameter
            onChange={change}
            value={value}
            defaultValue={defaultValue}
          />
        );
      }
      case 'number': {
        return (
          <NumberRequestParameter
            onChange={change}
            value={value}
            defaultValue={defaultValue}
          />
        );
      }
      case 'boolean': {
        return <BooleanRequestParameter onChange={change} value={value} />;
      }
      case 'object': {
        return (
          <ObjectRequestParameter
            onChange={change}
            value={value}
            defaultValue={defaultValue}
          />
        );
      }
      default: {
        return (
          <SelectRequestParameter
            onChange={change}
            value={value}
            options={selectedType.options}
          />
        );
      }
    }
  }, [selectedType, value]);

  const onChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as BaseTypes);
  };

  return (
    <Form.Group
      className={`mb-3 p-2 ${Array.isArray(types) && 'border-1 border-primary border'}`}
      controlId="exampleForm.ControlInput1"
    >
      <Form.Label>
        {name}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      {inputByType}
      {Array.isArray(types) && (
        <div className="mt-2">
          <Form.Label>Выбор типа</Form.Label>
          <Form.Select
            onChange={onChangeSelectedType}
            size="sm"
            value={
              typeof selectedType === 'object'
                ? selectedType.type
                : selectedType
            }
          >
            {types.map((type) => (
              <option
                key={typeof type === 'object' ? type.type : type}
                value={typeof type === 'object' ? type.type : type}
              >
                {typeof type === 'object' ? type.type : type}
              </option>
            ))}
          </Form.Select>
        </div>
      )}
    </Form.Group>
  );
};

export default RequestParameter;

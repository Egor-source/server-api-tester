import React, { ChangeEvent, FC } from 'react';
import { ITypeParam } from '../../RequestParameter';
import { Form } from 'react-bootstrap';

type SelectRequestParameterType = Omit<ITypeParam, 'defaultValue'> & {
  options: string[];
};

const SelectRequestParameter: FC<SelectRequestParameterType> = ({
  value,
  onChange,
  options,
}) => {
  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'none') return;
    onChange(e.target.value);
  };

  return (
    <Form.Select onChange={change} size="sm" value={value as string}>
      <option value="none">Не выбрано</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectRequestParameter;

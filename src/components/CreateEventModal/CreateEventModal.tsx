import React, { FC, useState } from 'react';
import ModalTemplate, {
  ModalTemplateBody,
  ModalTemplateFooter,
} from '../ModalTemplate/ModalTemplate';
import IModal from '../../interfaces/IModal';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/redux';
import { getEventByName } from '../../store/rooms';
import {
  IRequestParameter,
  ParameterType,
} from '../../interfaces/Rooms/IRoomEvent';
import RequestParameter from '../RequestParameter/RequestParameter';

export interface ICreateEventModal extends IModal {
  roomType: string;
  eventName: string;
}

const CreateEventModal: FC<ICreateEventModal> = ({
  ok,
  cancel,
  dismiss,
  eventName,
  roomType,
}) => {
  const event = useAppSelector(getEventByName)({ roomType, eventName });
  const [validationError, setValidationError] = useState('');
  const paramas = Array.isArray(event?.requestParameters)
    ? (event?.requestParameters as IRequestParameter[])
    : ([event?.requestParameters] as IRequestParameter[]);

  const [values, setValues] = useState(
    paramas.reduce(
      (acc, param) => {
        acc[param.name] = '';
        return acc;
      },
      {} as { [key: string]: ParameterType }
    )
  );

  const isValid = () => {
    const requiredParams = paramas.filter((param) => param.required);
    return requiredParams.reduce((acc, param) => {
      if (
        !values[param.name] &&
        typeof values[param.name] !== 'boolean' &&
        values[param.name] !== 0
      ) {
        acc = false;
      }
      return acc;
    }, true);
  };

  const onOk = () => {
    if (!isValid()) {
      setValidationError('Не все обязательные поля заполнены');
      return;
    }
    ok(values);
  };

  const onChange = (paramName: string, newValue: ParameterType) => {
    setValues((prev) => ({
      ...prev,
      [paramName]: newValue,
    }));
  };

  return (
    <ModalTemplate dismiss={dismiss}>
      <ModalTemplateBody>
        {validationError && (
          <div className="text-center text-danger mb-3">{validationError}</div>
        )}
        <Form className="d-flex flex-column align-items-center justify-content-center">
          {paramas.map((param) => (
            <RequestParameter
              value={values[param.name]}
              key={param.name}
              name={param.name}
              required={param.required}
              types={param.types}
              defaultValue={param.defaultValue}
              onChange={onChange}
            />
          ))}
        </Form>
      </ModalTemplateBody>
      <ModalTemplateFooter>
        <Button onClick={cancel}>Отменить</Button>
        <Button onClick={onOk}>Ок</Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default CreateEventModal;

import React, { FC, useState } from 'react';
import IRoomEvent, {
  IRequestParameter,
  ParameterType,
} from '../../interfaces/Rooms/IRoomEvent';
import { Accordion, Button, Form } from 'react-bootstrap';
import RequestParameter from '../RequestParameter/RequestParameter';
import ColyseusService from '../../services/ColyseusService';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { getRoomByRoomId } from '../../store/rooms';
import { Room } from 'colyseus.js';
import useFetch from '../../hooks/useFetch';
import Spinner from '../Spinner/Spinner';
import StateItem from '../StateItem/StateItem';

interface IEvent {
  event: IRoomEvent;
}

const Event: FC<IEvent> = ({ event }) => {
  const { roomType, roomId } = useParams();
  const room = useAppSelector(getRoomByRoomId)({
    roomType: roomType as string,
    roomId: roomId as string,
  });

  const [validationError, setValidationError] = useState('');
  const [returnedValues, setReturnedValues] = useState<any[] | null>(null);
  const [sendMessage, isLoading, err, clearErr] = useFetch(async () => {
    const returnedValues = await ColyseusService.sendMessage(
      room as Room,
      event,
      values
    );
    setReturnedValues(returnedValues);
  });

  let params: IRequestParameter[];

  if (!event?.requestParameters) {
    params = [];
  } else if (Array.isArray(event?.requestParameters)) {
    params = event?.requestParameters;
  } else {
    params = [event?.requestParameters];
  }

  const [values, setValues] = useState(
    params.reduce(
      (acc, param) => {
        acc[param.name] = '';
        return acc;
      },
      {} as { [key: string]: ParameterType }
    )
  );

  const onChange = (paramName: string, newValue: ParameterType) => {
    setValues((prev) => ({
      ...prev,
      [paramName]: newValue,
    }));
  };

  const isValid = () => {
    const requiredParams = params.filter((param) => param.required);
    return requiredParams.reduce((acc, param) => {
      if (!values[param.name]) {
        acc = false;
      }
      return acc;
    }, true);
  };

  const onSendMessage = async () => {
    clearErr();
    setReturnedValues(null);
    setValidationError('');
    if (isValid()) {
      await sendMessage();
      setValues(
        params.reduce(
          (acc, param) => {
            acc[param.name] = '';
            return acc;
          },
          {} as { [key: string]: ParameterType }
        )
      );
    } else {
      setValidationError('Не все обязательные поля заполнены');
    }
  };

  return (
    <Accordion.Item eventKey={event.name}>
      <Accordion.Header>
        <div className="h4">{event.name}</div>
      </Accordion.Header>
      <Accordion.Body>
        {validationError && (
          <div className="text-danger">{validationError}</div>
        )}
        {params.length > 0 && (
          <Form>
            {params.map((param) => (
              <RequestParameter
                value={values[param.name]}
                key={param.name}
                name={param.name}
                required={param.required}
                type={param.type}
                defaultValue={param.defaultValue}
                onChange={onChange}
              />
            ))}
          </Form>
        )}
        {isLoading && <Spinner />}
        {err && <div className="text-danger">{err}</div>}
        {returnedValues && (
          <div className="mb-3">
            <StateItem stateItem={returnedValues} isCollapsed={false} />
          </div>
        )}
        <Button onClick={onSendMessage}>Отправить</Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Event;

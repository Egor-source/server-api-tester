import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { getEventsByType } from '../../store/rooms';
import { Accordion } from 'react-bootstrap';
import Event from '../Event/Event';

const Events = () => {
  const { roomType } = useParams();

  const events =
    useAppSelector(getEventsByType)(roomType as string)?.filter(
      (event) => !event.name.includes('$')
    ) ?? [];
  return (
    <Accordion>
      {events.map((event) => (
        <Event key={event.name} event={event} />
      ))}
    </Accordion>
  );
};

export default Events;

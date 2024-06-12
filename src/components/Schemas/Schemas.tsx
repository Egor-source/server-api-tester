import React, {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { StateSchema } from '../../interfaces/Rooms/IRoom';
import ISchema from '../../interfaces/Rooms/ISchema';
import Schema from '../Schema/Schema';
import { Accordion } from 'react-bootstrap';
import {
  AccordionEventKey,
  AccordionSelectCallback,
} from 'react-bootstrap/AccordionContext';
import './schemas.scss';
import SchemaProperty from '../SchemaProperty/SchemaProperty';
import { useLocation, useNavigate } from 'react-router-dom';

type Schema = {
  schemaName: string;
  schemaProps: ReactNode[];
};

const Schemas: FC<ISchema> = ({ stateSchema, schemaName }) => {
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [selectedAccordionItems, setSelectedAccordionItems] = useState<
    string[]
  >([]);
  const navigate = useNavigate();
  const { hash } = useLocation();
  const generateSchemas = useCallback(
    (schemaTypes: StateSchema, schemaName: string) => {
      const schema: Schema = {
        schemaName,
        schemaProps: [],
      };

      setSchemas((prev) => {
        const isRepeat = prev.find((sh) => sh.schemaName === schema.schemaName);
        return isRepeat ? prev : [...prev, schema];
      });

      if (Object.keys(schemaTypes).length === 0) {
        schema.schemaProps.push(
          <div key={schemaName} className="text-danger">
            Схема не заполнена
          </div>
        );
        return;
      }

      Object.entries(schemaTypes).forEach(([propertyName, value]) => {
        if (typeof value.propertyType === 'string') {
          schema.schemaProps.push(
            <SchemaProperty
              key={propertyName}
              propertyType={value.propertyType}
              propertyName={propertyName}
              required={value.required}
              openAccordionItem={openAccordionItem}
            />
          );
          return;
        }

        schema.schemaProps.push(
          <SchemaProperty
            key={propertyName}
            schemaName={value.schemaName}
            collectionType={value.collectionType}
            propertyName={propertyName}
            required={value.required}
            openAccordionItem={openAccordionItem}
          />
        );

        generateSchemas(
          value.propertyType as StateSchema,
          value.schemaName ?? 'Имя не задано'
        );
      });
    },
    [stateSchema]
  );

  useEffect(() => {
    setSchemas([]);
    if (!stateSchema) return;
    generateSchemas(stateSchema, schemaName ?? 'Имя не задано');
    if (hash) {
      setSelectedAccordionItems([hash.replace('#', '')]);
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [generateSchemas]);

  const onSelectAccordionItem: AccordionSelectCallback = (
    eventKey: AccordionEventKey
  ) => {
    setSelectedAccordionItems((prev) => {
      const keys = eventKey as string[];
      setTimeout(() => {
        if (prev.length < keys.length) {
          navigate(`${location.pathname}#${keys[keys.length - 1]}`);
        } else {
          navigate(location.pathname);
        }
      }, 0);
      return [...keys];
    });
  };

  const openAccordionItem = (
    e: MouseEvent<HTMLAnchorElement>,
    schemaName: string
  ) => {
    return () => {
      e.preventDefault();
      const alreadyOpen = selectedAccordionItems.find(
        (item) => item === schemaName
      );

      if (!alreadyOpen) {
        setSelectedAccordionItems((prev) => [...prev, schemaName]);
      }
      setTimeout(() => {
        if (e.target instanceof HTMLAnchorElement) {
          location.href = e.target.href;
        }
      }, 450);
    };
  };

  return (
    <div className="py-4">
      <div className="h3">Схемы</div>
      <Accordion
        alwaysOpen
        activeKey={selectedAccordionItems}
        onSelect={onSelectAccordionItem}
      >
        {schemas.map((schema) => (
          <Schema key={schema.schemaName} schemaName={schema.schemaName}>
            <Accordion.Body>{schema.schemaProps}</Accordion.Body>
          </Schema>
        ))}
      </Accordion>
    </div>
  );
};

export default Schemas;

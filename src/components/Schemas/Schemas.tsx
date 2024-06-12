import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { StateSchema } from '../../interfaces/Rooms/IRoom';
import ISchema from '../../interfaces/Rooms/ISchema';
import Schema from '../Schema/Schema';
import { Accordion } from 'react-bootstrap';
import {
  AccordionEventKey,
  AccordionSelectCallback,
} from 'react-bootstrap/AccordionContext';
import './schemas.scss';

const Schemas: FC<ISchema> = ({ stateSchema, schemaName }) => {
  const [schemas, setSchemas] = useState<any[]>([]);
  const [selectedAccordionItems, setSelectedAccordionItems] = useState<
    string[]
  >([]);
  const generateSchemas = useCallback(
    (schemaTypes: StateSchema, schemaName: string) => {
      const schema: any = {
        schemaName,
        schemaProps: [],
      };
      setSchemas((prev) => {
        const isRepeat = prev.find((sh) => sh.schemaName === schema.schemaName);
        return isRepeat ? prev : [...prev, schema];
      });
      Object.entries(schemaTypes).forEach(([key, value]) => {
        if (typeof value.propertyType === 'string') {
          schema.schemaProps.push(
            <div key={key} className="pt-2">
              {key}
              {value.required ? <span className="text-danger">*</span> : ''}
              :&nbsp;
              <span className="field-type">{value.propertyType}</span>
            </div>
          );
          return;
        }
        let collectionType;
        switch (value.collectionType) {
          case 'array': {
            collectionType = 'ArraySchema';
            break;
          }
          case 'map': {
            collectionType = 'MapSchema';
            break;
          }
          case 'set': {
            collectionType = 'SetSchema';
            break;
          }
          case 'collection': {
            collectionType = 'CollectionSchema';
            break;
          }
        }

        schema.schemaProps.push(
          <div key={key} className="pt-2">
            <span>
              {key}
              {value.required ? <span className="text-danger">*</span> : ''}
              :&nbsp;
              <span className="field-type">
                {collectionType ? (
                  <span>
                    {collectionType}
                    &lt;
                    <a
                      href={`#${value.schemaName}`}
                      className="related-schema"
                      onClick={(e) =>
                        openAccordionItem(e, value.schemaName as string)()
                      }
                    >
                      {value.schemaName}
                    </a>
                    &gt;
                  </span>
                ) : (
                  <a
                    href={`#${value.schemaName}`}
                    className="related-schema"
                    onClick={(e) =>
                      openAccordionItem(e, value.schemaName as string)()
                    }
                  >
                    {value.schemaName}
                  </a>
                )}
              </span>
            </span>
          </div>
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
  }, [generateSchemas]);

  const onSelectAccordionItem: AccordionSelectCallback = (
    eventKey: AccordionEventKey
  ) => {
    setSelectedAccordionItems([...(eventKey as string[])]);
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
          window.location.href = e.target.href;
        }
      }, 450);
    };
  };

  return (
    <div>
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

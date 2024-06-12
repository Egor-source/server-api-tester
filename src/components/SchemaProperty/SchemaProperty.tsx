import React, { FC, useMemo, MouseEvent } from 'react';

type OpenAccordionItem = (
  e: MouseEvent<HTMLAnchorElement>,
  schemaName: string
) => () => void;

interface ISchemaProperty {
  propertyName: string;
  propertyType?: string;
  schemaName?: string;
  collectionType?: string;
  required: boolean;
  openAccordionItem: OpenAccordionItem;
}

const SchemaProperty: FC<ISchemaProperty> = ({
  propertyName,
  propertyType,
  schemaName,
  required,
  collectionType,
  openAccordionItem,
}) => {
  if (propertyType) {
    return (
      <div key={propertyName} className="pt-2">
        {propertyName}
        {required ? <span className="text-danger">*</span> : ''}
        :&nbsp;
        <span className="field-type">{propertyType}</span>
      </div>
    );
  }

  const collectionTypeString = useMemo(() => {
    switch (collectionType) {
      case 'array': {
        return 'ArraySchema';
      }
      case 'map': {
        return 'MapSchema';
      }
      case 'set': {
        return 'SetSchema';
      }
      case 'collection': {
        return 'CollectionSchema';
      }
    }
  }, []);

  return (
    <div key={propertyName} className="pt-2">
      <span>
        {propertyName}
        {required ? <span className="text-danger">*</span> : ''}
        :&nbsp;
        <span className="field-type">
          {collectionTypeString ? (
            <span>
              {collectionTypeString}
              &lt;
              <a
                href={`#${schemaName}`}
                className="related-schema"
                onClick={(e) => openAccordionItem(e, schemaName as string)()}
              >
                {schemaName}
              </a>
              &gt;
            </span>
          ) : (
            <a
              href={`#${schemaName}`}
              className="related-schema"
              onClick={(e) => openAccordionItem(e, schemaName as string)()}
            >
              {schemaName}
            </a>
          )}
        </span>
      </span>
    </div>
  );
};

export default SchemaProperty;

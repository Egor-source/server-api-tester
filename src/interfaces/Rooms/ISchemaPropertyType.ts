import { StateSchema } from './IRoomType';

interface ISchemaPropertyType {
  schemaName?: string;
  propertyType: StateSchema | string;
  collectionType?: 'array' | 'map' | 'set' | 'collection';
  required: boolean;
}

export default ISchemaPropertyType;

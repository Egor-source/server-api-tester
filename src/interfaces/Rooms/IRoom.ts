import ISchemaPropertyType from './ISchemaPropertyType';

export type StateSchema = {
  [key: string]: ISchemaPropertyType;
};

interface IRoom {
  roomName: string;
  description?: string;
  schemaName?: string;
  stateSchema?: StateSchema;
}

export default IRoom;

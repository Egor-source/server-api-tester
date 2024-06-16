export type ParameterType = string | number | boolean | object;

export type BaseTypes = 'string' | 'number' | 'object' | 'boolean';

export interface IRequestParameter {
  name: string;
  required: boolean;
  defaultValue?: 'token';
  types: BaseTypes | BaseTypes[];
}

interface IRoomEvent {
  name: string;
  requestParameters?: IRequestParameter[] | IRequestParameter;
  triggeredEvents?: string[] | string;
  forAllMessages?: boolean;
}

export default IRoomEvent;

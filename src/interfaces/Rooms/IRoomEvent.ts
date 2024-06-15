export type ParameterType = string | number;

export interface IRequestParameter {
  name: string;
  required: boolean;
  defaultValue?: 'token';
  type: 'string' | 'number';
}

interface IRoomEvent {
  name: string;
  requestParameters?: IRequestParameter[] | IRequestParameter;
  triggeredEvents?: string[] | string;
  forAllMessages?: boolean;
}

export default IRoomEvent;

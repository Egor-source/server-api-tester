import IRoom from './IRoom';

interface ISchema extends Omit<IRoom, 'roomName' | 'description'> {}

export default ISchema;

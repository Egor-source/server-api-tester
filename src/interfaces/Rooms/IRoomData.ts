import IRoom from './IRoom';

interface IRoomData extends Omit<IRoom, 'schemaName' | 'stateSchema'> {}

export default IRoomData;

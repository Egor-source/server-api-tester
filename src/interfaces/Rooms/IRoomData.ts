import IRoomType from './IRoomType';

interface IRoomData extends Omit<IRoomType, 'schemaName' | 'stateSchema'> {}

export default IRoomData;

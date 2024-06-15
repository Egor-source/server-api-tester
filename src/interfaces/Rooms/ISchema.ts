import IRoomType from './IRoomType';

interface ISchema extends Omit<IRoomType, 'roomName' | 'description'> {}

export default ISchema;

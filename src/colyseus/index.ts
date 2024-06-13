import env from 'react-dotenv';
import { Client } from 'colyseus.js';

const colyseusClient = new Client(env?.COLYSEUS_HOST);
export default colyseusClient;

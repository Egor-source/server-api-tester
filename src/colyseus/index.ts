import { Client } from 'colyseus.js';
import env from 'react-dotenv';

const colyseusClient = new Client(env?.COLYSEUS_HOST);
export default colyseusClient;

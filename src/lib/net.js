import * as netModule from 'cf-mongodb-polyfills/net';
import { CloudflareSocket } from 'cf-mongodb-polyfills/net-mock';
const net = { 
  ...netModule,
  createConnection: netModule.createConnection,
  isIP: netModule.isIP,
  Socket: CloudflareSocket
};
export default net;
export const createConnection = netModule.createConnection;
export const isIP = netModule.isIP;
export const Socket = CloudflareSocket;
import * as tlsModule from 'cf-mongodb-polyfills/tls';
const tls = { 
  ...tlsModule,
  connect: tlsModule.connect
};
export default tls;
export const connect = tlsModule.connect;
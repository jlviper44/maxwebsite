import * as dnsModule from 'cf-mongodb-polyfills/dns';
const dns = { 
  ...dnsModule,
  resolveTxt: dnsModule.resolveTxt,
  resolveSrv: dnsModule.resolveSrv,
  promises: dnsModule.promises
};
export default dns;
export const resolveTxt = dnsModule.resolveTxt;
export const resolveSrv = dnsModule.resolveSrv;
export const promises = dnsModule.promises;
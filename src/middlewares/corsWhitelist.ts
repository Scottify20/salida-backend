import { CorsOptions } from 'cors';
require('dotenv').config();

const isCorsDomainWhitelistEnabled = process.env.IS_CORS_DOMAIN_WHITELIST_ENABLED === 'true';

let whitelist: string[] = [];

if (isCorsDomainWhitelistEnabled && process.env.ALLOWED_DOMAINS) {
  whitelist = [...process.env.ALLOWED_DOMAINS.split(', ')];
}

const corsDomainWhitelistOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if ((origin && whitelist.indexOf(origin) !== -1) || !isCorsDomainWhitelistEnabled) {
      callback(null, true);
    } else {
      callback(new Error('You do not have permission to access this API!'));
    }
  },
};

export default corsDomainWhitelistOptions;

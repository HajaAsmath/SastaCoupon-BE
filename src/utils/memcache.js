require('dotenv').config();
const { Client } = require('memjs');

let memcache;

if (process.env.CACHE_ENABLED === 'true') {
  memcache = Client.create();
}

const set = async (key, data, expiry) => {
  if (process.env.CACHE_ENABLED === 'true') {
    await memcache.set(key, JSON.stringify(data), { expiry });
  }
};

// eslint-disable-next-line consistent-return
const get = async (key, callback) => {
  if (process.env.CACHE_ENABLED === 'true') {
    return memcache.get(key, callback);
  }
  await callback(null, null);
};

const verifyCacheMiddleware = (req, res, next) => {
  const key = 'generate_key';
  memcache.get(key, (err, val) => {
    if (val) {
      res.stats(200).json(JSON.parse(val));
    } else {
      next();
    }
  });
};

const generateKey = (name, id) => `${name}_${id}`;

const flush = () => {
  if (process.env.CACHE_ENABLED === 'true') {
    memcache.flush();
  }
};

module.exports = {
  set, get, verifyCacheMiddleware, generateKey, flush,
};

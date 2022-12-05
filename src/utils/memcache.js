const { Client } = require('memjs');

const memcache = Client.create();

const set = async (key, data, expiry) => {
  await memcache.set(key, JSON.stringify(data), { expiry });
};

const get = async (key, callback) => memcache.get(key, callback);

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
  memcache.flush();
};

module.exports = {
  set, get, verifyCacheMiddleware, generateKey, flush,
};

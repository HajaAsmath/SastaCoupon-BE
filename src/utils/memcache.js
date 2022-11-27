const {Client} = require('memjs');

const memcache = Client.create();

const set = async (key, data, expiry) => {
    await memcache.set(key, JSON.stringify(data), {expiry: expiry});
}

const get = async (key,callback) => {
    return memcache.get(key, callback);
}

const verifyCacheMiddleware = (req, res, next)=>{
    memcache.get(key, (err, val) => {
        if(val){
            res.stats(200).json(JSON.parse(val));
        } else {
            next();
        }
     })
}

const generateKey = (name, id) => {
    return name+"_"+id;
}


module.exports = {set, get, verifyCacheMiddleware, generateKey};
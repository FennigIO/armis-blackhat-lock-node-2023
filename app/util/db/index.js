const { createPool: Pool } = require('promise-mysql');
let currentPool = false;

module.exports.getDatabase = async () => {
  if (currentPool) {
    return currentPool;
  }
  currentPool = Pool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'armis-lock',
  });
  return currentPool;
};

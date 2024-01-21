// DB Connection
const {Pool} = require('pg');

const pool = new Pool({
  user: 'sooraj',
  host: 'localhost',
  database: 'users',
  password: 'sooraj',
  port: 5432,
});


module.exports = pool;
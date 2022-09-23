const Pool = require('pg').Pool
const pool = new Pool({
  user: 'xxxxxxx',
  host: 'localhost',
  database: 'xxxxxx',
  password: 'xxxxxx',
  port: 5432,
})

module.exports=pool

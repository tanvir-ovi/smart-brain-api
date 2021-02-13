const knex = require('knex');

//database connections
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}); 

module.exports = {
  db
}
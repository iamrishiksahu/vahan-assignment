const pg = require('pg')
const { Pool, Client } = pg

const connString = process.env.DB_STRING

const client = new pg.Client(connString);
client.connect();

// const query = (queryString, parameters, callback) => {
//     return client.query(queryString, parameters, callback)
// }

module.exports = client






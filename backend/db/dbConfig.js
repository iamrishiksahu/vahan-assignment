const pg = require('pg')
const { Pool, Client } = pg

const connString = process.env.DB_STRING

const client = new pg.Client(connString);
client.connect();

module.exports = client






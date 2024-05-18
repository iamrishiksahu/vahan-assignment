const pg = require('pg')
const { Pool, Client } = pg

const connString = 'postgres://main_xpdr_user:SA4cyyBglqDsRLKb134QgZ2oksSKOBlZ@dpg-cp4gdp0cmk4c73ek0ro0-a.oregon-postgres.render.com/main_xpdr?ssl=true'

const client = new pg.Client(connString);
client.connect();

// const query = (queryString, parameters, callback) => {
//     return client.query(queryString, parameters, callback)
// }

module.exports = client






const Pool = require('pg').Pool

exports.pool = new Pool({
    user: "postgres",
    password: "postgres",
    database: "db_sales-app",
    host: "localhost",
    port: 5432
})
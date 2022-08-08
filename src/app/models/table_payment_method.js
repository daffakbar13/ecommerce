const { pool } = require("../database/db.config");
const table = 'table_payment_method'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    `)

    return query
}